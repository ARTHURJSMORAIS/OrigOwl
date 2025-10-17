
// ===== CARROSSEL =====
const imagens = document.querySelectorAll(".carrossel-container img");
const miniaturas = document.querySelectorAll(".miniaturas img");
let indexAtual = 0;
let intervalo;

function mostrarImagem(index) {
  imagens.forEach((img, i) => {
    img.classList.toggle("imagem-ativa", i === index);
    miniaturas[i].classList.toggle("ativa", i === index);
  });
  indexAtual = index;
}

function iniciarCarrossel() {
  intervalo = setInterval(() => {
    indexAtual = (indexAtual + 1) % imagens.length;
    mostrarImagem(indexAtual);
  }, 5000);
}

miniaturas.forEach((mini, i) => {
  mini.addEventListener("click", () => {
    clearInterval(intervalo);
    mostrarImagem(i);
    iniciarCarrossel();
  });
});

mostrarImagem(indexAtual);
iniciarCarrossel();



// === BOTÃO BACK TO TOP ===
const backToTopBtn = document.querySelector('.back-to-top');
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});




/**
 * ============================================
 *  AR Frame | Otimizador de Mídia Inteligente
 *  (Imagens e Vídeos com Lazy Loading e Compressão)
 * ============================================
 *  Autor: Arthur Morais
 *  Data: 2025
 */

document.addEventListener("DOMContentLoaded", () => {
  const imageQuality = 0.75; // Qualidade da compressão das imagens
  const lazyThreshold = 0.2; // Quando carregar (0.2 = 20% visível)
  const videos = document.querySelectorAll("video");
  const images = document.querySelectorAll("img");

  // ===== FUNÇÃO PARA OTIMIZAR IMAGENS =====
  const compressImage = (img) => {
    const originalSrc = img.getAttribute("data-src") || img.src;
    const novaImg = new Image();
    novaImg.crossOrigin = "anonymous";
    novaImg.src = originalSrc;

    novaImg.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Reduz a dimensão se a imagem for muito grande
      const maxWidth = 1920;
      const scale = Math.min(1, maxWidth / novaImg.width);
      canvas.width = novaImg.width * scale;
      canvas.height = novaImg.height * scale;

      ctx.drawImage(novaImg, 0, 0, canvas.width, canvas.height);

      // Converte para formato WebP mais leve
      const webpImage = canvas.toDataURL("image/webp", imageQuality);
      img.src = webpImage;
      img.removeAttribute("data-src");
    };
  };

  // ===== LAZY LOADING DE IMAGENS =====
  const imgObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        compressImage(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: lazyThreshold });

  images.forEach(img => {
    img.loading = "lazy";
    imgObserver.observe(img);
  });

  // ===== OTIMIZAÇÃO DE VÍDEOS =====
  const videoObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;

        // Carrega vídeo apenas quando visível
        if (video.dataset.src) {
          video.src = video.dataset.src;
        }

        // Define poster (thumbnail) leve, se existir
        if (video.dataset.poster) {
          video.poster = video.dataset.poster;
        }

        // Ajusta opções para performance
        video.preload = "metadata";
        video.autoplay = false;
        video.muted = true;
        video.playsInline = true;

        // Carrega o vídeo e começa só quando visível
        video.load();
        obs.unobserve(video);
      }
    });
  }, { threshold: lazyThreshold });

  videos.forEach(video => {
    // Adiciona pre-carregamento leve
    video.preload = "none";
    videoObserver.observe(video);
  });

  // ===== MONITORAMENTO OPCIONAL =====
  console.log("🚀 Otimizador de mídia iniciado — AR Frame");
});
