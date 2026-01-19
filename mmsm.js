const translations = {
  en: {
    title: "Welcome to my website",
    desc: "This is a simple language switcher."
  },
  ar: {
    title: "مرحباً بك في موقعي",
    desc: "هذا مثال بسيط لتغيير اللغة في الموقع."
  }
};

function applyLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key];
  });
  localStorage.setItem("site-lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("langBtn");
  const list = document.getElementById("langList");

  // تحميل اللغة المحفوظة
  let saved = localStorage.getItem("site-lang") || "ar";
  applyLang(saved);

  // فتح/غلق Dropdown
  btn.addEventListener("click", () => {
    list.classList.toggle("hidden");
  });

  // اختيار اللغة
  list.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => {
      const lang = li.getAttribute("data-lang");
      applyLang(lang);
      list.classList.add("hidden");
    });
  });

  // إغلاق Dropdown لو ضغط برا
  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !list.contains(e.target)) {
      list.classList.add("hidden");
    }
  });
});