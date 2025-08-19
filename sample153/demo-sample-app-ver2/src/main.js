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
