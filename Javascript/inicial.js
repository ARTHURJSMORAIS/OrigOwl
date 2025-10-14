
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