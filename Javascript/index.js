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

/* --------------------------- INDEX - MECÂNICA WORK & CONTACT --------------------------- */
const workBtns = document.querySelectorAll(".btn-work");
const contactBtns = document.querySelectorAll(".btn-contact");
const workSection = document.getElementById("work-section");
const contactSection = document.getElementById("contact-section");
const sobreSection = document.getElementById("sobre");
const projetosContainer = document.querySelector(".projetos");
const sidebarRight = document.getElementById("sidebar-right");

function showWork() {
  if (workSection && contactSection) {
    workSection.classList.add("active");
    contactSection.classList.remove("active");
  }
  if (sobreSection) sobreSection.style.display = "block";
  if (sidebarRight) sidebarRight.style.display = "block";
}

function showContact() {
  if (contactSection && workSection) {
    contactSection.classList.add("active");
    workSection.classList.remove("active");
  }
  if (sobreSection) sobreSection.style.display = "none";
  if (sidebarRight) sidebarRight.style.display = "none";
}

workBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    showWork();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
contactBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    showContact();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});



/* --------------------------- AJUSTE DE SIDEBAR --------------------------- */
function ajustarSidebar() {
  const footer = document.querySelector("footer");
  if (!sidebarRight || !footer) return;
  const windowHeight = window.innerHeight;
  const footerHeight = footer.offsetHeight;
  const sidebarTop = sidebarRight.getBoundingClientRect().top;
  sidebarRight.style.maxHeight = `${windowHeight - sidebarTop - footerHeight - 20}px`;
}

window.addEventListener("DOMContentLoaded", () => {
  ajustarSidebar();
  if (workSection) showWork();
  window.scrollTo({ top: 0 });
});
window.addEventListener("resize", ajustarSidebar);
window.addEventListener("scroll", ajustarSidebar);

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





