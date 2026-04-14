const translations = {
  en: {
    nav_home: "Home",
    nav_projects: "Projects",
    nav_about: "About",
    back_top: "↑ BACK TO TOP",
    footer_rights: "© 2025 OrigOwl. All rights reserved.",
    tab_final: "Final",
    tab_process: "Process",
    tab_sketch: "Sketch",
    tab_references: "References",
    tab_variations: "Variations",
    tab_video: "Video",
    project_click: "Click to expand",
    project_collapse: "Click to collapse",
    no_variations: "No additional variations available."
  },
  pt: {
    nav_home: "Home",
    nav_projects: "PROJETOS",
    nav_about: "SOBRE",
    back_top: "↑ BACK TO TOP",
    footer_rights: "© 2025 OrigOwl. Todos os direitos reservados.",
    tab_final: "Final",
    tab_process: "Processo",
    tab_sketch: "Sketch",
    tab_references: "Referências",
    tab_variations: "Variações",
    tab_video: "Vídeo",
    project_click: "Clique para expandir",
    project_collapse: "Clique para fechar",
    no_variations: "Sem variações adicionais disponíveis."
  }
};

function applyTranslations(lang) {
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

  // 🔹 textos simples
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang]?.[key]) {
      el.textContent = translations[lang][key];
    }
  });

  // 🔹 textos customizados
  document.querySelectorAll("[data-en][data-pt]").forEach(el => {
    const value = el.dataset[lang];
    if (value !== undefined) {
      el.textContent = value;
    }
  });

  // 🔹 botões de idioma
  document.querySelectorAll("#lang-toggle, #lang-toggle-mobile").forEach(btn => {
    btn.textContent = lang.toUpperCase();
    btn.dataset.lang = lang;
  });
}

function getNextLanguage(current) {
  return current === "en" ? "pt" : "en";
}

function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  applyTranslations(lang);
}

document.addEventListener("DOMContentLoaded", () => {
  let currentLang = localStorage.getItem("lang") || "en";

  applyTranslations(currentLang);

  document.querySelectorAll("#lang-toggle, #lang-toggle-mobile").forEach(btn => {
    btn.addEventListener("click", () => {
      currentLang = getNextLanguage(currentLang);
      setLanguage(currentLang);
    });
  });
});