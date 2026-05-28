const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const slides = [...document.querySelectorAll("[data-hero-slide]")];
const dots = [...document.querySelectorAll("[data-hero-dot]")];

let currentSlide = 0;
let slideTimer;

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

const showSlide = (index) => {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === currentSlide);
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === currentSlide;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });
};

const startSlider = () => {
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5200);
};

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "關閉選單" : "開啟選單");
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "開啟選單");
  }
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    startSlider();
  });
});

window.addEventListener("scroll", updateHeader, { passive: true });

showSlide(0);
startSlider();
updateHeader();
