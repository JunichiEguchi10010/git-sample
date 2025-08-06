// ✅ トースト通知
const copyButton = document.getElementById('copyButton');
const toast = document.getElementById('toast');

copyButton.addEventListener('click', () => {
  // 実際のコピー処理（例: テキスト）
  navigator.clipboard.writeText('コピーされました！').then(() => {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  });
});

// ✅ SVG チェックマーク再描画（毎回アニメ）
const svgCheck = document.getElementById('svgCheck');
svgCheck.addEventListener('click', () => {
  const path = svgCheck.querySelector('path');
  path.style.animation = 'none'; // リセット
  path.offsetHeight; // 再計算トリガー
  path.style.animation = null; // 再スタート
});
