// =================search ==================
const searchButton = document.getElementById("search");
const searchArea = document.querySelector(".searchInput");
const inputBox = document.getElementById("srcInputBox");

searchButton.addEventListener("click", () => {
  searchArea.style.display = "flex";
});

window.addEventListener("click", (e) => {
  if (e.target === searchButton || e.target === inputBox) {
    return;
  }
  searchArea.style.display = "none";
});

// ====================lightMood=================
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");

sun.addEventListener("click", () => {
  sun.style.display = "none";
  moon.style.display = "block";
  document.body.classList.remove("lightMood");
});
moon.addEventListener("click", () => {
  sun.style.display = "block";
  moon.style.display = "none";
  document.body.classList.add("lightMood");
});

// ==============navigation bar======================

const menu = document.getElementById("menu");
const responsiveLink = document.getElementById("responsiveLink");

menu.addEventListener("mouseover", () => {
  responsiveLink.style.display = "block";
});
window.addEventListener("click", (e) => {
  responsiveLink.style.display = "none";
});

// ============scroll hide============

const heroSection = document.querySelector("#heroSection");
const thumb = document.querySelector(".thumb");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY > heroSection.offsetHeight / 3) {
    thumb.classList.add("hide");
  } else {
    thumb.classList.remove("hide");
  }
});

// ==========================background change=================== 
const thumImg = document.querySelectorAll("#thumImg img");
const indexNum = document.getElementById("indexNum");
const title = document.getElementById("title");
const hero = document.getElementById("hero");

thumImg.forEach(img => {
  img.addEventListener('mouseover', ()=> {
    const bg = img.dataset.bg;
    const num = img.dataset.number;
    const txt = img.dataset.title;

    hero.style.backgroundImage = `url('${bg}')`;
    indexNum.innerHTML = `0${num}`;
    title.innerHTML = txt;
  })
  
});