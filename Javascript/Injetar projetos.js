/* script.js
   Injetar projetos, menu mobile, reveal on scroll, parallax hero, navegação suave
*/

/* Helpers */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

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

/* --- Projects list (usei exatamente seus títulos/descrições/links; corrija paths se necessário) --- */
const projetos = [



{ titulo: "The Godfather", 
  descricao: "Esta obra é uma peça autoral desenvolvida a partir do universo visual de O Poderoso Chefão.",
imagem: "projeto16.img/The Godfather.jpg", 
link: "projeto16.html" },


 { titulo: "Variações Visuais | William Lima", 
  descricao: "Três variações de personagem desenvolvidas a partir de photobash.", 
imagem: "projeto04.img/01.jpg", 
link: "projeto04.html" },

{ titulo: "Interestelar", 
  descricao: " arte Interestelar cartaz. ",
imagem: "projeto15.img/Interestelar copiar.jpg", 
link: "projeto15.html" },


{ titulo: "A FILM BY SAM MENDES", 
  descricao: "1917 – Pôster conceitual (arte digital semi-realista)",
imagem: "projeto12.img/1917 01.jpg", 
link: "projeto12.html" },





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



{ titulo: "Projeto pessoal — Sorriso & Saúde Odontologia", 
  descricao: "dentidade visual desenvolvida para uma clínica fictícia de odontologia",
imagem: "projeto14.img/10.jpg", 
link: "projeto14.html" },



  { titulo: "The Mandalorian —  Poster Art", 
  descricao: "Original do universo Star Wars", 
imagem: "projeto02.img/The Mandalorian 01.jpg", 
link: "projeto02.html" },


  { titulo: "Avatar: Art— The Way of Water", 
  descricao: "Art inspired by the universe of Avatar: The Way of Water.", 
imagem: "img/avatar 01.jpg", 
link: "projeto01.html" },


  { titulo: "Formula 1 Visual Design", 
  descricao: "SPEED & PERFORMANCE Formula 1 Visual Identity",
   imagem:"img/Max Verstappen.jpg",
    link: "projeto03.html" },


 



{ titulo: "Stage 4 – Glacial Sector", 
  descricao: "é um projeto de manipulação digital com foco em narrativa visual.",
imagem: "img/Stage 4 – Glacial Sector.jpg", 
link: "projeto05.html" },




{ titulo: "Cairo GP — Visual Concept", 
  descricao: " Como seria uma corrida de Fórmula 1 no Egito?",
imagem: "img/Hamilton 2.jpg", 
link: "projeto06.html" },






{ titulo: "The New Son of Krypton", 
  descricao: "Concept art inspirada no Superman de James Gunn. ",
imagem: "img/Superman DESIGN.jpg", 
link: "projeto09.html" },




{ titulo: "Composição Visual de Glória e Unidade)", 
  descricao: " A arte utiliza uma composição centrada na celebração coletiva, reforçando a narrativa de conquista. ",
imagem: "projeto13.img/champions league.jpg", 
link: "projeto13.html" },





{ titulo: "Fantastic Four Reimagined – Visual Concept Art (2025)", 
  descricao: " arte (2025) cartaz. Reinterpretação visual ",
imagem: "img/Fantastic Four.jpg", 
link: "projeto10.html" },






];

/* Inject project cards */
const grid = $('#projectsGrid');
if (grid) {
  projetos.forEach((p, i) => {
    const a = document.createElement('a');
    a.className = 'project-card reveal-mask' + (i % 2 ? ' alt' : '');
    a.href = p.link || '#';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML = `
      <div class="project-media"><img loading="lazy" src="${p.imagem}" alt="${p.titulo}"></div>
      <div class="project-gradient"></div>
      <div class="project-copy">
        <h3>${p.titulo}</h3>
        <p>${p.descricao}</p>
        <div class="project-actions"><span class="view-btn">Ver Projeto</span></div>
      </div>
    `;
    grid.appendChild(a);
  });
}

/* IntersectionObserver reveal (stagger) */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      if (entry.target.classList.contains('reveal-mask')) {
        // reveal children stagger
        const children = Array.from(entry.target.children);
        children.forEach((ch, idx) => {
          ch.style.transitionDelay = `${idx * 90}ms`;
          ch.style.transform = 'none';
          ch.style.opacity = '1';
        });
      }
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

setTimeout(() => {
  $$('.project-card').forEach(card => revealObserver.observe(card));
  $$('.reveal-mask').forEach(el => revealObserver.observe(el));
}, 60);

/* Parallax hero subtle */
const heroImg = document.querySelector('.hero-media img');
if (heroImg) {
  window.addEventListener('mousemove', e => {
    const w = window.innerWidth, h = window.innerHeight;
    const mx = (e.clientX - w/2) / w;
    const my = (e.clientY - h/2) / h;
    heroImg.style.transform = `translate(${mx * 8}px, ${my * 6}px) scale(1.06)`;
  });
  window.addEventListener('mouseout', () => heroImg.style.transform = 'translate(0,0) scale(1.03)');
}

/* Back to top */
const toTop = $('#toTop');
if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* Accessibility / keyboard close */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') mobileMenu.classList.remove('open');
});
