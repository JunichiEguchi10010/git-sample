document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll(".card");
  
          cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.15}s`;
            card.classList.add("is-visible");
          });
  
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
  
    sections.forEach(section => observer.observe(section));
  });
  