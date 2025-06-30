// script.js
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    let alreadyStarted = false;
  
    // 数字をアニメーションで増やす関数
    const animateCount = (el, target) => {
      const duration = 2000; // アニメーション時間（ms）
      const startTime = performance.now();
  
      const update = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = value.toLocaleString();
  
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toLocaleString(); // 最終値で固定
        }
      };
  
      requestAnimationFrame(update);
    };
  
    // スクロールで表示領域に入ったらカウント開始
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !alreadyStarted) {
          alreadyStarted = true;
          counters.forEach(counter => {
            const target = parseInt(counter.dataset.target, 10);
            animateCount(counter, target);
          });
        }
      });
    }, {
      threshold: 0.5
    });
  
    const section = document.querySelector('.counter-section');
    if (section) {
      observer.observe(section);
    }
  });  


// コード解説
// ファイルの先頭行。JavaScriptファイルであることを示しています（コメントなので実行には影響なし）。

// document.addEventListener('DOMContentLoaded', () => {
//  「HTMLがすべて読み込まれてから」この関数を実行するというイベントリスナー。
// 画像などの読み込み完了ではなく、「DOM（構造）」の読み込み完了タイミングで処理を開始します。

//   const counters = document.querySelectorAll('.counter');
// .counter というクラスがついた要素をすべて取得し、counters という変数に配列として格納します。
// → つまり、画面上の複数のカウンター対象要素をまとめて取得しています。

//   let alreadyStarted = false;
// フラグ変数。カウントアップ処理を一度だけ実行するために使います。
// → スクロールで何度も発動しないように制御。

//   // 数字をアニメーションで増やす関数
// これ以降に定義する関数 animateCount の役割を示しています。

//   const animateCount = (el, target) => {
//  カウントアップ用の関数を定義。
// el：対象のDOM要素（例：1つの .counter）
// target：最終的に表示したい数値（例：1500）

//     const duration = 2000; // アニメーション時間（ms）
// 数字が0から target に到達するまでの時間を**2000ミリ秒（2秒）**に設定。

//     const startTime = performance.now();
// アニメーション開始時刻を取得。performance.now() は高精度なタイマーです。

//     const update = (now) => {
// 数値を更新する関数（アニメーション中に繰り返し呼び出される）。
// now は、次のフレーム時点のタイムスタンプです。

//       const elapsed = now - startTime;
// 経過時間（現在時刻 - 開始時刻）を算出します。

//       const progress = Math.min(elapsed / duration, 1);
// アニメーションの進捗（0〜1）を計算。
// たとえば、0.5 なら50%進行。1を超えないよう Math.min で制限。

//       const value = Math.floor(progress * target);
// 進捗に応じた数値を計算。例えば、進捗が0.5で target = 1500 の場合 → 750 になります。

//       el.textContent = value.toLocaleString();
// 要素の表示テキストを更新。toLocaleString() によって 1,500 のように3桁区切りで表示します。

//       if (progress < 1) {
// アニメーションがまだ完了していない場合は…

//         requestAnimationFrame(update);
// 次のフレームで update() を再実行（アニメーションを滑らかに継続）。
// 約60fpsで実行されます。

//       } else {
// アニメーションが終了した場合は…

//         el.textContent = target.toLocaleString(); // 最終値で固定
// カウント値を最終的な目標数値でピッタリ固定します（誤差防止）。

//     };
// update 関数の終了。

//     requestAnimationFrame(update);
//  update() をアニメーションの1フレーム目として実行開始します。

//   };
// animateCount 関数の終了。

//   // スクロールで表示領域に入ったらカウント開始
// コメント：次にスクロール検知の処理を定義することを示しています。

//   const observer = new IntersectionObserver((entries) => {
// IntersectionObserver（交差監視API）を使って、要素が画面内に表示されたかをチェックする監視オブジェクトを定義。

//     entries.forEach(entry => {
// 監視対象要素ごとに処理を繰り返す（基本的に1つですが、複数でも対応可能）。

//       if (entry.isIntersecting && !alreadyStarted) {
// 対象が画面内に表示されたかつ、まだアニメーションを始めていないなら…

//         alreadyStarted = true;
// 二重実行を防ぐため、alreadyStarted を true に変更。

//         counters.forEach(counter => {
// すべての .counter 要素に対して処理を行う。

//           const target = parseInt(counter.dataset.target, 10);
// HTMLで指定された data-target 属性から数値を取得し、整数に変換。

//           animateCount(counter, target);
// カウントアップアニメーションを実行。

//         });
// counters.forEach() の終了。

//       }
//     });
// IntersectionObserver のコールバック関数終了。

//   }, {
//     threshold: 0.5
//   });
//  threshold: 0.5 は「要素の50%以上が画面に見えたら発動する」条件。

//   const section = document.querySelector('.counter-section');
//  .counter-section 要素（カウント全体のラッパー）を取得。

//   if (section) {
//     observer.observe(section);
//   }
//  .counter-section が存在すれば、それを監視対象として observer に登録します。

// });
//  DOMContentLoaded イベントの終了。

// まとめ
// パフォーマンスが良い（requestAnimationFrame + IntersectionObserver）
// スマホやPCで共通動作（レスポンシブに対応可能）
// 複数カウンターに対応（1つの画面内に何個でも使える）

