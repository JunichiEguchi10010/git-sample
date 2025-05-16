アクセシビリティを考慮したCSSの単位 20250516

✅ 基本方針：
相対単位を積極的に使う（特にrem・em）
ユーザー設定（ブラウザやOSのフォントサイズ変更）に追従できる設計
可読性・柔軟性・保守性を考慮する

💡 単位ごとの最適な使い分けルール（おすすめ）
要素の種類	                                                推奨単位                    	    理由・備考
html の font-size	                                    100% または medium	            ユーザーのブラウザ設定に準拠。px指定は非推奨。
フォントサイズ (font-size)	                                rem                        	ルートに対しての相対値で、統一管理しやすくスケーラブル。
行間 (line-height)	                                    単位なし または em	            単位なしなら文字サイズに比例して変動。emなら微調整がしやすい。
余白（padding, margin, gap）	                        rem または em	                フォントサイズと連動させるならem、全体設計に合わせるならrem。
インデント（text-indent）	                                em                      	フォントサイズに比例。段落の視認性向上に有効。
ボーダー・ボーダー半径（border, border-radius）	            em または rem                ボタンサイズと連動させたい場合に有効。pxは固定デザインに最適。
サイズ制限（max-width, min-width）	                    %, ch, em, rem, min()	        レスポンシブ対応。特に min() 関数で柔軟性が上がる。
レイアウト幅（width, height）	                        %, vw, vh, rem	                レスポンシブ対応を意識し、固定より柔軟に。
アイコンや細かなサイズ指定	                                px	                         ピクセル単位での視認性や微調整が必要な場合に。
グリッドやフレックスのgap	                                rem	                         コンポーネント間の一貫性を保ちやすい。


🎯 よくあるCSS設計例（実践）
css
html {
  font-size: 100%;
}

body {
  font-size: 1rem;
  line-height: 1.6;
  padding: 1.5rem;
  max-width: min(90%, 60ch);
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  line-height: 1.8;
  text-indent: 2em;
}

button {
  font-size: 1rem;
  padding: 0.75em 1.5em;
  border-radius: 0.5em;
  border: 2px solid #333;
}
✅ このルールのメリット
✅ ユーザーのフォントサイズ変更に強い（アクセシビリティ向上）
✅ デザインの一貫性が保たれる
✅ レスポンシブ対応が柔軟にできる
✅ 将来の保守がしやすい（テーマ変更も容易）

🚫 避けたほうがいい使い方
❌ htmlやbodyに font-size: 62.5%（=10px）を設定してpx風に使う（remの意味が薄れる）
❌ 全体をpxで統一する（ユーザー拡大表示に対応できない）
❌ 不要な場所までemでネスト設計（予測困難なサイズになりやすい）

💬 結論
アクセシビリティと実務性のバランスをとるためには：
「文字サイズは rem、調整には em、制約や制御には min/max や % を活用し、細かい装飾だけ px」
というルールが最も実用的で、アクセシビリティ・レスポンシブ・メンテナンス性すべてに強い設計になります。



🎨 デザインガイドライン用CSSスニペット
css
/* =====================================
  ベース設定
===================================== */
html {
  font-size: 100%; /* ユーザー設定を尊重 */
}

body {
  font-size: 1rem; /* 通常 16px相当 */
  line-height: 1.6; /* 適切な読みやすさ */
  color: #222;
  background-color: #fff;
  max-width: min(90%, 60ch);
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Helvetica Neue', sans-serif;
}

/* タイポグラフィ */
h1 {
  font-size: 2.5rem;
  line-height: 1.2;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2rem;
  line-height: 1.3;
  margin-bottom: 0.75rem;
}

p {
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  text-indent: 2em;
}

/* ボタン */
.button {
  display: inline-block;
  font-size: 1rem;
  padding: 0.75em 1.5em;
  background-color: #3A99C9;
  color: #fff;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #2d7aa8;
}

/* レイアウト制限 */
.container {
  max-width: min(90%, 960px);
  margin: 0 auto;
  padding: 1rem;
}


🛠 Sass変数化された単位設計例（_variables.scss）
scss
// =====================================
// 変数定義（アクセシビリティ重視）
// =====================================

