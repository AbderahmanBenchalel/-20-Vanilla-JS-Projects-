const toggleBtn = document.getElementById("toggle");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const main = document.querySelector(".main-section");
const ctaBtn = document.querySelector(".cta-btn");
const modalBox = document.querySelector(".modal-container");
const closeBtn = document.querySelector(".modal-close");

toggleBtn.addEventListener("click", () => {
  nav.classList.toggle("showNav");
  header.classList.toggle("move-header-and-main");
  main.classList.toggle("move-header-and-main");
});

ctaBtn.addEventListener("click", () => modalBox.classList.toggle("show-modal"));

closeBtn.addEventListener("click", () =>
  modalBox.classList.toggle("show-modal")
);

modalBox.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal-container")) {
    modalBox.classList.toggle("show-modal");
  }
});
