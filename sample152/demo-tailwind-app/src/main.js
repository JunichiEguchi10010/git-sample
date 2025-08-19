import "./style.css";
import { renderCards } from "./cards.js";

document.getElementById("app").innerHTML = `
  <h1 class="text-3xl font-bold mb-8 text-center">Tailwind v3 カード例</h1>
  <div id="cards" class="grid gap-8 md:grid-cols-3"></div>
`;

renderCards(document.getElementById("cards"));


// ✅ コードの全体の流れ
// CSSの読み込み
// TailwindCSS のスタイルを反映させるために style.css を読み込む。

// カード描画処理の読み込み
// cards.js から renderCards 関数をインポート。
// → これがカード UI を生成する役割を持つ。

// アプリの土台を構築

// index.html 内の #app 要素にアクセス。

// その中に「ページタイトル」と「カードコンテナ（#cards）」を挿入。

// カードの描画実行

// renderCards() を呼び出し、#cards コンテナを渡す。

// 関数内でカードの HTML が生成され、#cards に追加される。

// 👉 つまり全体像は
// 「CSSを読み込む → カード描画ロジックを呼び込む → HTMLの土台を作る → カードを実際に描画する」


// ✅ 疑似コード
// 1. TailwindCSS を適用するための CSS ファイルを読み込む
// 2. カードを生成する処理（cards.js にある関数 renderCards）をインポートする

// 3. index.html 内の <div id="app"> を取得する
//    → この領域にアプリ全体の UI を組み立てる

// 4. #app の中身を次の HTML に置き換える：
//    - ページタイトル（中央揃えの大きな見出し）
//    - カードを配置するための空のコンテナ <div id="cards">

// 5. カード描画用の関数 renderCards() を呼び出し、
//    - #cards コンテナを渡す
//    - そこにカードを実際に生成・追加させる

// ✅ コード解説
// import "./style.css";
// 👉 TailwindCSS の設定を反映させるために、エントリーポイントで CSS を読み込んでいます。
// Vite は import "./style.css"; のように CSS を直接インポートすることができ、
// バンドル時に Tailwind が効いたスタイルを全体に適用します。

// import { renderCards } from "./cards.js";
// 👉 cards.js から renderCards という関数をインポートしています。
// この関数の役割は「カードの HTML を動的に作って指定した要素に追加する」ことです。


// document.getElementById("app").innerHTML = `
//   <h1 class="text-3xl font-bold mb-8 text-center">Tailwind v3 カード例</h1>
//   <div id="cards" class="grid gap-8 md:grid-cols-3"></div>
// `;
// 👉 HTML の #app 要素を取得して、その中身を 置き換え ています。
// <h1>: ページのタイトル（大きく太字、中央揃え）
// <div id="cards">: カードを挿入するための空コンテナ
// grid gap-8: グリッドレイアウトでカードを並べる
// md:grid-cols-3: 画面幅が中サイズ以上のときは3列レイアウトにする
// つまり「ページの骨組み（タイトルとカード置き場）」をここで作っています。

// renderCards(document.getElementById("cards"));
// 👉 renderCards() を呼び出し、さっき作った #cards コンテナを渡しています。
// renderCards の中でカード要素が生成され、#cards の中に追加されます。

// ✅ まとめると
// TailwindCSS を読み込む
// カード描画ロジックをインポート
// HTML の骨組み（タイトル & カード置き場）を作成
// renderCards を実行して、カードを実際に表示

