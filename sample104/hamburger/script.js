document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".menu-toggle");
  const nav = document.getElementById("global-nav");

  toggleButton.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");
    toggleButton.classList.toggle("active", isOpen);
    toggleButton.setAttribute("aria-expanded", isOpen);
    nav.setAttribute("aria-hidden", !isOpen);
  });
});