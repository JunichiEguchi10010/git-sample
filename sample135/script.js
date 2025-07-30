document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".menu-toggle");
    const navList = document.getElementById("nav-list");
  
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", !isOpen);
      navList.hidden = isOpen;
    });
  });
  

  // 🟦 コードの全体像
// ページの読み込み完了後に処理を開始する

// メニュー開閉用ボタン要素を1つ取得する

// ナビゲーションリスト（メニュー本体）要素を取得する

// ボタンに以下の機能を追加する：

// クリックされたときに、メニューの表示／非表示を切り替える

// aria-expanded 属性を操作して、開いているかどうかの状態を記録する

// メニューが開いていれば閉じ、閉じていれば開くように hidden 属性で制御する


// 🟦 擬似コード
// HTMLページが読み込まれたときに以下の処理を開始
// ページが完全に読み込まれたら実行する処理として…

// 「メニューを開閉するボタン」を探して、toggleという変数に入れる
// メニュー切り替えボタンを取得

// ナビゲーションリスト（メニュー本体）を探して、navListという変数に入れる
// ナビゲーションリストを取得

// ボタンがクリックされたときに実行する処理を設定
// ボタンがクリックされたときの処理：

// 現在、メニューが開いているかどうかをaria-expanded属性から調べる
//   メニューが開いているかを調べる（trueかfalse）

// メニューの開閉状態を逆にする（true → false、false → true）
//   aria-expanded属性の値を反転して設定

// navListの表示状態を切り替える（開いていれば閉じ、閉じていれば開く）
//   navList

// 🔹 コード解説
// document.addEventListener("DOMContentLoaded", () => {
// 意味： HTMLの全ての要素が読み込まれたタイミングで、指定された処理を実行するように設定。 ※ページ読み込み完了後に安全にJavaScriptを動かすためのイベント。
//   const toggle = document.querySelector(".menu-toggle");
// 意味： クラス名が menu-toggle の要素（主にメニューの開閉ボタン）を取得して、変数 toggle に代入。 ※ボタンがどれなのかを識別する処理。

//   const navList = document.getElementById("nav-list");
// 意味： ID名が nav-list の要素（ナビゲーションメニュー本体）を取得して、変数 navList に代入。

//   toggle.addEventListener("click", () => {
// 意味： 取得したボタン toggle にクリックイベントを追加。 クリックされたときに、下記の処理が実行される。

//     const isOpen = toggle.getAttribute("aria-expanded") === "true";
// 意味： ボタンの aria-expanded 属性が "true" かどうかで、現在メニューが開いているかを判定し、isOpen に代入。

//     toggle.setAttribute("aria-expanded", !isOpen);
// 意味： 開閉状態を反転して、aria-expanded を更新。 true → false、false → true に切り替える。

//     navList.hidden = isOpen;
// 意味： isOpen が true（＝開いている）なら hidden を true にして非表示に。 逆に閉じているなら表示する。視覚的にメニューを切り替える操作。

//   });
// });
// 意味： イベントと関数の終わりを示す閉じ括弧。最初の DOMContentLoaded に対応。

// 🔧このコードは「メニューを開閉するボタン」と「ナビゲーション本体」を連動させて、クリックすることで見た目とアクセシビリティ両方に対応する仕組みです。