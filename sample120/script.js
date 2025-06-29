// 500pxを超えるとヘッダーが上に隠れる。
// if (scrollY > 500)
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const header = document.querySelector('.header');

      if (scrollY > 500) {
        header.classList.remove('fixed');
      } else {
        header.classList.add('fixed');
      }

      ticking = false;
    });
    ticking = true;
  }
});