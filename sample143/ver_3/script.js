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

// ローディング画面フェードアウト
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.classList.add('loaded');
});

// ✅ コード全体像
// セクション	                        主な役割	                                                           ユーザー体験への影響
// スクロールによるフェードイン	    IntersectionObserverを使用して、画面に表示された要素にアニメーションを適用	スムーズで自然なコンテンツ表示を実現し、視覚的な演出を強化
// ローディング画面フェードアウト	ページ読み込み完了時にローディング画面を非表示にする	                    読み込み完了のタイミングを明確に伝え、スムーズな開始を演出

// ✅ 疑似コード

// 🌫️ スクロールでフェードイン
// IntersectionObserver（スクロール監視用）を作成

// 要素が画面内に入ったら、
//   その要素に「visible」クラスを追加

// 「fade-on-scroll」クラスを持つ全ての要素に対して、
//   上記の監視を開始する

// 🕓 ローディング画面のフェードアウト
// ページの読み込み完了時に、
//   「loader」要素に「loaded」クラスを追加して、
//   ローディング画面を非表示にする

// // ✅ コード説明
// 🌫️ スクロールでフェードイン表示
// const observer = new IntersectionObserver(entries => {
// 👉 IntersectionObserverを定義。対象要素が画面内に表示されたかを監視します。

//   entries.forEach(entry => {
// 👉 表示状態の変化があった要素すべてに対して処理を行います。

//     if (entry.isIntersecting) {
// 👉 要素が画面内に入っていれば…

//       entry.target.classList.add('visible');
// 👉 その要素に「visible」クラスを追加してフェードイン効果を適用します。

//     }
//   });
// });
// 👉 Observerの本体の処理完了。

// document.querySelectorAll('.fade-on-scroll').forEach(el => {
// 👉 「fade-on-scroll」クラスを持つ要素を全て取得して…

//   observer.observe(el);
// 👉 それぞれの要素をスクロール監視対象として登録します。

// });
// 👉 監視処理の設定終了。


// 🕓 ローディング画面のフェードアウト
// window.addEventListener('load', () => {
// 👉 ページの読み込みが完了したときに実行

//   const loader = document.getElementById('loader');
// 👉 ID「loader」のローディング要素を取得

//   loader.classList.add('loaded');
// 👉 ローディング要素に「loaded」クラスを追加して非表示にする

// });
// 👉 ページロード後の処理完了