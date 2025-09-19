// ---------- Lightbox para imagens ----------
document.addEventListener("DOMContentLoaded", () => {
  // Cria a estrutura do lightbox dinamicamente (assim não precisa mexer no HTML)
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img class="lightbox-img" src="" alt="">
    <div class="lightbox-caption"></div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  // Seleciona todas as imagens da galeria
  const images = document.querySelectorAll(".grid-imagens img");

  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      lightboxImg.src = img.src;
      lightboxCaption.textContent = img.alt || "";
    });
  });

  // Fechar lightbox
  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  // Fecha clicando fora da imagem
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });

  // Fecha com tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lightbox.classList.remove("active");
    }
  });
});
