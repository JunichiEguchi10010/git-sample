// JavaScript（必要に応じて）
// このレイアウトはCSSのみで完結しますが、動的に要素を追加したい場合は以下のようなJSを使えます

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".grid-container");
  for (let i = 7; i <= 10; i++) {
    const item = document.createElement("div");
    item.className = "grid-item";
    item.textContent = `Item ${i}`;
    item.style.display = "none"; // 最初は非表示
    container.appendChild(item);
    setTimeout(() => {
      item.style.display = "flex"; // わかりやすいように1秒後に表示（flexで中央揃え維持）
    }, 1000);
  }
});
  
//  📌 コードの全体像
// ✅ ページの読み込み完了を待つ（DOMContentLoadedイベント）
// .grid-containerというクラスを持つ要素を取得
// ループで7〜10の数字を順に処理
// div要素を新しく作成
// クラス名をgrid-itemに設定
// テキスト内容をItem 7〜Item 10に設定
// 作成した要素をgrid-containerに追加

// 📌 疑似コード
// ページの読み込みが完了したら、次の処理を実行する：

// 1. クラス名が「grid-container」の要素を取得する。
// 2. 数字7から10まで繰り返す：
//    - 新しい「div」要素を作成する。
//    - この要素に「grid-item」というクラス名を設定する。
//    - この要素のテキストに「Item 数字」を設定する。
//    - 作成した要素を「grid-container」に追加する。

// 📌 コード解説t
// document.addEventListener("DOMContentLoaded", () => {
// 意味：HTMLの読み込みがすべて完了したタイミングで、指定した処理（関数）を実行する。
// ポイント：画像などの読み込みを待たず、DOM（HTMLの構造）が使えるようになった瞬間に動く。

//   const container = document.querySelector(".grid-container");
// 意味：HTMLの中から、クラス名が「grid-container」の要素を探して取得する。
// ポイント：この要素の中に、後で新しいアイテム（div）を追加していく。

//   for (let i = 7; i <= 10; i++) {
// 意味：変数iを7から始めて、10まで1ずつ増やしながら繰り返す。
// ポイント：このループは4回実行される（7, 8, 9, 10）。

//     const item = document.createElement("div");
// 意味：新しくdivタグの要素を作成する。
// ポイント：この要素はまだ画面には表示されていない。後で追加する。

//     item.className = "grid-item";
// 意味：作成したdivに「grid-item」というクラス名をつける。
// ポイント：CSSでこのクラスにスタイルを設定している場合、見た目が変わる。

//     item.textContent = `Item ${i}`;
// 意味：divの中に表示する文字を「Item 7」などに設定する。
// ポイント：テンプレート文字列（バッククォート ``）を使って、変数iの値を埋め込んでいる。

//     container.appendChild(item);
// 意味：作成したdiv要素を、先ほど取得した「grid-container」の中に追加する。
// ポイント：これで画面上に新しいアイテムが表示される。

//   });
// 意味：DOMContentLoadedのイベント処理の終わり。
// ポイント：この中に書いた処理が、ページ読み込み後に実行される。

// 全体として、このコードは「ページが読み込まれたら、7〜10の番号付きアイテムをHTMLに追加する」処理。