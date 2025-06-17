WebDesign css デザイン設計 root, html, body の違いと使い分け 20250617

🔷 :root の役割と使い方
CSSカスタムプロパティ（変数）を定義する場所
htmlよりも優先順位が高いセレクタ（特異性：高）
グローバルで参照できる値を定義するときに使
通常は一番上のレイヤーの定数置き場として使う
JSやテーマ切り替えと連携
body.theme-dark のように後から上書きしやすい

🔽 よく使う用途
css
:root {
  --font-base: 16px;
  --color-primary: #3A99C9;
  --section-padding: 4rem;

}
🔷 html の役割と使い方
HTMLのルート要素（ドキュメント全体を表す）
通常はフォントサイズの基準（ルートサイズ）やスクロール方向の設定などに使う
ブラウザのデフォルト設定を調整する時に便利

🔽 よく使う用途
css
html {
  font-size: 62.5%; /* 1rem = 10px とする */
  scroll-behavior: smooth;
}

🔷 body の役割と使い方
ページの実際の表示領域（UIの土台）
基本の背景色、文字色、フォントファミリーなどを設定
特定の全体的なレイアウト制御（全体に padding を入れるなど）にも使われる

🔽 よく使う用途
css
body {
  font-family: 'Noto Sans JP', sans-serif;
  background-color: #fff;
  color: #333;
  margin: 0;
  padding: 0;
}

🎯 使い分けのまとめ（比較表）
項目	主な役割	                        使うべき場面	                    優先度（特異性）
:root	グローバル変数（CSS変数の定義）	    定数（色・サイズ・余白）を定義する	        ★★★
html	HTMLのルートサイズ制御	           font-size などの基準設定	                  ★★
body	表示スタイルの土台	               背景・フォント・基本マージン	                ★

📌 まとめ
:root：CSS変数用（グローバル）
html：ページ全体の基準（フォントサイズ・スクロール）
body：見た目の初期化・全体の背景やレイアウト制御



ChatGPT:
✅:root / html / body の実装コード例
css
🟡/* 1. :root → グローバル変数定義（CSSカスタムプロパティ） */
:root {
  /* 色に関する変数 */
  --color-primary: #3A99C9;
  --color-secondary: #FF7A59;
  --color-bg: #ffffff;
  --color-text: #333333;

  /* 余白・サイズ */
  --section-padding-default: 4rem;
  --section-padding-large: 6rem;
  --section-padding-small: 2rem;

  /* フォント */
  --font-base-size: 1.6rem;
  --font-family-base: 'Noto Sans JP', sans-serif;
}

css
🟡/* 2. html → 基準サイズやスクロールなどの全体設定 */
html {
  font-size: 62.5%; /* → 1rem = 10px にする（10px = 100% × 62.5% × 16px） */
  scroll-behavior: smooth;
  box-sizing: border-box;
}

/* すべての要素に box-sizing: border-box を継承 */
*, *::before, *::after {
  box-sizing: inherit;
}

css
🟡/* 3. body → 見た目の初期化と全体の基礎スタイル */
body {
  margin: 0;
  padding: 0;
  font-size: var(--font-base-size); /* 1.6rem = 16px */
  font-family: var(--font-family-base);
  color: var(--color-text);
  background-color: var(--color-bg);
  line-height: 1.6;
}

🧩 実際のセクションに使う例
css
.section {
  padding: var(--section-padding-default) 0;
}

.section--large {
  padding: var(--section-padding-large) 0;
}

.section--small {
  padding: var(--section-padding-small) 0;
}

html
<section class="section section--large">
  <div class="container">
    <h2 class="section__title">企業理念</h2>
    <p class="section__text">私たちは社会に貢献します。</p>
  </div>
</section>

📝 補足ポイント
項目	                             理由
:root で変数管理	            色・余白・フォントを一元管理し、保守しやすくするため
html { font-size: 62.5%; }	   rem単位で直感的に計算しやすく（1rem = 10px）
body で初期スタイル統一	         reset + ベーススタイルをまとめて設定するのが一般的