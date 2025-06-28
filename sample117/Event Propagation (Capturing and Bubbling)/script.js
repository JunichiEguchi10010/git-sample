// script.js　伝播の違いを体験

const outer = document.getElementById("outer");
const middle = document.getElementById("middle");
const inner = document.getElementById("inner");

// キャプチャフェーズでログを出す
outer.addEventListener("click", () => {
  console.log("outer (キャプチャ)");
}, true); // ← true でキャプチャフェーズ

middle.addEventListener("click", () => {
  console.log("middle (キャプチャ)");
}, true);

inner.addEventListener("click", () => {
  console.log("inner (キャプチャ)");
}, true);

// バブリングフェーズでログを出す
outer.addEventListener("click", () => {
  console.log("outer (バブリング)");
});

middle.addEventListener("click", () => {
  console.log("middle (バブリング)");
});

inner.addEventListener("click", () => {
  console.log("inner (バブリング)");
});


// コンソールに出るログ出力例（クリック順）
// outer (キャプチャ)
// middle (キャプチャ)
// inner (キャプチャ)
// inner (バブリング)
// middle (バブリング)
// outer (バブリング)