let lastScrollY = window.scrollY;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    // 下にスクロール → ヘッダー非表示
    header.classList.add('hide');
  } else {
    // 上にスクロール → ヘッダー表示
    header.classList.remove('hide');
  }

  lastScrollY = currentScrollY;
});
