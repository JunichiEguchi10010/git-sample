document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".js-count-up");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          startCounter(el);
          observer.unobserve(el); // 1回だけ動かす
        }
      });
    }, {
      threshold: 0.1,  // 10%見えたら開始 40%発火ならthresholdを0.4（40%）
      rootMargin: "0px"  // マージンを設定（必要に応じて調整可能）
    });
  
    counters.forEach(counter => {
      observer.observe(counter);
    });
  });
  
  
  function startCounter(element) {
    const target = Number(element.dataset.target);
    const duration = Number(element.dataset.duration);
  
    countUp(element, target, duration);
  }
  
  
  function countUp(element, target, duration) {
    let startTime = null;
  
    // 「数字が早すぎる / 遅すぎる」時の自動補正（実務用）
    const minDuration = 800;   // 最短0.8秒（ユーザーに早すぎる印象を与えない）
    const maxDuration = 5000;  // 最長5秒（長すぎて飽きない限界）
    const adjustedDuration = Math.min(Math.max(duration, minDuration), maxDuration);
  
    function update(timestamp) {
      if (!startTime) startTime = timestamp;
  
      const progress = Math.min((timestamp - startTime) / adjustedDuration, 1);
      const value = Math.floor(progress * target);
  
      element.textContent = value.toLocaleString();
  
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
  
    requestAnimationFrame(update);
  }  

//   ✅ 疑似コード
//   【ページの読み込み完了後に実行】
//   ① 「.js-count-up」というクラスが付いた全ての要素を取得する。

//   ② IntersectionObserver（画面に要素が見えたか監視する仕組み）を作る。
//       - 要素が 10% 以上見えたら反応する（threshold: 0.1）
//       - rootMargin は「0px」（監視範囲の余白なし）

//   ③ 監視対象になった要素ごとに以下を実行する：
//         a. 要素が画面に入ったら（isIntersecting = true）
//               → startCounter() を呼んでカウントアップ開始
//               → その要素の監視を解除（1回だけ動かすため）

//   ④ 取得した全ての数字要素を監視に登録する。



// 【startCounter(element) の処理】
//   ① 要素が持つ data-target を取得（最終的に何まで数えるか）
//   ② data-duration を取得（何ミリ秒かけてカウントするか）
//   ③ countUp() を呼んで実際のアニメーションを開始する。



// 【countUp(element, target, duration) の処理】

//   ① 開始時刻を入れる変数 startTime を null にして用意する。

//   ② duration を「極端に短すぎ・長すぎ」にならないよう補正する：
//         - 最短 800ms
//         - 最長 5000ms
//         - 上記の範囲に収まるように調整した時間を adjustedDuration とする

//   ③ requestAnimationFrame を使って滑らかなアニメーションを行う：
//         毎フレーム update(timestamp) を実行する。


// 【update(timestamp) の処理】
//   ① 最初の呼び出しのときだけ startTime に timestamp をセット。

//   ② 今どれくらい進んだかを計算：
//         progress = (今の時間 - 開始時間) ÷ 有効な duration
//         progress は最大 1（＝100%）までに制限

//   ③ 現在の数字を計算：
//         value = progress * target の小数切り捨て

//   ④ 要素に value を表示
//         ※ 3,000 のようにカンマ付きにする

//   ⑤ progress が 1 未満なら、次のフレームでも update() を呼び続ける
//       → まだ終わっていないのでアニメーション継続


// コード解説
// // ページのHTMLがすべて読み込まれたら実行する
// document.addEventListener("DOMContentLoaded", () => {

//     // 「.js-count-up」クラスを持つすべての要素を取得（カウントアップ対象）
//     const counters = document.querySelectorAll(".js-count-up");
  
//     // IntersectionObserver を作成（要素が画面に見えたかどうか監視）
//     const observer = new IntersectionObserver(entries => {

//       // 監視対象の全エントリーを1つずつ処理
//       entries.forEach(entry => {

//         // 要素が画面内に入った瞬間（10%以上見えた）かどうか
//         if (entry.isIntersecting) {

//           // 画面に入った要素を取得
//           const el = entry.target;

//           // カウントアップを開始する
//           startCounter(el);

//           // この要素の監視を解除（1回きりのアニメーションにする）
//           observer.unobserve(el);
//         }
//       });
//     }, {
//       // 監視対象が10%見えたら発火（40%で発火させたいなら 0.4 にする）
//       threshold: 0.1,

//       // 監視範囲の余白なし（もっと早く発火させたい場合は "0px 0px -20%" など調整可）
//       rootMargin: "0px"
//     });
  
//     // 取得した全カウンター要素を1つずつ監視に登録
//     counters.forEach(counter => {
//       observer.observe(counter);
//     });

// }); // DOMContentLoaded の終わり
  


// // カウントアップ開始処理（対象要素から設定値を取得する）
// function startCounter(element) {

//     // data-target の値（最終的に表示したい数字）を数値として取得
//     const target = Number(element.dataset.target);

//     // data-duration の値（アニメーション時間）を数値として取得
//     const duration = Number(element.dataset.duration);
  
//     // カウントアップ本体の関数を呼び出す
//     countUp(element, target, duration);
// }
  


// // 実際に数字を増やしていく処理
// function countUp(element, target, duration) {

//     // 最初のフレームで記録する開始時刻（まだ未設定）
//     let startTime = null;
  
//     // アニメーションの長さが短すぎ・長すぎになるのを防ぐための補正値
//     const minDuration = 800;   // 最短0.8秒（早すぎると不自然）
//     const maxDuration = 5000;  // 最長5秒（長すぎると飽きる）
    
//     // duration の値を min～max の範囲に収める
//     const adjustedDuration = Math.min(Math.max(duration, minDuration), maxDuration);
  
//     // アニメーションのフレームごとに実行される関数
//     function update(timestamp) {

//       // 開始時刻が未設定なら、最初の timestamp を開始時間として記録
//       if (!startTime) startTime = timestamp;
  
//       // 現在の進行度（0〜1）
//       const progress = Math.min((timestamp - startTime) / adjustedDuration, 1);

//       // 進行度に応じて表示する現在の数字を計算
//       const value = Math.floor(progress * target);
  
//       // 要素に現在値を表示（1,000 のようにカンマ区切りにする）
//       element.textContent = value.toLocaleString();
  
//       // まだ100%に達していなければ、次のフレームも update() を実行
//       if (progress < 1) {
//         requestAnimationFrame(update);
//       }
//     }
  
//     // アニメーションを開始（最初の update() 呼び出し）
//     requestAnimationFrame(update);
// }
