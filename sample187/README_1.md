テキストが流れるような、リッチなローディングアニメーション スニペット 20251217

「文字ごとに span 分解 → animation-delay をずらす」 王道かつリッチに見える手法です。

実務でもそのまま使える コピペ用スニペット
（SCSS版＋コンパイル後CSS版も載せます）

完成イメージ（動き）
「Loading...」の 文字が左から順にふわっと現れて消える
波打つようなリズム
JavaScript不要
軽くて実務向き

① HTML（共通）
<div class="loading">
  <p>
    <span>L</span>
    <span>o</span>
    <span>a</span>
    <span>d</span>
    <span>i</span>
    <span>n</span>
    <span>g</span>
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </p>
</div>

② SCSS（おすすめ）
.loading {
  p {
    font-family: "Helvetica Neue", Arial, sans-serif;
    font-weight: 100;
    font-size: 24px;
    letter-spacing: 0.15em;
    color: #fff;

    span {
      display: inline-block;
      animation: fadeFlow 2.5s infinite cubic-bezier(0.7, 0, 0.3, 1);
    }

    // 文字ごとの遅延
    @for $i from 1 through 10 {
      span:nth-of-type(#{$i}) {
        animation-delay: #{($i - 1) * 0.12}s;
      }
    }
  }
}

@keyframes fadeFlow {
  0% {
    opacity: 0;
    transform: translateY(6px);
  }
  30% {
    opacity: 1;
    transform: translateY(0);
  }
  60% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: translateY(-6px);
  }
}


✅ ポイント
translateY を少し入れるだけで一気にリッチ
cubic-bezier で機械っぽさを排除
@for で保守性◎

③ コンパイル後CSS（そのまま使う場合）
.loading p {
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-weight: 100;
  font-size: 24px;
  letter-spacing: 0.15em;
  color: #fff;
}

.loading p span {
  display: inline-block;
  animation: fadeFlow 2.5s infinite cubic-bezier(0.7, 0, 0.3, 1);
}

.loading p span:nth-of-type(1) { animation-delay: 0s; }
.loading p span:nth-of-type(2) { animation-delay: 0.12s; }
.loading p span:nth-of-type(3) { animation-delay: 0.24s; }
.loading p span:nth-of-type(4) { animation-delay: 0.36s; }
.loading p span:nth-of-type(5) { animation-delay: 0.48s; }
.loading p span:nth-of-type(6) { animation-delay: 0.6s; }
.loading p span:nth-of-type(7) { animation-delay: 0.72s; }
.loading p span:nth-of-type(8) { animation-delay: 0.84s; }
.loading p span:nth-of-type(9) { animation-delay: 0.96s; }
.loading p span:nth-of-type(10) { animation-delay: 1.08s; }

@keyframes fadeFlow {
  0% {
    opacity: 0;
    transform: translateY(6px);
  }
  30% {
    opacity: 1;
    transform: translateY(0);
  }
  60% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: translateY(-6px);
  }
}

④ さらにリッチにしたい場合（アイデア）
✔ 横に流れる波感を強める
transform: translateX(4px);

✔ 光る感じ
text-shadow: 0 0 8px rgba(255,255,255,0.6);

✔ 実務向けTips
・LP / SPA の初期ローディング
・WordPress の AJAX 読み込み中
・React の Suspense fallback にも最適

しかも今回のような 「文字が流れるローディング」 は
👉 HTML + 通常のCSSだけで完全対応可能 です。

以下は SCSSなし・コピペ即使用版 です。

✅ 通常CSSだけのローディングアニメーション
HTML
<div class="loading">
  <p>
    <span>L</span>
    <span>o</span>
    <span>a</span>
    <span>d</span>
    <span>i</span>
    <span>n</span>
    <span>g</span>
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </p>
</div>

CSS（Pure CSS）
.loading p {
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-weight: 100;
  font-size: 24px;
  letter-spacing: 0.15em;
  color: #fff;
}

.loading p span {
  display: inline-block;
  animation: fadeFlow 2.5s infinite cubic-bezier(0.7, 0, 0.3, 1);
}

