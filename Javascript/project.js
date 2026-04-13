document.addEventListener('DOMContentLoaded', () => {
  if (!window.CINEMATIC_PROJECTS) return;

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id');
  const project = window.CINEMATIC_PROJECTS.find((item) => item.id === projectId);
  const titleEl = document.getElementById('project-title');
  const descriptionEl = document.getElementById('project-description');
  const categoryEl = document.getElementById('project-category');
  const yearEl = document.getElementById('project-year');
  const heroEl = document.getElementById('project-hero-media');
  const conceptEl = document.getElementById('project-concept');
  const briefEl = document.getElementById('project-brief');
  const breakdownEl = document.getElementById('project-breakdown');
  const finalEl = document.getElementById('project-final');
  const galleryEl = document.getElementById('project-gallery');
  const relatedEl = document.getElementById('related-project-grid');
  const warningEl = document.getElementById('project-warning');

  if (!project || !titleEl || !descriptionEl || !categoryEl || !yearEl || !heroEl) {
    if (warningEl) {
      warningEl.innerHTML = '<p>Projeto não encontrado. Retorne ao portfólio para continuar a experiência.</p>'; 
    }
    return;
  }

  titleEl.textContent = project.title;
  descriptionEl.textContent = project.description;
  categoryEl.textContent = project.category;
  yearEl.textContent = project.year;
  heroEl.style.backgroundImage = `url('${project.hero}')`;
  conceptEl.textContent = project.concept;
  briefEl.textContent = project.brief;
  breakdownEl.textContent = project.breakdown;
  finalEl.textContent = project.final;

  if (project.gallery && galleryEl) {
    project.gallery.forEach((src) => {
      const card = document.createElement('div');
      card.className = 'gallery-card';
      if (src.endsWith('.mp4')) {
        card.innerHTML = `<video src="${src}" autoplay muted loop playsinline></video>`;
      } else {
        card.innerHTML = `<img src="${src}" alt="${project.title}">`;
      }
      galleryEl.appendChild(card);
    });
  }

  if (relatedEl) {
    const related = window.CINEMATIC_PROJECTS.filter((item) => item.id !== project.id).slice(0, 6);
    related.forEach((item) => {
      const card = document.createElement('a');
      card.className = 'project-card';
      card.href = `project.html?id=${encodeURIComponent(item.id)}`;
      card.innerHTML = `
        <img src="${item.hero}" alt="${item.title}">
        <div class="project-card-content">
          <span>${item.category}</span>
          <h3 class="project-card-title">${item.title}</h3>
        </div>
      `;
      relatedEl.appendChild(card);
    });
  }

  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.0001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: true,
    direction: 'vertical'
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  lenis.on('scroll', ScrollTrigger.update);
  ScrollTrigger.addEventListener('refresh', () => lenis.update());

  gsap.from('.project-hero-copy .eyebrow', { opacity: 0, y: 22, duration: 0.9, ease: 'power3.out' });
  gsap.from('#project-title', { opacity: 0, y: 90, duration: 1.3, ease: 'power3.out', delay: 0.1 });
  gsap.from('.project-hero-copy p', { opacity: 0, y: 60, duration: 1.2, ease: 'power3.out', delay: 0.2 });
  gsap.from('.project-meta span', { opacity: 0, y: 40, duration: 1.1, ease: 'power3.out', delay: 0.25 });

  gsap.to('.project-hero-media', {
    scale: 1.1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.project-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.from('.detail-block', { opacity: 0, y: 80, duration: 1.2, ease: 'power3.out', stagger: 0.15, scrollTrigger: { trigger: '.project-detail', start: 'top 85%' } });
  gsap.from('.gallery-card', { opacity: 0, y: 100, duration: 1.2, ease: 'power4.out', stagger: 0.1, scrollTrigger: { trigger: '.project-gallery', start: 'top 85%' } });
  gsap.from('.project-card', { opacity: 0, y: 60, duration: 1.1, ease: 'power4.out', stagger: 0.08, scrollTrigger: { trigger: '.project-related', start: 'top 90%' } });

  gsap.utils.toArray('.gallery-card').forEach((card) => {
    gsap.to(card, {
      y: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
});
