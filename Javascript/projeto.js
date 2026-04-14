function initProjectExperience() {
  const section = document.getElementById('projeto');
  if (!section) return;

  const titleEl = section.querySelector('h1');
  const paragraphEls = Array.from(section.querySelectorAll('p')).filter(p => p.textContent.trim());

  const title = titleEl?.textContent.trim() || 'OrigOwl Project';

  const getImages = (selector) => {
    return Array.from(section.querySelectorAll(selector)).map(img => ({
      src: img.src,
      alt: img.alt || title
    }));
  };

  const finalImages = getImages('.grid-final img');
  const processImages = getImages('.grid-process img');
  const sketchImages = getImages('.grid-sketch img');
  const referencesImages = getImages('.grid-references img');
  const variationsImages = getImages('.grid-variations img');

  const videoContainer = section.querySelector('.video-container');

  const summary = paragraphEls[0]?.textContent.trim() || '';
  const descriptionText = paragraphEls.length > 1
    ? paragraphEls.slice(1).map(p => p.textContent.trim()).join(' ')
    : summary;

  const hasVideo = Boolean(videoContainer);
  const videoMarkup = hasVideo ? videoContainer.outerHTML : '';

  const tabButtons = [
    '<button class="tab-button active" data-tab="final">Final</button>',
    '<button class="tab-button" data-tab="process">Process</button>',
    '<button class="tab-button" data-tab="sketch">Sketch</button>',
    '<button class="tab-button" data-tab="references">References</button>',
    '<button class="tab-button" data-tab="variations">Variations</button>'
  ];

  if (hasVideo) {
    tabButtons.push('<button class="tab-button" data-tab="video">Video</button>');
  }

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
        <div class="project-image-frame">
          <img class="gallery-image" src="${finalImages[0]?.src || ''}">
        </div>
      </div>

      <div class="tab-panel" data-panel="process">
        <div class="project-grid-images">
          ${processImages.map((img, i) => `
            <button class="gallery-thumb" data-index="${i}">
              <img src="${img.src}" alt="${img.alt}">
            </button>
          `).join('')}
        </div>
      </div>

      <div class="tab-panel" data-panel="sketch">
        <div class="project-grid-images">
          ${sketchImages.map((img, i) => `
            <button class="gallery-thumb" data-index="${i}">
              <img src="${img.src}" alt="${img.alt}">
            </button>
          `).join('')}
        </div>
      </div>

      <div class="tab-panel" data-panel="references">
        <div class="project-grid-images">
          ${referencesImages.map((img, i) => `
            <button class="gallery-thumb" data-index="${i}">
              <img src="${img.src}" alt="${img.alt}">
            </button>
          `).join('')}
        </div>
      </div>

      <div class="tab-panel" data-panel="variations">
        <div class="project-gallery-grid">
          ${variationsImages.map((img, i) => `
            <button class="variation-thumb" data-index="${i}">
              <img src="${img.src}" alt="${img.alt}">
            </button>
          `).join('')}
        </div>
      </div>

      ${hasVideo ? `
        <div class="tab-panel" data-panel="video">
          <div class="project-video-panel">
            ${videoMarkup}
          </div>
        </div>
      ` : ''}

    </div>
  `;

  const modal = document.createElement('div');
  modal.className = 'project-modal';
  modal.innerHTML = `
    <div class="project-modal-backdrop"></div>
    <div class="project-modal-window">
      <button class="modal-close">×</button>
      <div class="modal-media">
        <button class="modal-nav prev">←</button>
        <img class="modal-image" src="${finalImages[0]?.src || ''}">
        <button class="modal-nav next">→</button>
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
  const modalImage = modal.querySelector('.modal-image');

  let currentIndex = 0;
  let currentArray = finalImages;
  let modalNavEnabled = false;

  const updateGallery = () => {
    if (!currentArray.length) return;
    const current = currentArray[currentIndex];
    galleryImage.src = current.src;
    modalImage.src = current.src;
  };

  const setActiveTab = key => {
    tabButtonsEls.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === key));
    tabPanels.forEach(panel => panel.classList.toggle('active', panel.dataset.panel === key));

    if (key === "final") currentArray = finalImages;
    if (key === "process") currentArray = processImages;
    if (key === "sketch") currentArray = sketchImages;
    if (key === "references") currentArray = referencesImages;
    if (key === "variations") currentArray = variationsImages;

    currentIndex = 0;
    updateGallery();
  };

  tabButtonsEls.forEach(btn => btn.addEventListener('click', () => setActiveTab(btn.dataset.tab)));

  // 🔥 FINAL (imagem principal)
  galleryImage?.addEventListener('click', () => {
    if (currentArray === finalImages) {
      modalNavEnabled = finalImages.length > 1;
      modal.classList.add('active');
      document.body.classList.add('modal-open');
    }
  });

  // 🔥 THUMBS (AGORA CORRETO)
  document.querySelectorAll('.gallery-thumb, .variation-thumb').forEach(button => {
    button.addEventListener('click', () => {
      currentIndex = Number(button.dataset.index);
      updateGallery();

      // 👉 SÓ FINAL abre modal
      if (currentArray === finalImages) {
        modalNavEnabled = currentArray.length > 1;
        modal.classList.add('active');
        document.body.classList.add('modal-open');
      }
    });
  });

  modal.querySelector('.modal-close').onclick = () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  };

  modal.querySelector('.modal-nav.prev').onclick = () => {
    if (!modalNavEnabled) return;
    currentIndex = (currentIndex - 1 + currentArray.length) % currentArray.length;
    updateGallery();
  };

  modal.querySelector('.modal-nav.next').onclick = () => {
    if (!modalNavEnabled) return;
    currentIndex = (currentIndex + 1) % currentArray.length;
    updateGallery();
  };

  modalImage.onclick = () => {
    modalImage.classList.toggle('zoomed');
  };

  updateGallery();
}

document.addEventListener('DOMContentLoaded', initProjectExperience);