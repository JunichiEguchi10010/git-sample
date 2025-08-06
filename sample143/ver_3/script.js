// アコーディオン切り替え
const accordionToggle = document.getElementById('accordionToggle');
const accordionContent = document.getElementById('accordionContent');
accordionToggle?.addEventListener('click', () => {
  accordionContent.classList.toggle('open');
});

// ポップアップ表示切り替え
const popupToggle = document.getElementById('popupToggle');
const popup = document.getElementById('popup');
popupToggle?.addEventListener('click', () => {
  popup.classList.toggle('show');
});

// スクロールでフェードイン
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-on-scroll').forEach(el => {
  observer.observe(el);
});

// カウントアップ
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 30);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});

// ローディング画面フェードアウト
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.classList.add('loaded');
});