/* 文字ごとのディレイ */
.loading p span:nth-of-type(1)  { animation-delay: 0s; }
.loading p span:nth-of-type(2)  { animation-delay: 0.12s; }
.loading p span:nth-of-type(3)  { animation-delay: 0.24s; }
.loading p span:nth-of-type(4)  { animation-delay: 0.36s; }
.loading p span:nth-of-type(5)  { animation-delay: 0.48s; }
.loading p span:nth-of-type(6)  { animation-delay: 0.60s; }
.loading p span:nth-of-type(7)  { animation-delay: 0.72s; }
.loading p span:nth-of-type(8)  { animation-delay: 0.84s; }
.loading p span:nth-of-type(9)  { animation-delay: 0.96s; }
.loading p span:nth-of-type(10) { animation-delay: 1.08s; }

@keyframes fadeFlow {
  0% {
    opacity: 0;
    transform: translateY(6px);
  }
  30% {
    opacity: 1;
    transform: translateY(0);
  }
  60% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: translateY(-6px);
  }
}

🎯 なぜCSSだけで成立するのか？
・span を inline-block にする
・nth-of-type() で 1文字ずつ遅延
・animation-delay をずらすだけ
👉 JavaScript不要 / 軽量 / 安定

💡 実務でのおすすめ使い方
✔ WordPress
Ajax読み込み中
ページ初期表示のローディング

✔ LP / コーポレートサイト
ファーストビュー直前の演出

✔ SPA（React等）
Suspense fallback の中身にもそのまま使用可能

🔧 よくある改善パターン
少し高級感を出したい
.loading p span {
  text-shadow: 0 0 8px rgba(255,255,255,0.6);
}

横方向に流れる感じ
transform: translateX(4px);

🧠 補足（設計思想）
CSSアニメーションは「状態管理不要な演出」に最適
・ローディング
・ホバー
・視覚的フィードバック
→ JSでやるのは やりすぎ です。

✅ 「エコツール（ノーコード／ローコード系）」＋最小CSS という形が一番現実的です。

ここでは 実務で本当に使われる代表例 に絞って説明します。

結論（先に）
方法	                可否	実務向き度
WordPress プラグイン	 ◎	    ★★★★★
Webflow / STUDIO	    ◎	   ★★★★☆
Elementor / Bricks	    ◎	   ★★★★★
Lottie（JSON）	         ○	    ★★★☆☆
完全ノーコードのみ	      △	     ★★☆☆☆

① WordPress プラグイン（最も現実的）
方法
・カスタムHTMLブロック
・追加CSS（カスタマイザー）
👉 プラグイン不要でも可
👉 Elementor / Bricks / Gutenberg 全部OK

手順
カスタムHTMLブロックにこれを貼る

<p class="loading">
  <span>L</span><span>o</span><span>a</span><span>d</span>
  <span>i</span><span>n</span><span>g</span>
  <span>.</span><span>.</span><span>.</span>
</p>

「追加CSS」にPure CSSを貼る
（さきほどのCSSそのまま）

💡 実務ポイント
・表示速度に影響ほぼなし
・プラグイン増えない＝エコ

② Elementor / Bricks（エコツール代表）
やり方
・テキストウィジェット → HTMLモード
・Custom CSS に貼る

selector span {
  display: inline-block;
  animation: fadeFlow 2.5s infinite;
}
👉 Elementor Pro / Bricks なら CSSスコープ管理 が楽

③ Webflow / STUDIO（ノーコード）
Webflow
・文字を1文字追加 → span化
・nth-child() で animation-delay
👉 UIだけで可能
👉 ただし 文字数変更に弱い

STUDIO
・CSS直接書けないため
・Code埋め込みブロック が必要

④ Lottie（After Effects）
可能だが…
軽くない
テキスト変更不可
SEO / a11y 微妙
👉 装飾アニメ向け
👉 ローディングにはややオーバースペック

⑤ 完全ノーコードは正直きつい

理由：
1文字ずつ制御ができない
animation-delay をずらせない
保守性が低い

👉 「HTML＋CSS1%」が最小コスト
🧠 エコな設計の考え方（重要）
あなたの制作スタイル（中小企業・個人向け）なら：

プラグインを増やさず
表現はCSSで解決
が一番価値があります。
表示が速い
保守しやすい
将来ツールが変わっても再利用可能

🔧 実務でよくある落としどころ
・WordPress + カスタムHTML + 追加CSS
・Elementor + Custom CSS
・Bricks + scoped CSS

テキストが流れるような、リッチなローディングアニメーションを実装してみましょう！
https://www.youtube.com/watch?v=nb4DAGKJLLA