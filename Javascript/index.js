/* ==========================================================
   MAIN.JS - Script unificado do site (Index + Projetos + Store + Sobre)
   ========================================================== */


/* --------------------------- LOGO & HOME --------------------------- */
// Seleção dos elementos
const logoLink = document.querySelector(".logo");
const inicioLink = document.querySelector('header nav a');

// Função para ir para a página inicial
function goToInicio() {
  window.location.href = "inicial.html";
}

// Eventos
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

// Função mostrar Work
function showWork() {
  if (workSection && contactSection) {
    workSection.classList.add("active");
    contactSection.classList.remove("active");
  }
  if (sobreSection) sobreSection.style.display = "block";
  if (sidebarRight) sidebarRight.style.display = "block";
}

// Função mostrar Contact
function showContact() {
  if (contactSection && workSection) {
    contactSection.classList.add("active");
    workSection.classList.remove("active");
  }
  if (sobreSection) sobreSection.style.display = "none";
  if (sidebarRight) sidebarRight.style.display = "none";
}

// Eventos dos botões
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


  { titulo: "Path of Victory — Visual Artwork | William Lima", 
  descricao: "This composition was designed to represent the symbolic journey of triumph, discipline, and national pride through the figure of William Lima.", 
imagem: "img/william lima.jpg", 
link: "projeto04.html" },




{ titulo: "Stage 4 – Glacial Sector", 
  descricao: "é um projeto de manipulação digital com foco em narrativa visual e ambientação climática extrema.",
imagem: "img/Stage 4 – Glacial Sector.jpg", 
link: "projeto05.html" },




{ titulo: "Cairo GP — Visual Concept", 
  descricao: "I created this artwork imagining what a Formula 1 race in Egypt would look like.",
imagem: "img/Hamilton 2.jpg", 
link: "projeto06.html" },





{ titulo: "Social Media & Resort Concept Design", 
  descricao: "Projeto de identidade visual e social media inspirado no pinguim-de-Magalhães 🐧✨ ",
imagem: "img/Litoral Magalhão design.jpg", 
link: "projeto07.html" },



{ titulo: "Branding Retrô | Atomic Diner – Identidade Completa", 
  descricao: "A identidade visual do Atomic Diner nasceu a partir da estética das clássicas hamburguerias americanas dos anos 50. ",
imagem: "img/01.jpg", 
link: "projeto08.html" },



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
    card.innerHTML = `
      <img src="${proj.imagem}" alt="${proj.titulo}">
      <div class="card-content">
        <h3>${proj.titulo}</h3>
        <p>${proj.descricao}</p>
      </div>
    `;

    if (proj.link) {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        window.location.href = proj.link;
      });
    }

    if (index % 2 !== 0) {
      card.querySelector("img").style.order = 2;
      card.querySelector(".card-content").style.order = 1;
    }

    projetosContainer.appendChild(card);
  });

  // Animação dos cards
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("show");
    }, index * 200);
  });
}




// Ajuste de altura da sidebar
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


/* --------------------------- MENU LATERAL (MOBILE) --------------------------- */
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


/* --------------------------- SALVAR E RESTAURAR SCROLL --------------------------- */
// Salvar posição do scroll antes de sair da página
function saveScrollPosition() {
  localStorage.setItem("scrollPosition", window.scrollY);
}

// Restaurar posição do scroll ao carregar
function restoreScrollPosition() {
  const savedPosition = localStorage.getItem("scrollPosition");
  if (savedPosition !== null) {
    window.scrollTo(0, parseInt(savedPosition));
    localStorage.removeItem("scrollPosition"); // limpa para não aplicar sempre
  }
}

// Aplica apenas na página index.html
if (projetosContainer) {
  // Antes de abrir qualquer projeto, salvar posição
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      saveScrollPosition();
    });
  });

  // Quando voltar pro index, restaurar posição
  window.addEventListener("DOMContentLoaded", restoreScrollPosition);
}
