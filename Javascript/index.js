/* ==========================================================
   MAIN.JS - Script unificado do site (Index + Projetos + Store + Sobre)
   ========================================================== */

/* --------------------------- LOGO & HOME --------------------------- */
const logoLink = document.querySelector(".logo");
const inicioLink = document.querySelector('header nav a');

function goToInicio() {
  window.location.href = "inicial.html";
}

if (logoLink) {
  logoLink.addEventListener("click", (e) => {
    e.preventDefault();
    goToInicio();
  });
}
if (inicioLink) {
  inicioLink.addEventListener("click", (e) => {
    e.preventDefault();
    goToInicio();
  });
}



/* --------------------------- MENU MOBILE --------------------------- */
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const closeBtn = document.getElementById("close-btn");
const submenus = document.querySelectorAll(".has-submenu > a");

if (menuToggle && menu && closeBtn) {
  menuToggle.addEventListener("click", () => menu.classList.add("active"));
  closeBtn.addEventListener("click", () => menu.classList.remove("active"));
}
if (submenus) {
  submenus.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      link.parentElement.classList.toggle("open");
    });
  });
}

/* --------------------------- SCROLL PERSISTENTE --------------------------- */
function saveScrollPosition() {
  localStorage.setItem("scrollPosition", window.scrollY);
}

function restoreScrollPosition() {
  const savedPosition = localStorage.getItem("scrollPosition");
  if (savedPosition !== null) {
    window.scrollTo(0, parseInt(savedPosition));
    localStorage.removeItem("scrollPosition");
  }
}

if (projetosContainer) {
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => saveScrollPosition());
  });
  window.addEventListener("DOMContentLoaded", restoreScrollPosition);
}






(function() {
  // Detecta se está abrindo dentro de um app de rede social
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const socialApps = [
    'Instagram',
    'FBAN', 'FBAV', 'Facebook',
    'Line',
    'LinkedIn',
    'Twitter',
    'Pinterest',
    'TikTok'
  ];

  const isInAppBrowser = socialApps.some(app => ua.includes(app));

  if (isInAppBrowser) {
    const viewport = document.querySelector('meta[name=viewport]');
    const contentValue = 'width=device-width, initial-scale=0.85, maximum-scale=0.85, user-scalable=no, viewport-fit=cover';
    
    if (viewport) {
      viewport.setAttribute('content', contentValue);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = contentValue;
      document.head.appendChild(meta);
    }

    console.log('Viewport ajustado para webview de rede social.');
  }
})();





