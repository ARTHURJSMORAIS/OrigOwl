document.addEventListener("DOMContentLoaded", () => {
  const productsGrid = document.querySelector(".products-grid");
  if (!productsGrid) return;

  const products = [
    {title:"Camiseta - Design 1",
     price:"R$ 89,90",
      img:"img/prod-1.jpg", 
    colors:["preto","branco"],
     sizes:["P","M","G"]},


    {title:"Boné - Visual", 
    price:"R$ 59,90",
     img:"img/prod-2.jpg", 
   colors:["preto"], sizes:[]},



    {title:"Poster - Mandalorian",
     price:"R$ 39,90",
   img:"img/prod-3.jpg",
    colors:[],
     sizes:[]}
  ];

  products.forEach(p => {
    const node = document.createElement("div");
    node.className = "product";
    node.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <div class="product-title">${p.title}</div>
      <div class="price">${p.price}</div>
      ${p.colors.length ? `<div class="variants">Cores: ${p.colors.join(", ")}</div>` : ""}
      ${p.sizes.length ? `<div class="variants">Tamanhos: ${p.sizes.join(", ")}</div>` : ""}
    `;
    productsGrid.appendChild(node);
  });
});
