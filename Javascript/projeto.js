function createProjectPage() {
  const section = document.getElementById('projeto');
  if (!section) return;

  const titleEl = section.querySelector('h1');
  const paragraphEls = Array.from(section.querySelectorAll('p')).filter(p => p.textContent.trim());
  const imageEls = Array.from(section.querySelectorAll('.grid-imagens img, img:not([class])')).filter(img => img.src);
  const videoContainer = section.querySelector('.video-container');
  const images = imageEls.map(img => ({ src: img.src, alt: img.alt || titleEl?.textContent.trim() || 'Project image' }));

  const getText = (element, fallback = '') => {
    if (!element) return fallback;
    const lang = localStorage.getItem('lang') || 'en';
    return element.dataset[lang] || element.dataset.en || element.dataset.pt || element.textContent.trim() || fallback;
  };

  const title = titleEl ? titleEl.textContent.trim() : 'OrigOwl Project';
  const summary = getText(paragraphEls[0], 'A strong visual concept.');
  const description = paragraphEls.length > 1 ? getText(paragraphEls[1], summary) : summary;
  const processText = paragraphEls.length > 2 ? getText(paragraphEls[2], 'Concept, research and visual direction.') : 'Concept, research and visual direction.';
  const sketchText = paragraphEls.length > 3 ? getText(paragraphEls[3], 'Rough sketches and composition studies.') : 'Rough sketches and composition studies.';
  const referencesText = paragraphEls.length > 4 ? getText(paragraphEls[4], 'References, mood and visual sources.') : 'References, mood and visual sources.';
  const videoMarkup = videoContainer ? videoContainer.outerHTML : '';
  const hasVideo = Boolean(videoMarkup);

  const tabs = [
    '<button class="tab-button active" data-tab="final" data-i18n="tab_final">Final</button>',
    '<button class="tab-button" data-tab="process" data-i18n="tab_process">Process</button>',
    '<button class="tab-button" data-tab="sketch" data-i18n="tab_sketch">Sketch</button>',
    '<button class="tab-button" data-tab="references" data-i18n="tab_references">References</button>',
    '<button class="tab-button" data-tab="variations" data-i18n="tab_variations">Variations</button>'
  ];
  if (hasVideo) {
    tabs.push('<button class="tab-button" data-tab="video" data-i18n="tab_video">Video</button>');
  }

  const variationMarkup = images.length
    ? images.map((item, index) => `<button class="variation-thumb" type="button" data-index="${index}" aria-label="Show variation ${index + 1}"><img src="${item.src}" alt="${item.alt}"></button>`).join('')
    : '<p class="project-fallback">No variations available.</p>';

  const finalImage = images[0] || { src: '', alt: 'Project image' };

  section.innerHTML = `
    <div class="project-content">
      <div class="project-header">
        <h1>${title}</h1>
        <div class="project-tabs">${tabs.join('')}</div>
      </div>

      <div class="tab-panel active" data-panel="final">
        <div class="project-image-frame" role="button" tabindex="0" aria-label="Open image modal">
          <img class="project-main-image" src="${finalImage.src}" alt="${finalImage.alt}">
          <button class="gallery-nav prev" type="button" aria-label="Previous image">←</button>
          <button class="gallery-nav next" type="button" aria-label="Next image">→</button>
        </div>
      </div>

      <div class="tab-panel" data-panel="process">
        <div class="project-copy"><p>${processText}</p></div>
      </div>

      <div class="tab-panel" data-panel="sketch">
        <div class="project-copy"><p>${sketchText}</p></div>
      </div>

      <div class="tab-panel" data-panel="references">
        <div class="project-copy"><p>${referencesText}</p></div>
      </div>

      <div class="tab-panel" data-panel="variations">
        <div class="project-gallery-grid">${variationMarkup}</div>
      </div>

      ${hasVideo ? `<div class="tab-panel" data-panel="video"><div class="project-video-panel">${videoMarkup}</div></div>` : ''}
    </div>

    <div class="project-modal" aria-hidden="true" role="dialog">
      <div class="project-modal-backdrop"></div>
      <div class="project-modal-window">
        <button class="modal-close" type="button" aria-label="Close modal">×</button>
        <div class="modal-media">
          <button class="modal-nav prev" type="button" aria-label="Previous image">←</button>
          <img class="modal-image" src="${finalImage.src}" alt="${finalImage.alt}">
          <button class="modal-nav next" type="button" aria-label="Next image">→</button>
        </div>
        <div class="modal-info">
          <h2>${title}</h2>
          <p>${description}</p>
        </div>
      </div>
    </div>
  `;

  const state = { index: 0, images };

  const tabButtons = section.querySelectorAll('.tab-button');
  const tabPanels = section.querySelectorAll('.tab-panel');
  const mainImage = section.querySelector('.project-main-image');
  const prevButton = section.querySelector('.gallery-nav.prev');
  const nextButton = section.querySelector('.gallery-nav.next');
  const variationButtons = section.querySelectorAll('.variation-thumb');
  const modal = section.querySelector('.project-modal');
  const modalBackdrop = section.querySelector('.project-modal-backdrop');
  const modalWindow = section.querySelector('.project-modal-window');
  const modalImage = section.querySelector('.modal-image');
  const modalClose = section.querySelector('.modal-close');
  const modalTitle = section.querySelector('.modal-info h2');
  const modalDescription = section.querySelector('.modal-info p');

  const updateDisplay = () => {
    const current = state.images[state.index] || finalImage;
    if (mainImage) {
      mainImage.src = current.src;
      mainImage.alt = current.alt;
    }
    if (modalImage) {
      modalImage.src = current.src;
      modalImage.alt = current.alt;
    }
  };

  const setActiveTab = key => {
    tabButtons.forEach(button => button.classList.toggle('active', button.dataset.tab === key));
    tabPanels.forEach(panel => panel.classList.toggle('active', panel.dataset.panel === key));
  };

  const showModal = () => {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    modalImage?.classList.remove('zoomed');
  };

  const showPrevious = () => {
    state.index = (state.index - 1 + state.images.length) % state.images.length;
    updateDisplay();
  };

  const showNext = () => {
    state.index = (state.index + 1) % state.images.length;
    updateDisplay();
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', () => setActiveTab(button.dataset.tab));
  });

  mainImage?.addEventListener('click', showModal);
  section.querySelector('.project-image-frame')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') showModal();
  });
  prevButton?.addEventListener('click', showPrevious);
  nextButton?.addEventListener('click', showNext);
  modal.querySelector('.modal-nav.prev')?.addEventListener('click', showPrevious);
  modal.querySelector('.modal-nav.next')?.addEventListener('click', showNext);
  modalClose?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);
  modalImage?.addEventListener('click', () => modalImage.classList.toggle('zoomed'));

  variationButtons.forEach(button => {
    button.addEventListener('click', () => {
      const nextIndex = Number(button.dataset.index);
      if (!Number.isNaN(nextIndex) && state.images[nextIndex]) {
        state.index = nextIndex;
        updateDisplay();
        setActiveTab('final');
      }
    });
  });

  document.addEventListener('keydown', e => {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') showPrevious();
    if (e.key === 'ArrowRight') showNext();
  });

  updateDisplay();
}

document.addEventListener('DOMContentLoaded', createProjectPage);
