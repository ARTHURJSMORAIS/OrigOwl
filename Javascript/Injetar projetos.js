const projects = [
  {
    title: "Film Project 01",
    category: "film",
    image: "img/film-01.jpg",
    link: "projeto-film-01.html"
  },
  {
    title: "Sport Visual 01",
    category: "sport",
    image: "img/sport-01.jpg",
    link: "projeto-sport-01.html"
  },
  {
    title: "Concept Art 01",
    category: "concept",
    image: "img/concept-01.jpg",
    link: "projeto-concept-01.html"
  },
  {
    title: "Visual Identity 01",
    category: "identity",
    image: "img/identity-01.jpg",
    link: "projeto-identity-01.html"
  },
  {
    title: "Film Project 02",
    category: "film",
    image: "img/film-02.jpg",
    link: "projeto-film-02.html"
  },
  {
    title: "Sport Visual 02",
    category: "sport",
    image: "img/sport-02.jpg",
    link: "projeto-sport-02.html"
  }
];

const grid = document.getElementById("archiveGrid");

projects.forEach(project => {
  const item = document.createElement("div");
  item.classList.add("archive-item");

  if (project.category === "identity") {
    item.classList.add("identity");
  }

  item.innerHTML = `
    <img src="${project.image}" alt="${project.title}" loading="lazy" />
    <div class="archive-overlay">
      <span>${project.category}</span>
    </div>
  `;

  item.addEventListener("click", () => {
    window.location.href = project.link;
  });

  grid.appendChild(item);
});
