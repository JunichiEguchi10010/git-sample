// 「2つのボタンを使って、debounce（遅延）と throttle（間引き）というイベント制御の違いをログで確認できるデモコード」

// debounce 関数: 最後の入力から1秒後にログが出力されます。何度も押しても最後の1回だけ。
function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }
  
  // throttle 関数: 1秒ごとに1回だけログを出力します。押しすぎても頻度制限あり。
  function throttle(fn, interval) {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= interval) {
        lastCall = now;
        fn.apply(this, args);
      }
    };
  }
  
  // ログ表示
  function log(type) {
    const logArea = document.getElementById("logArea");
    const msg = `[${type}] ${new Date().toLocaleTimeString()}`;
    const div = document.createElement("div");
    div.textContent = msg;
    logArea.appendChild(div);
    logArea.scrollTop = logArea.scrollHeight;
  }
  
  // イベントハンドラの設定
  document.getElementById("debounceBtn")
    .addEventListener("click", debounce(() => log("Debounce"), 1000));
  
  document.getElementById("throttleBtn")
    .addEventListener("click", throttle(() => log("Throttle"), 1000));  



// 🟦 コードの全体像（Debounce / Throttle / Log 機能） 
// ページの読み込み完了後に処理を開始する
// ログを表示する領域（logArea）を取得する

// debounce関数を定義する： 
//  タイマー用の変数を用意
//  実行する関数と待機時間を受け取って、一定時間入力が途切れた後に関数を実行する関数を返す

// throttle関数を定義する：
//  最後に関数を呼んだ時間を記録する変数を用意
//  実行する関数と間隔時間を受け取って、一定時間ごとにしか実行されない関数を返す

// log関数を定義する： 
//  現在の時刻とメッセージを含む <div> 要素を作成して logArea に追加 
//  スクロール位置を最下部に更新する

// 「Debounce」ボタンの要素を取得し、クリックイベントを設定する：
//  待機時間 1000ms 付きで log('Debounce') を遅延実行するように設定

// 「Throttle」ボタンの要素を取得し、クリックイベントを設定する：
//  間隔時間 1000ms 付きで log('Throttle') を制限実行するように設定

// 🟦 疑似コード
//     関数「debounce」を定義（引数：実行する関数、待機時間）：
//   ・タイマー用の変数を用意
//   ・戻り値として関数を返す。この関数が呼ばれると：
//     - 既存のタイマーをキャンセル
//     - 新しくタイマーを設定し、待機時間が経過したら引数の関数を実行する

// 関数「throttle」を定義（引数：実行する関数、間隔時間）：
//   ・最後に関数を呼んだ時刻を保存する変数を用意
//   ・戻り値として関数を返す。この関数が呼ばれると：
//     - 今の時刻を取得
//     - 最後に呼んだ時刻との差が指定した時間以上なら：
//       - 現在の時刻を「最後の呼び出し時間」に更新
//       - 引数の関数を実行する

// 関数「log」を定義（引数：ログ種別）：
//   ・ログを表示する領域「logArea」を取得
//   ・現在の時刻を含むログメッセージを作成
//   ・新しい <div> 要素を作り、そこにメッセージを設定
//   ・それを「logArea」に追加
//   ・スクロール位置を最下部に更新

// 「debounce」ボタンがクリックされたら：
//   ・「Debounce」と記録する関数を、待機時間 1000ms（1秒）付きで遅延実行するよう設定

// 「throttle」ボタンがクリックされたら：
//   ・「Throttle」と記録する関数を、間隔時間 1000ms（1秒）付きで制限実行するよう設定

// コード解説
// 🧠 debounce 関数
// function debounce(fn, delay) {
// fn: 実行したい関数
// delay: 何ミリ秒待ってから実行するか（遅延時間）
//   let timer;
// タイマー用の変数を定義（後で clearTimeout で使う）

//   return function (...args) {
// debounceされた関数を返す。実行時の引数は ...args で受け取る（可変引数対応）

//     clearTimeout(timer);
// 直前にセットされたタイマーをキャンセル（繰り返し呼ばれても、最後の1回だけを残す）

//     timer = setTimeout(() => fn.apply(this, args), delay);
// delay ミリ秒待ってから fn を実行

// apply(this, args) は元の引数とスコープを保持して呼び出すため

// 🧠 throttle 関数
// function throttle(fn, interval) {
// fn: 実行したい関数
// interval: 何ミリ秒ごとに1回だけ実行するか（間隔時間）

//   let lastCall = 0;
// 最後に関数を実行した時間を保存しておく変数

//   return function (...args) {
// throttleされた関数を返す

//     const now = Date.now();
// 現在の時間（ミリ秒）を取得

//     if (now - lastCall >= interval) {
// 前回の実行時間から interval ミリ秒以上経っていたら…

//       lastCall = now;
// 今の時間を記録（次回比較のため）

//       fn.apply(this, args);
// 間隔内なら関数を実行、引数・スコープも保持

// 🧠 log 関数
// function log(type) {
// type: "Debounce" や "Throttle" など、ログの種類

//   const logArea = document.getElementById("logArea");
// ログを表示する DOM 要素を取得

//   const msg = `[${type}] ${new Date().toLocaleTimeString()}`;
// 現在の時刻付きのログメッセージを生成

//   const div = document.createElement("div");
// 新しい <div> 要素を作成

//   div.textContent = msg;
// 作成した要素にログメッセージをセット

//   logArea.appendChild(div);
// logArea にログを追加（下に積み重なる）

//   logArea.scrollTop = logArea.scrollHeight;
// スクロール位置を最下部に移動（新しいログが見えるように）

// 🧠 イベントハンドラの設定
// document.getElementById("debounceBtn")
// Debounce ボタン要素を取得

//   .addEventListener("click", debounce(() => log("Debounce"), 1000));
// クリック時に debounceされた log 関数を実行（1秒の遅延）

// document.getElementById("throttleBtn")
// Throttle ボタン要素を取得

//   .addEventListener("click", throttle(() => log("Throttle"), 1000));
// クリック時に throttleされた log 関数を実行（1秒間隔）