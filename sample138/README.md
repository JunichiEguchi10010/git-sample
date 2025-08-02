CSS変数（カスタムプロパティ）スニペット 20250802

🌱 CSS変数とは？
CSS変数（カスタムプロパティ）は --変数名 の形で定義し、 var(--変数名) で呼び出すものです。主なメリット：
一括管理できる（全ページに統一感）
メンテナンス性が高い（テーマ変更などが簡単）
レスポンシブやメディアクエリとも連携可能

ほとんどの主要ブラウザでCSS変数（カスタムプロパティ）は完全に対応済み、 
ただしInternet Explorer（IE11以前）では未対応。


🧱 CSS変数の基本構文
1. 🔧 変数の定義（--変数名: 値;）
css
:root {
  --main-color: #3498db;
  --font-size-base: 16px;
}
:root はHTML全体に適用されるセレクタで、グローバル変数の定義場所としてよく使われます。
🟥 変数名は -- で始める必要があります。

2. 🎯 変数の呼び出し（var(--変数名)）
css
body {
  color: var(--main-color);
  font-size: var(--font-size-base);
}
var() 関数を使って、定義した変数を呼び出します。

どのプロパティの値にも使えるので、色・サイズ・余白・アニメーション時間など幅広く活用できます。

🛟 フォールバック（予備値）の指定方法
変数が未定義だった場合に備えて、代替値（フォールバック）を指定することもできます：

