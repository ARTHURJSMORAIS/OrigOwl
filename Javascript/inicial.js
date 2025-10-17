
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




document.addEventListener("DOMContentLoaded", () => {
  const quality = 0.4; // qualidade da compressão das imagens
  const imagens = document.querySelectorAll("img");
  const videos = document.querySelectorAll("video");

  // ======= OTIMIZAÇÃO DE IMAGENS =======
  imagens.forEach(img => {
    const originalSrc = img.src;

    // Lazy loading automático
    img.loading = "lazy";

    const novaImg = new Image();
    novaImg.crossOrigin = "anonymous";
    novaImg.src = originalSrc;

    novaImg.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = novaImg.width;
      canvas.height = novaImg.height;
      ctx.drawImage(novaImg, 0, 0);
      const imagemComprimida = canvas.toDataURL("image/webp", quality);
      img.src = imagemComprimida;
    };

    novaImg.onerror = () => {
      console.warn("Não foi possível comprimir a imagem:", originalSrc);
    };
  });

  // ======= OTIMIZAÇÃO DE VÍDEOS =======
  videos.forEach(video => {
    // Impede o carregamento imediato
    video.preload = "none";

    // Desativa autoplay e mute se não for essencial
    video.autoplay = false;
    video.muted = true;

    // Lazy loading manual com IntersectionObserver
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Carrega o vídeo quando entra na tela
          if (video.dataset.src) {
            video.src = video.dataset.src;
          }
          video.load();
          obs.unobserve(video);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(video);

    // Ajusta qualidade do vídeo (para vídeos MP4 ou semelhantes)
    video.addEventListener("loadedmetadata", () => {
      if (video.videoWidth > 1280) {
        // Se o vídeo for 1080p ou 4K, reduz a resolução de reprodução
        video.playbackQuality = "hd720";
      }
    });
  });
});
