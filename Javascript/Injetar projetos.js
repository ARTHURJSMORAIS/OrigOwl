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





const projetos = [

  // ===== FILMES =====
  {
    titulo: "The Godfather",
    descricao: "Peça autoral inspirada em O Poderoso Chefão.",
    imagem: "projeto16.img/The Godfather.jpg",
    link: "projeto16.html",
    categoria: "filme"
  },
  {
    titulo: "Interestelar",
    descricao: "Poster conceitual inspirado no filme.",
    imagem: "projeto15.img/Interestelar copiar.jpg",
    link: "projeto15.html",
    categoria: "filme"
  },
  {
    titulo: "1917 — Sam Mendes",
    descricao: "Poster conceitual semi-realista.",
    imagem: "projeto12.img/1917 01.jpg",
    link: "projeto12.html",
    categoria: "filme"
  },
  {
    titulo: "The Mandalorian",
    descricao: "Poster art do universo Star Wars.",
    imagem: "projeto02.img/The Mandalorian 01.jpg",
    link: "projeto02.html",
    categoria: "filme"
  },

  // ===== ESPORTE =====
  {
    titulo: "Formula 1 Visual Design",
    descricao: "Identidade visual focada em performance.",
    imagem: "img/Max Verstappen.jpg",
    link: "projeto03.html",
    categoria: "esporte"
  },
  {
    titulo: "Cairo GP",
    descricao: "Conceito de F1 no Egito.",
    imagem: "img/Hamilton 2.jpg",
    link: "projeto06.html",
    categoria: "esporte"
  },
  {
    titulo: "Champions League",
    descricao: "Composição visual de glória coletiva.",
    imagem: "projeto13.img/champions league.jpg",
    link: "projeto13.html",
    categoria: "esporte"
  },

  // ===== CONCEITO =====
  {
    titulo: "Fantastic Four Reimagined",
    descricao: "Concept art cinematográfica (2025).",
    imagem: "img/Fantastic Four.jpg",
    link: "projeto10.html",
    categoria: "conceito"
  },
  {
    titulo: "Stage 4 – Glacial Sector",
    descricao: "Narrativa visual e manipulação digital.",
    imagem: "img/Stage 4 – Glacial Sector.jpg",
    link: "projeto05.html",
    categoria: "conceito"
  },
  {
    titulo: "Superman — Son of Krypton",
    descricao: "Concept inspirado em James Gunn.",
    imagem: "img/Superman DESIGN.jpg",
    link: "projeto09.html",
    categoria: "conceito"
  },

  // ===== IDENTIDADE =====
  {
    titulo: "Atomic Diner",
    descricao: "Identidade retrô anos 50.",
    imagem: "img/01.jpg",
    link: "projeto08.html",
    categoria: "identidade"
  },
  {
    titulo: "PragX",
    descricao: "Identidade para controle de pragas.",
    imagem: "img/PragX03.png",
    link: "projeto11.html",
    categoria: "identidade"
  },
  {
    titulo: "Sorriso & Saúde",
    descricao: "Clínica odontológica fictícia.",
    imagem: "projeto14.img/10.jpg",
    link: "projeto14.html",
    categoria: "identidade"
  }
];

// ================= INJEÇÃO =================

function criarCard(p) {
  const a = document.createElement("a");
  a.className = "project-card reveal-mask";
  a.href = p.link;
  a.innerHTML = `
    <div class="project-media">
      <img src="${p.imagem}" alt="${p.titulo}">
    </div>
    <div class="project-gradient"></div>
    <div class="project-copy">
      <h3>${p.titulo}</h3>
      <p>${p.descricao}</p>
      <div class="project-actions">
        <span class="view-btn">Ver Projeto</span>
      </div>
    </div>
  `;
  return a;
}

projetos.forEach(p => {
  const grid = document.getElementById(`grid-${p.categoria}`);
  if (grid) grid.appendChild(criarCard(p));
});


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



const filterButtons = document.querySelectorAll(".filters button");
const allCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filtro = btn.dataset.filter;

    allCards.forEach(card => {
      if (filtro === "all" || card.parentElement.id === `grid-${filtro}`) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});




window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});

document.querySelectorAll("a").forEach(link => {
  if (link.href && !link.href.includes("#")) {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.body.classList.remove("page-loaded");
      setTimeout(() => {
        window.location = link.href;
      }, 600);
    });
  }
});




const lazyImages = document.querySelectorAll("img[data-src]");

const imgObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.onload = () => img.classList.add("loaded");
      imgObserver.unobserve(img);
    }
  });
}, { threshold: 0.2 });

lazyImages.forEach(img => imgObserver.observe(img));









const grids = document.querySelectorAll(".projects-grid");

const gridObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll(".project-card");
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add("show"), i * 120);
      });
      gridObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

grids.forEach(grid => gridObserver.observe(grid));
BD268