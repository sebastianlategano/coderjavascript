// Script para que las animaciones ocurran solo cuando esten en pantalla ------------------------------------------------------------->
function applyAnimation(className, delayClassName) {
  const elements = document.querySelectorAll("." + className);
  function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.visibility = "visible";
        entry.target.style.opacity = 1;
        entry.target.classList.add("animate__animated", "animate__fadeInUp");
        observer.unobserve(entry.target);
      }
    });
  }

  const options = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(handleIntersect, options);
  elements.forEach((element) => observer.observe(element));
}

applyAnimation("elemento-oculto");
applyAnimation("elemento-con-delay");

// Cambia color de fondo del navbar top, en desktop y mobile + Oculta/muestra botones Wpp y ScrollUp--------------------------------------->
window.addEventListener("load", () => {
  const mybutton = document.getElementById("scrollTop");
  const wppIcon = document.getElementById("wppIcon");
  const navTop = document.querySelector("#navTop");
  const hambTop = document.querySelector("#hambTop");

  window.onscroll = function () {
    scrollFunction();
    handleScrollEffects();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.classList.add("show");
      wppIcon.classList.add("show");
    } else {
      mybutton.classList.remove("show");
      wppIcon.classList.remove("show");
    }
  }

  function handleScrollEffects() {
    if (window.scrollY <= 10) {
      navTop.className = "coverLinks";
      hambTop.className = "menuHamburguesa";
    } else {
      navTop.className = "scroll";
      hambTop.className = "hambScroll";
    }
  }

  mybutton.addEventListener("click", function () {
    topFunction();
  });

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
});

// Le da stop al video de youtube cuando se cierra el popup -------------------------------------------------------------->
function stop() {
  let video = document.getElementById("videoId");
  video.contentWindow.postMessage(
    '{"event":"command", "func":"stopVideo", "args":""}',
    "*"
  );
}

// Modo oscuro ----------------------------------------------------------------------------------------------------------->
const themeToggle = document.getElementById("theme-toggle");
const carouselExampleDark = document.getElementById("carouselExampleDark");
const carouselExampleDark2 = document.getElementById("carouselExampleDark2");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  if (savedTheme === "light") {
    themeToggle.checked = true;
    if (carouselExampleDark) {
      carouselExampleDark.classList.add("carousel-dark");
      carouselExampleDark2.classList.add("carousel-dark");
    }
  } else {
    themeToggle.checked = false;
    if (carouselExampleDark) {
      carouselExampleDark.classList.remove("carousel-dark");
      carouselExampleDark2.classList.remove("carousel-dark");
    }
  }
}

themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    if (carouselExampleDark) {
      carouselExampleDark.classList.add("carousel-dark");
      carouselExampleDark2.classList.add("carousel-dark");
    }
  } else {
    document.documentElement.setAttribute("data-theme", "darktheme");
    localStorage.setItem("theme", "darktheme");
    if (carouselExampleDark) {
      carouselExampleDark.classList.remove("carousel-dark");
      carouselExampleDark2.classList.remove("carousel-dark");
    }
  }
});