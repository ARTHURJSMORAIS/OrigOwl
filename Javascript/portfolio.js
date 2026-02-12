const transition = document.querySelector('.page-transition');

document.querySelectorAll('a').forEach(link => {
  if (link.hostname === window.location.hostname) {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.href;

      transition.classList.add('active');

      setTimeout(() => {
        window.location.href = href;
      }, 600);
    });
  }
});





/* =========================
   SCROLL VERTICAL → HORIZONTAL
========================= */

const strips = document.querySelectorAll(".strip");

strips.forEach(strip => {
  strip.addEventListener("wheel", (e) => {
    if (window.innerWidth > 768) {
      e.preventDefault();
      strip.scrollLeft += e.deltaY;
    }
  }, { passive: false });
});

/* =========================
   ENTRADA ANIMADA EDITORIAL
========================= */

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.25
  }
);

strips.forEach(strip => observer.observe(strip));

window.addEventListener("pageshow", function () {
  const transition = document.querySelector(".page-transition");
  if (transition) {
    transition.classList.remove("active");
  }
});
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    const transition = document.querySelector(".page-transition");
    if (transition) {
      transition.classList.remove("active");
      transition.style.opacity = "0";
      transition.style.pointerEvents = "none";
    }
  }
});
