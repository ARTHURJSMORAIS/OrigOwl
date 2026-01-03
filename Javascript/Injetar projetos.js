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