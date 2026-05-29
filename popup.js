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
const LANGS = {
  en: { name: "English",   sec: "s",     title: "Daily Usage",            limitLabel: "Daily limit:",       min: "min",     save: "Save",        settings: "Settings",      back: "Back",     sitesTitle: "Sites",     langTitle: "Language", blocked: "Blocked",      remove: "Remove",   addPlaceholder: "e.g. reddit.com",    settingsTitle: "Settings" },
  tr: { name: "Türkçe",    sec: "sn",    title: "Günlük Kullanım",        limitLabel: "Günlük limit:",      min: "dk",      save: "Kaydet",      settings: "Ayarlar",       back: "Geri",     sitesTitle: "Siteler",   langTitle: "Dil",      blocked: "Engellendi",   remove: "Kaldır",   addPlaceholder: "örn: reddit.com",    settingsTitle: "Ayarlar" },
  de: { name: "Deutsch",   sec: "Sek",   title: "Tägliche Nutzung",       limitLabel: "Tageslimit:",        min: "Min",     save: "Speichern",   settings: "Einstellungen", back: "Zurück",   sitesTitle: "Seiten",    langTitle: "Sprache",  blocked: "Gesperrt",     remove: "Entfernen",addPlaceholder: "z.B. reddit.com",    settingsTitle: "Einstellungen" },
  ru: { name: "Русский",   sec: "с",     title: "Дневное использование",  limitLabel: "Дневной лимит:",     min: "мин",     save: "Сохранить",   settings: "Настройки",     back: "Назад",    sitesTitle: "Сайты",     langTitle: "Язык",     blocked: "Заблокировано",remove: "Удалить",  addPlaceholder: "напр. reddit.com",   settingsTitle: "Настройки" },
  fr: { name: "Français",  sec: "s",     title: "Utilisation quotidienne",limitLabel: "Limite quotidienne:",min: "min",     save: "Enregistrer", settings: "Paramètres",    back: "Retour",   sitesTitle: "Sites",     langTitle: "Langue",   blocked: "Bloqué",       remove: "Supprimer",addPlaceholder: "ex: reddit.com",     settingsTitle: "Paramètres" },
  es: { name: "Español",   sec: "s",     title: "Uso diario",             limitLabel: "Límite diario:",     min: "min",     save: "Guardar",     settings: "Ajustes",       back: "Volver",   sitesTitle: "Sitios",    langTitle: "Idioma",   blocked: "Bloqueado",    remove: "Eliminar", addPlaceholder: "ej: reddit.com",      settingsTitle: "Ajustes" },
  pt: { name: "Português", sec: "s",     title: "Uso diário",             limitLabel: "Limite diário:",     min: "min",     save: "Salvar",      settings: "Configurações", back: "Voltar",   sitesTitle: "Sites",     langTitle: "Idioma",   blocked: "Bloqueado",    remove: "Remover",  addPlaceholder: "ex: reddit.com",     settingsTitle: "Configurações" },
  zh: { name: "中文",       sec: "秒",    title: "每日使用情况",            limitLabel: "每日限制:",           min: "分钟",    save: "保存",         settings: "设置",           back: "返回",     sitesTitle: "网站",      langTitle: "语言",     blocked: "已封锁",        remove: "删除",     addPlaceholder: "例如: reddit.com",   settingsTitle: "设置" },
  ja: { name: "日本語",     sec: "秒",    title: "1日の使用状況",           limitLabel: "1日の制限:",          min: "分",      save: "保存",         settings: "設定",           back: "戻る",     sitesTitle: "サイト",    langTitle: "言語",     blocked: "ブロック済み",  remove: "削除",     addPlaceholder: "例: reddit.com",     settingsTitle: "設定" },
  hi: { name: "हिन्दी",    sec: "से",    title: "दैनिक उपयोग",           limitLabel: "दैनिक सीमा:",        min: "मिनट",    save: "सहेजें",      settings: "सेटिंग्स",      back: "वापस",     sitesTitle: "साइटें",    langTitle: "भाषा",     blocked: "अवरुद्ध",      remove: "हटाएं",    addPlaceholder: "जैसे: reddit.com",   settingsTitle: "सेटिंग्स" },
  ar: { name: "العربية",   sec: "ث",     title: "الاستخدام اليومي",       limitLabel: "الحد اليومي:",       min: "دقيقة",   save: "حفظ",          settings: "الإعدادات",     back: "رجوع",     sitesTitle: "المواقع",   langTitle: "اللغة",    blocked: "محظور",        remove: "إزالة",    addPlaceholder: "مثال: reddit.com",   settingsTitle: "الإعدادات" },
  it: { name: "Italiano",  sec: "s",     title: "Utilizzo giornaliero",   limitLabel: "Limite giornaliero:",min: "min",     save: "Salva",       settings: "Impostazioni",  back: "Indietro", sitesTitle: "Siti",      langTitle: "Lingua",   blocked: "Bloccato",     remove: "Rimuovi",  addPlaceholder: "es: reddit.com",     settingsTitle: "Impostazioni" },
};

const SITE_COLORS = {
  "twitter.com": "#1DA1F2", "x.com": "#1DA1F2",
  "facebook.com": "#3066be",
  "instagram.com": "#FF14F7",
  "youtube.com": "#FF0000",
  "tiktok.com": "#1FF2FF",
  "reddit.com": "#FF4500",
  "linkedin.com": "#0A66C2",
  "discord.com": "#7289da",
};

const DEFAULT_SITES = ["twitter.com", "x.com", "facebook.com", "instagram.com"];

