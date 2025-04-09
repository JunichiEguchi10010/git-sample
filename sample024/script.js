// IntersectionObserver方式
document.addEventListener("DOMContentLoaded", () => {
    const targets = document.querySelectorAll('.fade-in-up');
  
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-show');
          observer.unobserve(entry.target); // ← 一度表示されたら監視終了（パフォーマンス◎）
        }
      });
    });
  
    targets.forEach(target => observer.observe(target));
  });
  




//   scroll + getBoundingClientRect方式
// // 初期表示チェック用の関数
// function checkVisibility() {
//     const targets = document.querySelectorAll('.fade-in-up');

//     targets.forEach(target => {
//         const rect = target.getBoundingClientRect(); // 要素の位置を取得
//         const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

//         if (isVisible) {
//             target.classList.add('is-show'); // クラスを追加して表示
//         }
//     });
// }

// // 初期チェック
// checkVisibility();

// // スクロール時にもチェックを行う
// window.addEventListener("scroll", checkVisibility);


// 比較項目	                    scroll + getBoundingClientRect方式	                    IntersectionObserver方式
// 処理タイミング	            スクロールごとに毎回チェック	                            要素が見える時だけ呼ばれる
// パフォーマンス	            要素が多いと重くなる	                                    ブラウザ最適化済で軽い
// 対応ブラウザ	                古いIEでもOK	                                          IE非対応（モダンブラウザはOK）
// 実装の簡潔さ	                やや古典的	                                               モダンでスマート
// 発火タイミングの正確さ	      スクロール量依存	                                        表示領域に入った瞬間を検知


// 使い分け
// 基本は IntersectionObserver を使う（パフォーマンス良くて見た目も自然）

// IE対応が必要な場合や環境制限があるとき → getBoundingClientRect を検討