// ベースフォントサイズ（htmlの1rem相当）
$base-font-size: 1rem;

// 行間
$line-height-base: 1.6;

// 余白単位
$spacing-unit: 1rem;

// ボーダーや角丸
$border-radius: 0.5em;
$border-width: 2px;

// カラー
$color-primary: #3A99C9;
$color-primary-dark: #2d7aa8;
$color-text: #222;
$color-background: #fff;

// コンテナ幅
$max-width: min(90%, 960px);
$readable-width: min(90%, 60ch);


🧱 Sassでの活用例（base.scss）
scss
@import 'variables';

html {
  font-size: 100%;
}

body {
  font-size: $base-font-size;
  line-height: $line-height-base;
  color: $color-text;
  background-color: $color-background;
  max-width: $readable-width;
  margin: 0 auto;
  padding: $spacing-unit * 2 $spacing-unit;
}

h1 {
  font-size: $base-font-size * 2.5;
  margin-bottom: $spacing-unit;
}

.button {
  font-size: $base-font-size;
  padding: 0.75em 1.5em;
  background-color: $color-primary;
  color: #fff;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: $color-primary-dark;
  }
}

💬 補足（実務で使いやすくする工夫）
余白や行間、角丸など「相対的に調整すべき要素」は em や rem ベースで変数化。
min() や max() は max-width などで積極的に活用（可読性とレスポンシブの両立）。
カラーも変数化しておけばアクセシビリティ対応（コントラスト調整）もしやすい。

✅ 1. Tailwind CSSの設定に変換
目的：アクセシビリティと拡張性を考慮したTailwind設定
js

// tailwind.config.js
module.exports = {
  theme: {
    fontSize: {
      base: ['1rem', { lineHeight: '1.75' }], // 16px, line-height 1.75em
      sm: ['0.875rem', { lineHeight: '1.5' }],
      lg: ['1.125rem', { lineHeight: '1.75' }],
      xl: ['1.25rem', { lineHeight: '1.75' }],
      '2xl': ['1.5rem', { lineHeight: '2' }],
    },
    borderRadius: {
      DEFAULT: '0.5em',
      lg: '1em',
      full: '9999px',
    },
    maxWidth: {
      content: '65ch',
    },
    spacing: {
      px: '1px',
      1: '0.25rem',
      2: '0.5rem',
      4: '1rem',
      6: '1.5rem',
      8: '2rem',
    },
  },
}

✅ 2. WordPressテーマ用のSCSS構成テンプレート
scss
// _variables.scss
$font-size-base: 1rem;
$line-height-base: 1.75em;

$border-radius-base: 0.5em;
$border-radius-large: 1em;

$max-width-content: 65ch;
$spacing-unit: 1rem;

// _mixins.scss
@mixin responsive-font($size, $line-height: 1.75em) {
  font-size: $size;
  line-height: $line-height;
}

// _base.scss
html {
  font-size: 100%; // ユーザー設定に準拠
}

body {
  font-family: sans-serif;
  font-size: $font-size-base;
  line-height: $line-height-base;
}

// _layout.scss
.container {
  max-width: $max-width-content;
  padding: $spacing-unit;
}

// _components.scss
.button {
  padding: 0.5em 1em;
  border-radius: $border-radius-base;
}


✅ 3. 「em」と「rem」の使い分けルール（表形式）
用途	                                    単位	                                        理由・補足
フォントサイズ	                            rem                                         	ユーザーのブラウザ設定に応じた拡大縮小に対応。アクセシビリティに適する。
行間（line-height）	                        em	                                            フォントサイズに比例して可読性が向上する。
インデント	                                em	                                            テキストのサイズに比例して自然な見た目になる。
ボーダー・ボーダー半径	                     em                                              ボタンなどにおいてテキストサイズに連動した調整がしやすい。
パディング・マージン	                    rem	                                             全体のレイアウトバランスをとりやすく、安定する。
アイコンサイズ・装飾	                    em	                                             親要素のテキストサイズに合わせて拡縮しやすい。
メディアクエリ・幅制限	                    px, min()                                    	デバイス幅に応じたレイアウト調整に便利。

