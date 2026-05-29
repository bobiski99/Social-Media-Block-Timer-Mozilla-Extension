const LANGS = {
  en: {
    title: "Daily limit reached",
    desc: "— you've used up today's limit.",
    reset: "Counter resets at midnight."
  },

  tr: {
    title: "Günlük süren doldu",
    desc: "— bugünkü limitine ulaştın.",
    reset: "Sayaç gece yarısı sıfırlanır."
  },

  de: {
    title: "Tageslimit erreicht",
    desc: "— dein Tageslimit wurde erreicht.",
    reset: "Zähler wird um Mitternacht zurückgesetzt."
  },

  ru: {
    title: "Дневной лимит исчерпан",
    desc: "— вы исчерпали дневной лимит.",
    reset: "Счётчик сбрасывается в полночь."
  },

  fr: {
    title: "Limite quotidienne atteinte",
    desc: "— vous avez atteint votre limite.",
    reset: "Le compteur se réinitialise à minuit."
  },

  es: {
    title: "Límite diario alcanzado",
    desc: "— has agotado tu límite de hoy.",
    reset: "El contador se reinicia a medianoche."
  },

  pt: {
    title: "Limite diário atingido",
    desc: "— você atingiu seu limite de hoje.",
    reset: "O contador é reiniciado à meia-noite."
  },

  zh: {
    title: "已达到每日限制",
    desc: "— 今日使用时间已用完。",
    reset: "计数器在午夜重置。"
  },

  ja: {
    title: "1日の上限に達しました",
    desc: "— 本日の利用時間が上限に達しました。",
    reset: "カウンターは深夜にリセットされます。"
  },

  hi: {
    title: "दैनिक सीमा पूरी हुई",
    desc: "— आपने आज की सीमा पूरी कर ली।",
    reset: "काउंटर आधी रात को रीसेट होता है।"
  },

  ar: {
    title: "تم الوصول إلى الحد اليومي",
    desc: "— لقد استنفدت حدك اليومي.",
    reset: "تتم إعادة تعيين العداد في منتصف الليل."
  },

  it: {
    title: "Limite giornaliero raggiunto",
    desc: "— hai esaurito il limite di oggi.",
    reset: "Il contatore si azzera a mezzanotte."
  }
};

window.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);

  const site = params.get("site") || "";
  const lang = params.get("lang") || "en";

  const t = LANGS[lang] || LANGS.en;

  document.getElementById("txt-title").textContent = t.title;
  document.getElementById("txt-site").textContent = site;
  document.getElementById("txt-desc").textContent = " " + t.desc;
  document.getElementById("txt-reset").textContent = t.reset;

});