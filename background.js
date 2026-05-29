<!--           ..      ..    ..     ..      ..         .:::        .::.     .     ..  ........
 //		        .@@#    :@@=   %@    .@@#    :@%       -%@%%%@*.   +@@%%@%=  +@+   :@#  %@%%%%%#
 //		        #@#@=   :@@@=  %@    #@#@=   :@%      -@%:   =@%  #@+   .#*. +@+   :@%  %@:
 //		       =@+ %@.  :@##@= %@   =@+ %@.  :@%      #@=     #@-.@%   ::::. +@+   :@%  %@#####-
 //		      .@@+=#@#  :@* #@+%@  .@@+=#@#  :@%      *@=     %@-.@@   ##@@+ +@+   :@%  %@+----.
 //		      #@#***%@+ :@*  *@@@  #@#***%@+ :@%      :@@-   +@%  *@*.  .#@+ -@#.  +@*  %@:
 //		     -@#    .%@.:@*   *@@ -@#    .%@.:@@%%%%%. :#@%%@@*.   +%@%%@%*.  +@@%%@#.  %@%%%%%%
 //	      .       .  .     ..  .       .  .......     ::.        .::.       .::.     .......
 //                               .
 //		#%. #%%=   %%%:    #%*      =%%%%%+.  #%: +%*   :%+    -%%:   -%%%%%%%# *%:  :#%%%%#-  .%%-   #%.
 //		@@. %@@@  =@@@-   +@@@=    %@+. .+@*  %@: *@@#  -@*    %@@%    ..=@%... #@- =@%-. :%@= .@@@-  %@.
 //		%@. %@+@= %%*@-  .@#.%@.  =@*     ..  %@: *@*@# :@*   *@-=@+     :@#    #@- @@:    .@@ .@%%@- %@.
 //		%@. %@:%%-@-+@-  #@=.+@#  +@*  :%%@@. %@: *@:-@#=@*  -@%::@@:    :@%    #@- @@.    .@@ .@# #@=#@.
 //		%@. %@.=@@@ *@- =@@%%%@@= :@@:   .@@: %@: *@: -@@@*  %@%%%%@%    :@%    #@- *@*    +@# .@#  #@@@.
 //		@@. %@..@@+ *@-.@@.   .@@: -%@#*#%@#. %@: #@:  -@@* *@+    +@*   :@%    #@-  *@%**%@*  :@#   #@@.
 //		:-  :-  :-  .- .-.     :-.   :-==-.   :-  :-    :-. --      --    -:    :-    .-==-.    -:    ---->
let SITES = ["twitter.com", "x.com", "facebook.com", "instagram.com"];
let DAILY_LIMIT_MINUTES = 30;

async function loadSites() {
  const stored = await browser.storage.local.get(["sites", "daily_limit"]);
  if (stored.sites && stored.sites.length > 0) SITES = stored.sites;
  if (stored.daily_limit) DAILY_LIMIT_MINUTES = stored.daily_limit;
}

loadSites();
browser.storage.onChanged.addListener((changes) => {
  if (changes.sites) SITES = changes.sites.newValue;
  if (changes.daily_limit) DAILY_LIMIT_MINUTES = changes.daily_limit.newValue;
});

let activeTabId = null;
let activeHost = null;
let startTime = null;
let intervalId = null;

function getTodayKey() {
  const d = new Date();
  return `usage_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`;
}

function isSiteTracked(url) {
  try {
    const host = new URL(url).hostname.replace("www.", "");
    return SITES.some(s => host === s || host.endsWith("." + s));
  } catch { return false; }
}

function getHost(url) {
  try { return new URL(url).hostname.replace("www.", ""); }
  catch { return null; }
}

async function getUsage() {
  const key = getTodayKey();
  const result = await browser.storage.local.get([key, "daily_limit"]);
  DAILY_LIMIT_MINUTES = result.daily_limit || 30;
  return result[key] || {};
}

async function saveUsage(usage) {
  await browser.storage.local.set({ [getTodayKey()]: usage });
}

async function isBlocked(host) {
  const usage = await getUsage();
  const site = SITES.find(s => host === s || host.endsWith("." + s));
  if (!site) return false;
  return (usage[site] || 0) >= DAILY_LIMIT_MINUTES * 60;
}

function getSiteKey(host) {
  return SITES.find(s => host === s || host.endsWith("." + s));
}

async function getBlockedUrl(site) {
  const stored = await browser.storage.local.get("lang");
  const lang = stored.lang || "en";
  return browser.runtime.getURL("blocked.html") + "?site=" + site + "&lang=" + lang;
}

function startTracking(tabId, host) {
  stopTracking();
  activeTabId = tabId;
  activeHost = host;
  startTime = Date.now();
  console.log("Takip başladı:", host);

  intervalId = setInterval(async () => {
    if (!activeHost || !startTime) return;
    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000);
    startTime = now;

    const usage = await getUsage();
    const site = getSiteKey(activeHost);
    if (!site) return;

    usage[site] = (usage[site] || 0) + elapsed;
    await saveUsage(usage);
    console.log("Kaydedildi:", site, "→", Math.floor(usage[site] / 60), "dakika");

    await updateBadge();

    if (usage[site] >= DAILY_LIMIT_MINUTES * 60) {
      const url = await getBlockedUrl(site);
      browser.tabs.update(activeTabId, { url });
      stopTracking();
    }
  }, 5000);
}

function stopTracking() {
  if (intervalId) { clearInterval(intervalId); intervalId = null; }
  activeHost = null;
  activeTabId = null;
  startTime = null;
}

async function checkTab(tabId, url) {
  if (!url || !isSiteTracked(url)) {
    if (activeTabId === tabId) stopTracking();
    return;
  }
  const host = getHost(url);
  if (!host) return;

  if (await isBlocked(host)) {
    const blockedUrl = await getBlockedUrl(host);
    browser.tabs.update(tabId, { url: blockedUrl });
    return;
  }

  startTracking(tabId, host);
}

browser.tabs.onActivated.addListener(async (info) => {
  try {
    const tab = await browser.tabs.get(info.tabId);
    await checkTab(info.tabId, tab.url);
  } catch (e) { console.error(e); }
});

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete") return;
  const active = await browser.tabs.query({ active: true, currentWindow: true });
  if (!active[0] || active[0].id !== tabId) return;
  await checkTab(tabId, tab.url);
});

browser.tabs.onRemoved.addListener((tabId) => {
  if (tabId === activeTabId) stopTracking();
});

browser.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === browser.windows.WINDOW_ID_NONE) {
    stopTracking();
  } else {
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
      if (tabs[0]) checkTab(tabs[0].id, tabs[0].url);
    });
  }
});

async function updateBadge() {

  const usage = await getUsage();

  if (!activeHost) {
    browser.browserAction.setBadgeText({ text: "" });
    return;
  }

  const site = getSiteKey(activeHost);
  if (!site) {
    browser.browserAction.setBadgeText({ text: "" });
    return;
  }

  const seconds = usage[site] || 0;
  const minutes = Math.floor(seconds / 60);

  browser.browserAction.setBadgeText({
    text: minutes > 0 ? `${minutes}` : ""
  });

  browser.browserAction.setBadgeBackgroundColor({
    color: "#7927F5"
  });

}

setInterval(updateBadge, 10000);
updateBadge();