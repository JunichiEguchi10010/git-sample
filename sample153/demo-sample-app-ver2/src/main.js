// Tailwind CSS 読み込み
import "./style.css";

// AOS 読み込み
import AOS from "aos";
import "aos/dist/aos.css";

// コンポーネントの読み込み
import { renderHeader } from "./header.js";
import { renderHero } from "./hero.js";
import { renderCards } from "./cards.js";
import { renderFooter } from "./footer.js";

// #app を取得
const app = document.getElementById("app");

// ページ全体を構築
app.innerHTML = `
  ${renderHeader()}
  ${renderHero()}
  <main class="max-w-7xl mx-auto py-10 px-4">
    <h2 class="text-3xl font-bold mb-8 text-center" data-aos="fade-up">サービス紹介</h2>
    <div id="cards" class="grid gap-8 md:grid-cols-3"></div>
  </main>
  ${renderFooter()}
`;

// カードを描画
renderCards(document.getElementById("cards"));

// ✅ AOS を初期化（必須）
AOS.init({
  duration: 800, // アニメーション時間（ms）
  once: true     // 1度だけアニメーションする
});


// ① コードの動作の流れ
// Tailwind CSS のスタイルシートを読み込む
// AOS（スクロールアニメーションライブラリ）を読み込む
// 各セクション（ヘッダー、ヒーロー、カード、フッター）の描画関数をインポート
// HTML内の #app 要素を取得
// #app に対して、ヘッダー・ヒーロー・メイン・フッターのHTMLを挿入
// メインセクション内の #cards 要素を取得し、カードコンポーネントを描画
// AOSライブラリを初期化して、アニメーションを有効化

// 疑似コード
// TailwindのCSSファイルを読み込む
// AOSライブラリとそのCSSを読み込む

// ヘッダー、ヒーロー、カード、フッターの描画関数を準備する

// HTMLの #app 要素を取得する

// #app に以下の構成でHTMLを挿入する：
//   - ヘッダーセクションを描画
//   - ヒーローセクションを描画
//   - メインセクションを描画（サービス紹介の見出しとカード表示領域）
//   - フッターセクションを描画

// カード表示領域（#cards）にカードコンポーネントを描画する

// AOSライブラリを初期化する（アニメーション時間800ms、1回のみ実行）


// コード解説
// ✅ 1〜2行目：CSSとアニメーションライブラリの読み込み
// js
// import "./style.css";
// Tailwind CSSなどのスタイルを定義したCSSファイルを読み込んでいます。

// ページ全体のデザインやレイアウトに関わるスタイルが適用されます。

// js
// import AOS from "aos";
// import "aos/dist/aos.css";
// AOS（Animate On Scroll）というライブラリを読み込んでいます。

// スクロール時に要素がふわっと表示されるようなアニメーションを実現します。

// CSSファイルも読み込むことで、アニメーションのスタイルが有効になります。

// ✅ 3〜6行目：各セクションのコンポーネント関数を読み込み
// js
// import { renderHeader } from "./header.js";
// import { renderHero } from "./hero.js";
// import { renderCards } from "./cards.js";
// import { renderFooter } from "./footer.js";
// ページの各部分（ヘッダー、ヒーロー、カード、フッター）を描画する関数を読み込んでいます。

// それぞれの関数はHTML文字列を返すように作られていると想定されます。

// ✅ 8行目：HTMLの #app 要素を取得
// js
// const app = document.getElementById("app");
// HTML内にある id="app" の要素を取得します。

// この要素の中に、ページ全体の構成を挿入していきます。

// ✅ 10〜18行目：ページ全体のHTMLを構築
// js
// app.innerHTML = `
//   ${renderHeader()}
//   ${renderHero()}
//   <main class="max-w-7xl mx-auto py-10 px-4">
//     <h2 class="text-3xl font-bold mb-8 text-center" data-aos="fade-up">サービス紹介</h2>
//     <div id="cards" class="grid gap-8 md:grid-cols-3"></div>
//   </main>
//   ${renderFooter()}
// `;
// renderHeader() や renderHero() などの関数を呼び出して、それぞれのHTMLを挿入しています。

// <main> セクションには「サービス紹介」の見出しと、カードを表示するための #cards 要素があります。

// data-aos="fade-up" によって、見出しがスクロール時にふわっと表示されるようになります。

// ✅ 20行目：カードを描画
// js
// renderCards(document.getElementById("cards"));
// #cards 要素を取得し、そこにカードコンポーネントを描画します。

// renderCards() 関数は、複数のカード（サービス紹介など）をHTMLとして挿入する処理を行います。

// ✅ 22〜24行目：AOSの初期化
// js
// AOS.init({
//   duration: 800, // アニメーション時間（ms）
//   once: true     // 1度だけアニメーションする
// });
// AOSライブラリを初期化して、アニメーションの設定を行います。

// duration: 800 はアニメーションの長さ（800ミリ秒）

// once: true は、スクロール時に1回だけアニメーションを実行する設定です。