css
color: var(--text-color, #333);
→ --text-color が未定義なら #333 が使われます。

🧠 Tips
UI評価ロジックや通知画面のスタイルにも、状態別変数（例：--color-success, --color-error）を使うと保守性が高まります。

:root にまとめて定義 → コンポーネントごとに上書き → メディアクエリで調整、という流れが拡張性◎です。

🎨 よく使われるCSS変数のカテゴリとプロパティ

1. 🖍️ カラー関連
css
--color-primary        /* 主に使うアクセントカラー（例：ボタンなど） */
--color-secondary      /* 補助的なカラー */
--color-bg             /* 背景色 */
--color-text           /* 通常のテキスト色 */
--color-text-muted     /* 補足テキストやラベルの薄い色 */
--color-border         /* 境界線の色 */
--color-link           /* リンク文字色 */
--color-error          /* エラーメッセージなどの警告色 */

2. 📐 余白・スペーシング関連
css
--space-xs     /* 極小余白（例：0.25rem） */
--space-sm     /* 小余白（例：0.5rem） */
--space-md     /* 中余白（例：1rem） */
--space-lg     /* 大余白（例：2rem） */
--space-xl     /* 特大余白（例：4rem） */

3. 🔠 フォントサイズ関連
css
--font-size-base     /* 通常の本文サイズ */
--font-size-sm       /* 小さめの文字（例：補足） */
--font-size-lg       /* 見出しや強調テキスト */
--font-size-xl       /* タイトルやヒーローテキスト */

4. 🔣 フォント・タイポグラフィ
css
--font-family-base     /* 本文フォント */
--font-family-heading  /* 見出し用フォント（必要に応じて） */
--line-height          /* 行間 */
--font-weight-normal   /* 通常ウェイト */
--font-weight-bold     /* 太字ウェイト */

5. 🧱 コンポーネントサイズ・レイアウト関連
css
--container-width      /* 最大コンテンツ幅（例：1200px） */
--border-radius        /* 角丸のサイズ（例：0.25rem） */
--box-shadow           /* シャドウ（装飾） */
--transition-time      /* アニメーションの長さ（例：0.3s） */

🧬 状態管理・UIフィードバック系
css
--color-success       /* 成功メッセージや通知の色 */
--color-warning       /* 注意喚起の色（例：黄色系） */
--color-info          /* 情報メッセージの色（例：青系） */
--color-disabled      /* 非アクティブ状態の色（例：グレー） */
--opacity-disabled    /* 非アクティブ要素の透明度（例：0.5） */
--cursor-disabled     /* 無効状態のカーソル（例：not-allowed） */

🌗 テーマ切替・ダークモード対応
css
--theme-bg-light      /* ライトモード背景色 */
--theme-bg-dark       /* ダークモード背景色 */
--theme-text-light    /* ライトモード文字色 */
--theme-text-dark     /* ダークモード文字色 */
--theme-border-color  /* 境界線の色（モードに応じて切替） */
※ body.dark-mode などのクラスで上書きすることで、モード切替が可能です。

🧭 レスポンシブ・ブレークポイント関連
css
--breakpoint-xs       /* 例：0px */
--breakpoint-sm       /* 例：576px */
--breakpoint-md       /* 例：768px */
--breakpoint-lg       /* 例：992px */
--breakpoint-xl       /* 例：1200px */
※ メディアクエリ内で min-width: var(--breakpoint-md) のように使えます。

🎞️ アニメーション・トランジション制御
css
--easing-standard     /* 例：ease-in-out */
--easing-snappy       /* 例：cubic-bezier(0.4, 0, 0.2, 1) */
--animation-duration  /* 例：0.3s */
--animation-delay     /* 例：0.1s */
--animation-curve     /* カスタムイージング関数 */
🧑‍🦯 アクセシビリティ・視認性向上
css
--focus-ring-color    /* フォーカス時のアウトライン色 */
--focus-ring-width    /* フォーカスリングの太さ（例：2px） */
--high-contrast-bg    /* 高コントラストモード用背景色 */
--high-contrast-text  /* 高コントラストモード用文字色 */
🧩 コンポーネント設計向け（細かい調整）
css
--card-padding        /* カード内余白 */
--card-gap            /* カード内要素の間隔 */
--modal-overlay-color /* モーダルの背景オーバーレイ色 */
--z-index-modal       /* モーダルの重なり順（例：1000） */
--z-index-tooltip     /* ツールチップの重なり順（例：2000） */


CSS変数の上級テクニック
1. 🏗️ 階層構造とスコープの使い分け
css
:root {
  --color-primary: #3498db;
}

.card {
  --card-bg: var(--color-primary);
  background-color: var(--card-bg);
}

.card.featured {
  --card-bg: #f0f8ff; /* ローカル変数で上書き */
}
:root でグローバル定義 → コンポーネント内でローカル変数に再定義
状態（.featuredなど）に応じて変数を上書きできる

2. 🧮 calc()との組み合わせで動的な値を生成
css
:root {
  --base-size: 1rem;
  --scale: 1.5;
  --scaled-size: calc(var(--base-size) * var(--scale));
}

h1 {
  font-size: var(--scaled-size);
}
変数同士の演算が可能 → レスポンシブやスケーラブルな設計に◎

3. 🎛️ 状態別スタイルの変数上書き（hover, active, disabled）
css
.button {
  --btn-bg: #3498db;
  background-color: var(--btn-bg);
}

.button:hover {
  --btn-bg: #2980b9;
}

.button:disabled {
  --btn-bg: #ccc;
}
状態に応じて変数を変更 → スタイルの一元管理が可能

4. 🧩 コンポーネント設計との連携
css
.card {
  --padding: 1rem;
  padding: var(--padding);
}

.card.compact {
  --padding: 0.5rem;
}
コンポーネントのバリエーションに応じて変数を切り替えられる

5. 🧪 フォールバック値の活用
css
color: var(--text-color, #333);
未定義時の安全策として、予備値を指定できる

6. 🧵 JavaScriptとの連携
js
document.documentElement.style.setProperty('--main-color', '#e74c3c');
JSから動的に変数を変更 → テーマ切替やユーザー操作に対応可能

🟥 このCSS変数＋calc()を使った書き方の「便利さ」は、通常のCSSとの違いを整理すると以下のようになります 👇

🧠 通常のCSSとの違いと便利な点
1. 🔧 一括管理・保守性の向上
通常のCSSでは、h1 { font-size: 2rem; } のように固定値を書くと、変更するたびに全箇所を修正する必要があります。

CSS変数を使えば、--scale や --base-size を変えるだけで、関連するすべてのフォントサイズが一括で変更可能！

2. 📐 動的な計算が可能（calc()）
var() だけだと「単純な値の呼び出し」ですが、calc() と組み合わせることで → 「基準値 × スケール値」などの演算が可能
これにより、柔軟なサイズ設計や比率調整がラクにできます。

3. 📱 レスポンシブ対応がしやすくなる
css
@media (min-width: 768px) {
  :root {
    --scale: 2;
  }
}
→ メディアクエリ内で変数を上書きするだけで、フォントサイズや余白の調整が可能に。

4. 🎨 コンポーネント単位のカスタマイズが簡単に
css
.card.large {
  --scale: 1.75;
}
→ 個別の要素や状態に応じて --scale だけを変えることで、粒度の細かいデザイン変更が可能。

5. 🧪 変数同士の組み合わせで設計の抽象化ができる
css
--heading-size: calc(var(--base-size) * var(--heading-scale));
→ 複数の変数を使って意味づけできるので、設計思想やロジックがより明確に表現される。

🔍 実務での活用例
通常のCSS	CSS変数＋calc()での改善点
font-size: 32px;	font-size: calc(var(--base-size) * var(--scale));
手動で全ファイル修正	変数定義1箇所だけで一括反映
モバイル対応に別スタイルが必要	メディアクエリで変数切り替えだけでOK