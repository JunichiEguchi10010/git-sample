Javascript スライダーSwiper.js 20250812

Swiper.js公式サイト
https://swiperjs.com/

  "swiper": {
    "prefix": "swiper",
    "body": [
      "<div class=\"swiper-container\">",
      "\t<div class=\"swiper\">",
      "\t\t<div class=\"swiper-wrapper\">",
      "\t\t\t<div class=\"swiper-slide\">",
      "\t\t\t\t<!-- スライドの中身 -->",
      "                ",
      "\t\t\t</div>",
      "\t\t</div>",
      "\t</div>",
      "\t<div class=\"swiper-pagination\"></div>",
      "\t<div class=\"swiper-button-prev\"></div>",
      "\t<div class=\"swiper-button-next\"></div>",
      "</div>"
    ],
    "description": "swiperの型"
  },

🧭 スニペット一覧と挙動概要
スニペット名	                    挙動概要
① ベーシックカルーセル	        横スクロール、ループ、ナビゲーション付き
② カード型カルーセル	        複数枚表示、レスポンシブで枚数調整
③ サムネイル付きギャラリー	     メイン画像＋サムネイル連動

カルーセル（carousel）とは、複数のコンテンツをスライド形式で切り替えながら表示するウェブデザインの手法です。

🧰 基本の導入手順
1️⃣ CDNでライブラリを読み込む（最も手軽な方法）
html
<!-- headタグ内にCSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

<!-- body閉じタグ直前にJS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

2️⃣ HTML構造の記述
html
<div class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>

  <!-- ページネーション（任意） -->
  <div class="swiper-pagination"></div>

  <!-- ナビゲーションボタン（任意） -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>

3️⃣ JavaScriptで初期化
html
<script>
  const swiper = new Swiper('.swiper', {
    loop: true, // スライドをループさせる
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
    },
  });
</script>
🎨 CSSで見た目を調整（例）
css
.swiper {
  width: 100%;
  height: 300px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #eee;

  /* スライド内の中央配置 */
  display: flex;
  justify-content: center;
  align-items: center;
}

🔧 よく使うオプション一覧
オプション名	    説明
loop	        スライドをループさせる
autoplay	    自動再生（delayで間隔指定）
effect	        スライドの切り替え効果（例: 'fade'）
pagination	    ページネーションの表示
navigation	    前後ボタンの表示
breakpoints	    レスポンシブ対応

✅ Swiper.jsについて
モダンで高機能なスライダーを簡単に実装できるJavaScriptライブラリです。
jQueryに依存せず、軽量でレスポンシブ対応もOKです。

























【2024年最新Ver11】Swiperの使い方とよく使うオプション・カスタマイズ方法を解説
https://junpei-sugiyama.com/swiper/

【最新】Swiperの使い方・カスタマイズを解説！サンプルやオプション15個付き ー基礎から応用までー
https://b-risk.jp/blog/2022/04/swiper/