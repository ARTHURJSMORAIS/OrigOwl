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
