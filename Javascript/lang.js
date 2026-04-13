const translations = {
  en: {
    nav_home: "Home",
    nav_projects: "Projects",
    nav_about: "About",
    back_top: "↑ Back to top",
    footer_rights: "© 2025 OrigOwl. All rights reserved.",
    tab_final: "Final",
    tab_process: "Process",
    tab_sketch: "Sketch",
    tab_references: "References",
    tab_variations: "Variations",
    tab_video: "Video",
    project_click: "Click the image to open",
    project_collapse: "Click again to zoom out",
    about_title: "About",
    about_intro: "Design, motion and visual storytelling for bold brands.",
    about_who_title: "Who I Am",
    about_who_text: "I am a designer focused on visual direction, concept art and digital storytelling.",
    about_design_title: "Design Approach",
    about_design_text: "I create work with clarity, contrast and strong narrative impact.",
    about_contact_title: "Freelance & Contact",
    about_contact_text: "Available for concept, branding and digital campaigns. Lets talk.",
    about_cta_work: "See projects",
    about_cta_contact: "Contact me",
    index_hero_prefix: "Experimental",
    index_hero_suffix: "Visual Practice",
    manifesto_text: "Art direction, concept imagery and visual identity for creative projects.",
    section_film: "Film",
    section_concept: "Concept art",
    section_sport: "Sport / Speed",
    contact_label: "Contact",
    projects_label: "Projects",
    origin_label: "Origin"
  },
  pt: {
    nav_home: "Home",
    nav_projects: "Projetos",
    nav_about: "Sobre",
    back_top: "↑ Voltar ao topo",
    footer_rights: "© 2025 OrigOwl. Todos os direitos reservados.",
    tab_final: "Final",
    tab_process: "Processo",
    tab_sketch: "Sketch",
    tab_references: "Referências",
    tab_variations: "Variações",
    tab_video: "Vídeo",
    project_click: "Clique na imagem para abrir",
    project_collapse: "Clique novamente para reduzir",
    about_title: "Sobre",
    about_intro: "Design, motion e narrativa visual para marcas ousadas.",
    about_who_title: "Quem Sou",
    about_who_text: "Sou designer focado em direção visual, concept art e storytelling digital.",
    about_design_title: "Abordagem",
    about_design_text: "Crio projetos com clareza, contraste e impacto narrativo.",
    about_contact_title: "Freelance & Contato",
    about_contact_text: "Disponível para concept, branding e campanhas digitais. Vamos conversar.",
    about_cta_work: "Ver projetos",
    about_cta_contact: "Fale comigo",
    index_hero_prefix: "Experimental",
    index_hero_suffix: "Prática Visual",
    manifesto_text: "Direção de arte, imagens conceituais e identidade visual para projetos criativos.",
    section_film: "Filme",
    section_concept: "Concept art",
    section_sport: "Esporte / Velocidade",
    contact_label: "Contato",
    projects_label: "Projetos",
    origin_label: "Origem"
  }
};

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-en][data-pt]').forEach(el => {
    const value = el.dataset[lang];
    if (value !== undefined) {
      el.innerHTML = value;
    }
  });

  document.documentElement.lang = lang === 'pt' ? 'pt-br' : 'en';
  document.querySelectorAll('#lang-toggle, #lang-toggle-mobile').forEach(btn => {
    btn.textContent = lang === 'en' ? 'EN' : 'PT';
    btn.dataset.lang = lang;
  });
}

function getNextLanguage(current) {
  return current === 'en' ? 'pt' : 'en';
}

function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  applyTranslations(lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const currentLang = localStorage.getItem('lang') || 'en';
  setLanguage(currentLang);

  document.querySelectorAll('#lang-toggle, #lang-toggle-mobile').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextLang = getNextLanguage(btn.dataset.lang || currentLang);
      setLanguage(nextLang);
    });
  });
});
