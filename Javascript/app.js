document.addEventListener('DOMContentLoaded', () => {
  if (!window.CINEMATIC_PROJECTS) return;

  const projectGrid = document.getElementById('project-grid');
  if (projectGrid) {
    window.CINEMATIC_PROJECTS.forEach((project) => {
      const card = document.createElement('a');
      card.className = 'project-card';
      card.href = `project.html?id=${encodeURIComponent(project.id)}`;
      card.innerHTML = `
        <img src="${project.hero}" alt="${project.title}">
        <div class="project-card-content">
          <span>${project.category}</span>
          <h3 class="project-card-title">${project.title}</h3>
          <p class="project-card-text">${project.description}</p>
        </div>
      `;
      projectGrid.appendChild(card);
    });
  }

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.intro .eyebrow', { opacity: 0, y: 24, duration: 1 })
    .from('.intro h1', { opacity: 0, y: 120, duration: 1.5 }, '<0.1')
    .from('.intro p', { opacity: 0, y: 64, duration: 1.3 }, '<0.1')
    .from('.intro-footer', { opacity: 0, y: 40, duration: 1.2 }, '<0.05');

  ScrollTrigger.create({
    trigger: '.intro',
    start: 'top top',
    end: 'bottom top',
    pin: true,
    pinSpacing: true,
    scrub: 0.8
  });

  ScrollTrigger.create({
    trigger: '.build-up',
    start: 'top top',
    end: 'bottom top',
    pin: true,
    pinSpacing: true,
    scrub: true
  });

  gsap.utils.toArray('.visual-card').forEach((card, index) => {
    const direction = index % 2 === 0 ? -120 : 120;
    gsap.from(card, {
      opacity: 0,
      y: 90,
      x: direction,
      scale: 0.98,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 100%',
        end: 'top 60%',
        scrub: 0.8
      }
    });
  });

  gsap.from('.project-card', {
    opacity: 0,
    y: 130,
    duration: 1.2,
    ease: 'power4.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: '.reveal',
      start: 'top 90%',
      end: 'bottom top',
      scrub: 0.85
    }
  });

  gsap.from('.climax-card', {
    opacity: 0,
    y: 120,
    scale: 0.94,
    duration: 1.3,
    ease: 'power3.out',
    stagger: 0.16,
    scrollTrigger: {
      trigger: '.climax',
      start: 'top 85%',
      end: 'bottom top',
      scrub: 0.85
    }
  });

  ScrollTrigger.create({
    trigger: '.climax',
    start: 'top top',
    end: 'bottom top',
    pin: true,
    pinSpacing: true,
    scrub: true
  });

  gsap.utils.toArray('.scene').forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 60,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 90%'
      }
    });
  });

  gsap.utils.toArray('.visual-card img').forEach((image) => {
    gsap.to(image, {
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: image,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  const root = document.documentElement;
  document.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 20;
    const y = (event.clientY / window.innerHeight - 0.5) * 20;
    gsap.to(root, {
      '--pointer-x': `${50 + x}%`,
      '--pointer-y': `${20 + y}%`,
      duration: 1.8,
      ease: 'power3.out'
    });
  });
});
