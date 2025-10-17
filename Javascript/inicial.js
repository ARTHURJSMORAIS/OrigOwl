
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
 *  AR Frame | Otimizador de Mídia Simples e Direto
 *  (Compressão leve de imagens e vídeos, sem lazy loading)
 * ============================================
 *  Autor: Arthur Morais
 *  Data: 2025
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Otimizador de mídia iniciado — AR Frame");

  const imageQuality = 0.75; // 0.1 = mais leve / 1.0 = qualidade máxima
  const maxWidth = 1920; // largura máxima para redimensionamento

  // ========== OTIMIZAR IMAGENS ==========
  const imagens = document.querySelectorAll("img");

  imagens.forEach((img) => {
    try {
      const originalSrc = img.src;
      const novaImg = new Image();
      novaImg.crossOrigin = "anonymous";
      novaImg.src = originalSrc;

      novaImg.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const scale = Math.min(1, maxWidth / novaImg.width);
        canvas.width = novaImg.width * scale;
        canvas.height = novaImg.height * scale;

        ctx.drawImage(novaImg, 0, 0, canvas.width, canvas.height);

        // Converte para WebP (muito mais leve)
        const webpImage = canvas.toDataURL("image/webp", imageQuality);
        img.src = webpImage;
      };
    } catch (err) {
      console.warn("⚠️ Erro ao otimizar imagem:", err);
    }
  });

  