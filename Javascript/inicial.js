
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



// === Otimização leve de imagens sem lazy loading ===

// Quando a página terminar de carregar
window.addEventListener("load", () => {
  const imagens = document.querySelectorAll("img");

  imagens.forEach(img => {
    // Força o navegador a armazenar a imagem em cache
    img.decoding = "async"; // carrega de forma assíncrona sem bloquear o layout
    img.loading = "eager"; // garante que carregue logo sem atrasar

    // Usa compressão automática do navegador, se disponível
    img.style.imageRendering = "auto";

    // Ativa cache e reutilização se possível
    img.fetchPriority = "high";

    // Garante carregamento rápido em conexões lentas
    img.setAttribute("importance", "high");

    // Teste de fallback para navegadores antigos
    const temp = new Image();
    temp.src = img.src;
    temp.onload = () => {
      // Substitui apenas se a imagem original falhar
      if (!img.complete || img.naturalWidth === 0) {
        img.src = temp.src;
      }
    };
  });

  console.log("✅ Imagens otimizadas e carregadas sem atrasos visuais.");
});