let currentLang = "en";
let sites = [...DEFAULT_SITES];

function getTodayKey() {
  const d = new Date();
  return `usage_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`;
}

function fmt(s) {
  const t = LANGS[currentLang];
  if (s < 60) return s + t.sec;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return m + t.min + (rem > 0 ? " " + rem + t.sec : "");
}

function getColor(site) {
  return SITE_COLORS[site] || "#888";
}

function detectLang() {
  const bl = navigator.language || "en";
  const code = bl.split("-")[0].toLowerCase();
  return LANGS[code] ? code : "en";
}

function applyLang(l) {
  const t = LANGS[l];
  document.getElementById("txt-title").textContent = t.title;
  document.getElementById("txt-limit-label").textContent = t.limitLabel;
  document.getElementById("txt-min").textContent = t.min;
  document.getElementById("save-btn").textContent = t.save;
  document.getElementById("btn-settings").title = t.settings;
  document.getElementById("txt-back").textContent = t.back;
  document.getElementById("txt-settings-title").textContent = t.settingsTitle;
  document.getElementById("txt-sites-title").textContent = t.sitesTitle;
  document.getElementById("txt-lang-title").textContent = t.langTitle;
  document.getElementById("new-site-input").placeholder = t.addPlaceholder;
  document.querySelectorAll(".lang-btn").forEach(b => {
    b.classList.toggle("selected", b.dataset.lang === l);
  });
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

async function renderMain() {
  const key = getTodayKey();
  const stored = await browser.storage.local.get([key, "daily_limit", "sites", "lang"]);
  const usage = stored[key] || {};
  const limitMin = stored.daily_limit || 30;
  sites = stored.sites || DEFAULT_SITES;
  currentLang = stored.lang || detectLang();

  document.getElementById("limit").value = limitMin;
  applyLang(currentLang);

  const merged = { ...usage };
  if (merged["x.com"]) {
    merged["twitter.com"] = (merged["twitter.com"] || 0) + merged["x.com"];
  }

  const list = document.getElementById("sites-list");
  list.innerHTML = "";
  const t = LANGS[currentLang];

  const displaySites = sites.filter(s => {
    if (s === "x.com" && sites.includes("twitter.com")) return false;
    return true;
  });

  for (const site of displaySites) {
    const sec = merged[site] || 0;
    const pct = Math.min(100, Math.round((sec / (limitMin * 60)) * 100));
    const blocked = sec >= limitMin * 60;
    const color = blocked ? "#E24B4A" : getColor(site);
    const minutes = Math.floor(sec / 60);

    const div = document.createElement("div");
    div.className = "row";
    div.innerHTML = `
      <div class="top">
        <span>${site}</span>
        <span style="display:flex;align-items:center;gap:6px">
          <span style="font-size:12px;font-weight:500;color:${color}">${minutes}${t.min}</span>
          ${blocked ? `<span class="badge">${t.blocked}</span>` : ""}
        </span>
      </div>
      <div class="bar"><div class="fill" style="width:${pct}%;background:${color}"></div></div>
      <div class="info">${fmt(sec)} / ${limitMin}${t.min} (${pct}%)</div>
    `;
    list.appendChild(div);
  }
}

async function renderSettings() {
  const stored = await browser.storage.local.get(["sites", "lang"]);
  sites = stored.sites || DEFAULT_SITES;
  currentLang = stored.lang || detectLang();

  const t = LANGS[currentLang];
  const container = document.getElementById("settings-sites-list");
  container.innerHTML = "";

  for (const site of sites) {
    const div = document.createElement("div");
    div.className = "site-item";
    div.innerHTML = `
      <span>${site}</span>
      <button class="remove-btn" data-site="${site}" title="${t.remove}">×</button>
    `;
    container.appendChild(div);
  }

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const s = btn.dataset.site;
      sites = sites.filter(x => x !== s);
      await browser.storage.local.set({ sites });
      renderSettings();
    });
  });

  const grid = document.getElementById("lang-grid");
  grid.innerHTML = "";
  for (const [code, data] of Object.entries(LANGS)) {
    const btn = document.createElement("button");
    btn.className = "lang-btn" + (code === currentLang ? " selected" : "");
    btn.dataset.lang = code;
    btn.textContent = data.name;
    btn.addEventListener("click", async () => {
      currentLang = code;
      await browser.storage.local.set({ lang: code });
      applyLang(code);
      document.querySelectorAll(".lang-btn").forEach(b => {
        b.classList.toggle("selected", b.dataset.lang === code);
      });
    });
    grid.appendChild(btn);
  }
}

document.getElementById("add-site-btn").addEventListener("click", async () => {
  const input = document.getElementById("new-site-input");
  let val = input.value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  if (!val || !val.includes(".")) return;
  if (!sites.includes(val)) {
    sites.push(val);
    await browser.storage.local.set({ sites });
  }
  input.value = "";
  renderSettings();
});

document.getElementById("new-site-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") document.getElementById("add-site-btn").click();
});

document.getElementById("save-btn").addEventListener("click", async () => {
  const val = parseInt(document.getElementById("limit").value);
  if (val > 0) await browser.storage.local.set({ daily_limit: val });
  renderMain();
});

document.getElementById("btn-settings").addEventListener("click", () => {
  renderSettings();
  showScreen("screen-settings");
});

document.getElementById("btn-back").addEventListener("click", () => {
  renderMain();
  showScreen("screen-main");
});

renderMain();
setInterval(renderMain, 5000);