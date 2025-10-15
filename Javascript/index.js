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


/* --------------------------- INDEX - LISTA DE PROJETOS --------------------------- */
const projetos = [

{ titulo: "Social Media & Resort Concept Design", 
  descricao: "Projeto de identidade visual e social media inspirado no pinguim-de-Magalhães 🐧✨ ",
imagem: "img/Litoral Magalhão design.jpg", 
link: "projeto07.html" },



{ titulo: "Branding Retrô | Atomic Diner – Identidade Completa", 
  descricao: "A identidade visual do Atomic Diner  hamburguerias americanas dos anos 50. ",
imagem: "img/01.jpg", 
link: "projeto08.html" },

{ titulo: "PragX – Proteção Profissional contra Pragas", 
  descricao: "Este projeto foi desenvolvido para uma empresa do segmento de controle de pragas urbanas ",
imagem: "img/PragX03.png", 
link: "projeto11.html" },



{ titulo: "A FILM BY SAM MENDES", 
  descricao: "1917 – Pôster conceitual (arte digital semi-realista)",
imagem: "projeto12.img/1917 01.jpg", 
link: "projeto12.html" },




  { titulo: "The Mandalorian — Fan Poster Art", 
  descricao: "Original fanart from the Star Wars universe", 
imagem: "projeto02.img/The Mandalorian 01.jpg", 
link: "projeto02.html" },


  { titulo: "Avatar: Fan Art— The Way of Water", 
  descricao: "Art inspired by the universe of Avatar: The Way of Water.", 
imagem: "img/avatar 01.jpg", 
link: "projeto01.html" },


  { titulo: "Formula 1 Visual Design — Personal Project", 
  descricao: "SPEED & PERFORMANCE Formula 1 Visual Identity",
   imagem:"img/Max Verstappen.jpg",
    link: "projeto03.html" },


  { titulo: "Variações Visuais | William Lima", 
  descricao: "Três variações de personagem desenvolvidas a partir de photobash.", 
imagem: "projeto04.img/01.jpg", 
link: "projeto04.html" },




{ titulo: "Stage 4 – Glacial Sector", 
  descricao: "é um projeto de manipulação digital com foco em narrativa visual e ambientação climática extrema.",
imagem: "img/Stage 4 – Glacial Sector.jpg", 
link: "projeto05.html" },




{ titulo: "Cairo GP — Visual Concept", 
  descricao: "I created this artwork imagining what a Formula 1 race in Egypt would look like.",
imagem: "img/Hamilton 2.jpg", 
link: "projeto06.html" },






{ titulo: "The New Son of Krypton", 
  descricao: "Concept art inspired by James Gunn's Superman, in the new DC film. ",
imagem: "img/Superman DESIGN.jpg", 
link: "projeto09.html" },




{ titulo: "Fantastic Four Reimagined – Visual Concept Art (2025)", 
  descricao: "Fan art inspired by the official Fantastic Four (2025) poster.Visual reinterpretation ",
imagem: "img/Fantastic Four.jpg", 
link: "projeto10.html" },







];


if (projetosContainer) {
  projetos.forEach((proj, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = proj.imagem;
    img.alt = proj.titulo;

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const h3 = document.createElement("h3");
    h3.textContent = proj.titulo;

    const p = document.createElement("p");
    p.textContent = proj.descricao;

    cardContent.appendChild(h3);
    cardContent.appendChild(p);

    if (index % 2 !== 0) {
      card.appendChild(cardContent);
      card.appendChild(img);
    } else {
      card.appendChild(img);
      card.appendChild(cardContent);
    }

    if (proj.link) {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        window.location.href = proj.link;
      });
    }

    projetosContainer.appendChild(card);
  });


  window.addEventListener("resize", atualizarVisibilidadeProjetos);
  window.addEventListener("DOMContentLoaded", atualizarVisibilidadeProjetos);
  atualizarVisibilidadeProjetos();

  // Animação dos cards
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("show");
    }, index * 200);
  });
}

function atualizarVisibilidadeProjetos() {
  const largura = window.innerWidth;
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const img = card.querySelector("img");
    const descricao = card.querySelector("p");
    const conteudo = card.querySelector(".card-content");
    const titulo = card.querySelector("h3");

    if (largura <= 282) {
      // Some com imagem e descrição
      if (img) img.style.display = "none";
      if (descricao) descricao.style.display = "none";

      // Centraliza tudo no card
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.justifyContent = "center";
      card.style.alignItems = "center";
      card.style.textAlign = "center";

      conteudo.style.display = "flex";
      conteudo.style.flexDirection = "column";
      conteudo.style.justifyContent = "center";
      conteudo.style.alignItems = "center";
      conteudo.style.height = "100%";
      conteudo.style.width = "100%";

      // Ajuste visual do título
      titulo.style.margin = "0";
      titulo.style.fontSize = "1.6rem";
      titulo.style.lineHeight = "1.3";
      titulo.style.transition = "all 0.3s ease";
    } else {
      // Restaura o layout original
      if (img) img.style.display = "";
      if (descricao) descricao.style.display = "";

      card.style.display = "";
      card.style.flexDirection = "";
      card.style.justifyContent = "";
      card.style.alignItems = "";
      card.style.textAlign = "";

      conteudo.style.display = "";
      conteudo.style.flexDirection = "";
      conteudo.style.justifyContent = "";
      conteudo.style.alignItems = "";
      conteudo.style.height = "";
      conteudo.style.width = "";

      titulo.style.margin = "";
      titulo.style.fontSize = "";
      titulo.style.lineHeight = "";
      titulo.style.transition = "";
    }
  });
}

window.addEventListener("resize", atualizarVisibilidadeProjetos);
window.addEventListener("DOMContentLoaded", atualizarVisibilidadeProjetos);
atualizarVisibilidadeProjetos();
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





