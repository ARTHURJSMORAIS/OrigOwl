function initProjectExperience() {
  const section = document.getElementById('projeto');
  if (!section) return;

  const titleEl = section.querySelector('h1');
  const paragraphEls = Array.from(section.querySelectorAll('p')).filter(p => p.textContent.trim());
  const imageEls = Array.from(section.querySelectorAll('.grid-imagens img')).filter(img => img.src);
  const videoContainer = section.querySelector('.video-container');
  const images = imageEls.map(img => ({ src: img.src, alt: img.alt || titleEl?.textContent.trim() || 'Project image' }));

  const title = titleEl?.textContent.trim() || 'OrigOwl Project';
  const summary = paragraphEls[0]?.textContent.trim() || '';
  const processText = paragraphEls[1]?.textContent.trim() || '';
  const sketchText = paragraphEls[2]?.textContent.trim() || '';
  const referencesText = paragraphEls[3]?.textContent.trim() || '';
  const descriptionText = paragraphEls.length > 1 ? paragraphEls.slice(1).map(p => p.textContent.trim()).join(' ') : summary;
  const hasVideo = Boolean(videoContainer);
  const videoMarkup = hasVideo ? videoContainer.outerHTML : '';

  const tabButtons = [
    '<button class="tab-button active" data-tab="final" data-i18n="tab_final">Final</button>',
    '<button class="tab-button" data-tab="process" data-i18n="tab_process">Process</button>',
    '<button class="tab-button" data-tab="sketch" data-i18n="tab_sketch">Sketch</button>',
    '<button class="tab-button" data-tab="references" data-i18n="tab_references">References</button>',
    '<button class="tab-button" data-tab="variations" data-i18n="tab_variations">Variations</button>'
  ];

  if (hasVideo) {
    tabButtons.push('<button class="tab-button" data-tab="video" data-i18n="tab_video">Video</button>');
  }

  const imageGalleryMarkup = images.length
    ? images.map((img, index) => `
        <button class="gallery-thumb" type="button" data-index="${index}" aria-label="Open image ${index + 1}">
          <img src="${img.src}" alt="${img.alt}">
        </button>
      `).join('')
    : '<div class="project-copy" data-i18n="no_variations">No additional variations available.</div>';

  const variationsMarkup = images.length > 1
    ? images.map((img, index) => `
        <button class="variation-thumb" type="button" data-index="${index}" aria-label="View variation ${index + 1}">
          <img src="${img.src}" alt="${img.alt}">
        </button>
      `).join('')
    : `<div class="project-copy" data-i18n="no_variations">No additional variations available.</div>`;

  section.innerHTML = `
    <div class="project-content">
      <div class="project-header">
        <div class="project-title">
          <h1>${title}</h1>
        </div>
        <div class="project-tabs">
          ${tabButtons.join('')}
        </div>
      </div>

      <div class="tab-panel active" data-panel="final">
        <div class="project-media">
          <div class="project-image-frame" aria-label="Open image modal">
            <img class="gallery-image" src="${images[0]?.src || ''}" alt="${images[0]?.alt || title}">
          </div>
        </div>
      </div>

      <div class="tab-panel" data-panel="process">
        <div class="project-grid-images">
          ${imageGalleryMarkup}
        </div>
      </div>

      <div class="tab-panel" data-panel="sketch">
        <div class="project-grid-images">
          ${imageGalleryMarkup}
        </div>
      </div>

      <div class="tab-panel" data-panel="references">
        <div class="project-grid-images">
          ${imageGalleryMarkup}
        </div>
      </div>

      <div class="tab-panel" data-panel="variations">
        <div class="project-gallery-grid">
          ${variationsMarkup}
        </div>
      </div>

      ${hasVideo ? `<div class="tab-panel" data-panel="video"><div class="project-video-panel">${videoMarkup}</div></div>` : ''}
    </div>
  `;

  const modal = document.createElement('div');
  modal.className = 'project-modal';
  modal.innerHTML = `
    <div class="project-modal-backdrop"></div>
    <div class="project-modal-window">
      <button class="modal-close" type="button" aria-label="Close modal">×</button>
      <div class="modal-media">
        <button class="modal-nav prev" type="button" aria-label="Previous image">←</button>
        <img class="modal-image" src="${images[0]?.src || ''}" alt="${images[0]?.alt || title}">
        <button class="modal-nav next" type="button" aria-label="Next image">→</button>
      </div>
      <div class="modal-info">
        <h2>${title}</h2>
        <p>${descriptionText}</p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const tabButtonsEls = section.querySelectorAll('.tab-button');
  const tabPanels = section.querySelectorAll('.tab-panel');
  const galleryImage = section.querySelector('.gallery-image');
  const gridThumbButtons = section.querySelectorAll('.gallery-thumb');
  const prevBtn = section.querySelector('.gallery-nav.prev');
  const nextBtn = section.querySelector('.gallery-nav.next');
  const variationButtons = section.querySelectorAll('.variation-thumb');
  const modalBackdrop = modal.querySelector('.project-modal-backdrop');
  const modalImage = modal.querySelector('.modal-image');
  const modalClose = modal.querySelector('.modal-close');
  const modalPrev = modal.querySelector('.modal-nav.prev');
  const modalNext = modal.querySelector('.modal-nav.next');

  let currentIndex = 0;
  let modalNavEnabled = false;

  const updateGallery = () => {
    if (!images.length) return;
    const current = images[currentIndex];
    if (galleryImage) {
      galleryImage.src = current.src;
      galleryImage.alt = current.alt;
    }
    modalImage.src = current.src;
    modalImage.alt = current.alt;
  };

  const setActiveTab = key => {
    tabButtonsEls.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === key));
    tabPanels.forEach(panel => panel.classList.toggle('active', panel.dataset.panel === key));
  };

  const openModal = (enableNav = false) => {
    modalNavEnabled = enableNav && images.length > 1;
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    if (modalPrev && modalNext) {
      modalPrev.style.display = modalNavEnabled ? 'block' : 'none';
      modalNext.style.display = modalNavEnabled ? 'block' : 'none';
    }
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    modalImage.classList.remove('zoomed');
    modalImage.style.transformOrigin = 'center center';
  };

  const prevImage = () => {
    if (!modalNavEnabled || !images.length) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
  };

  const nextImage = () => {
    if (!modalNavEnabled || !images.length) return;
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
  };

  const toggleZoom = () => {
    if (!modalImage) return;
    modalImage.classList.toggle('zoomed');
  };

  const updateZoomOrigin = e => {
    if (!modalImage.classList.contains('zoomed')) return;
    const rect = modalImage.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    modalImage.style.transformOrigin = `${x}% ${y}%`;
  };

  tabButtonsEls.forEach(btn => btn.addEventListener('click', () => setActiveTab(btn.dataset.tab)));
  galleryImage?.addEventListener('click', () => openModal(false));
  gridThumbButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.index);
      if (!Number.isNaN(index)) {
        currentIndex = index;
        updateGallery();
        openModal(true);
      }
    });
  });
  variationButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.index);
      if (!Number.isNaN(index)) {
        currentIndex = index;
        updateGallery();
        openModal(true);
      }
    });
  });

  modalBackdrop?.addEventListener('click', closeModal);
  modalClose?.addEventListener('click', closeModal);
  modalPrev?.addEventListener('click', prevImage);
  modalNext?.addEventListener('click', nextImage);
  modalImage?.addEventListener('click', toggleZoom);
  modalImage?.addEventListener('mousemove', updateZoomOrigin);
  modalImage?.addEventListener('touchmove', updateZoomOrigin, { passive: true });

  window.addEventListener('keydown', event => {
    if (!modal.classList.contains('active')) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowLeft') prevImage();
    if (event.key === 'ArrowRight') nextImage();
  });

  updateGallery();
}

document.addEventListener('DOMContentLoaded', initProjectExperience);
