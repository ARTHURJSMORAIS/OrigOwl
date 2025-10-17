
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
 *  Otimizador de Imagens — AR Frame
 *  (Reduz peso e melhora performance sem alterar layout)
 * ============================================
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("🧠 Otimizador de imagens iniciado.");

  const imageQuality = 0.75; // controle da qualidade (0.5 mais leve, 1.0 original)
  const maxWidth = 1920; // limite de largura (pode ajustar conforme o layout)

  // Seleciona todas as imagens visíveis na página
  const imagens = document.querySelectorAll("img");

  imagens.forEach((img) => {
    // Se a imagem já for muito leve (ícones, SVG, etc.), pula
    if (!img.src || img.src.endsWith(".svg")) return;

    const originalSrc = img.src;
    const novaImg = new Image();
    novaImg.crossOrigin = "anonymous";
    novaImg.src = originalSrc;

    novaImg.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const scale = Math.min(1, maxWidth / novaImg.width);
        canvas.width = novaImg.width * scale;
        canvas.height = novaImg.height * scale;

        ctx.drawImage(novaImg, 0, 0, canvas.width, canvas.height);

        // Converte para formato WebP mais leve
        const webpImage = canvas.toDataURL("image/webp", imageQuality);

        // Substitui a imagem original pela otimizada
        img.src = webpImage;
      } catch (err) {
        console.warn("⚠️ Erro ao otimizar imagem:", err);
      }
    };

    novaImg.onerror = () => {
      console.warn(`❌ Não foi possível carregar a imagem: ${originalSrc}`);
    };
  });

  console.log("✅ Todas as imagens foram otimizadas.");
});
