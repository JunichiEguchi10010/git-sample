// JS（スクロールで表示されるようにする例）
const targets = document.querySelectorAll('.fade-in-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-show');
    }
  });
});

targets.forEach(target => {
  observer.observe(target);
});
