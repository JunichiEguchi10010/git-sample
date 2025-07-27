// Lenis 初期化（スムーススクロール）
const lenis = new Lenis({
  duration: 2.0,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
  direction: 'vertical',
  gestureDirection: 'vertical'
});

// スクロールを毎フレーム更新
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf); // or lenis.start(); でもOK

// Intersection Observer によるアニメーション効果
const boxes = document.querySelectorAll('.box');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // クラス付与後に監視解除
    }
  });
}, {
  threshold: 0.3 // 要素が30%表示された時点で実行
});

// 各.box を監視対象に追加
boxes.forEach(box => observer.observe(box));
