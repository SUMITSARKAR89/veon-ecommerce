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

// ======================pop up body=====================

const popCard = document.getElementById("popCard");
const popClose = document.querySelector(".popClose");

window.addEventListener("load", ()=> {
  setTimeout(() => {
    popCard.style.display = "block";
  }, 5000);
});
popClose.addEventListener("click", () => {
  popCard.style.display = "none";
});

// ====================lightMood=================

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
      const clock = document.querySelector("#clock");

      window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        if (scrollY > heroSection.offsetHeight / 3) {
          thumb.classList.add("hide");
          clock.classList.remove("hide");
        } else {
          thumb.classList.remove("hide");
          clock.classList.add("hide");
        }
      });


// ==========================background change===================
const thumImg = document.querySelectorAll("#thumImg img");
const indexNum = document.getElementById("indexNum");
const title = document.getElementById("title");
const hero = document.querySelector("header");

thumImg.forEach((img) => {
  img.addEventListener("mouseover", () => {
    const bg = img.dataset.bg;
    const num = img.dataset.number;
    const txt = img.dataset.title;

    hero.style.backgroundImage = `url('${bg}')`;
    indexNum.innerHTML = `0${num}`;
    title.innerHTML = txt;
  });
});

// ----------------clock----------------
function updateClock() {
  const i = new Date();
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = i.getDate();
  let month = monthName[i.getMonth()];
  let year = i.getFullYear();
  let hour = i.getHours();
  let minute = i.getMinutes();
  let second = i.getSeconds();

  h = hour < 10 ? "0" + hour : hour;
  m = minute < 10 ? "0" + minute : minute;
  s = second < 10 ? "0" + second : second;

  document.getElementById("time").innerHTML = `${h}:${m}:${s}`;
  document.getElementById("date").innerHTML = `${day}th ${month}, ${year}`;
}
setInterval(updateClock, 1000);
updateClock();
