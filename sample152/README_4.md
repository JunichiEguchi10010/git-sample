PostCSS 環境構築 20250817

PostCSS公式サイト
https://postcss.org/

CSSを柔軟に拡張・変換するためのJavaScriptベースのツールチェーンです。 
SassやLessのような「すでに機能が詰め込まれたCSSプリプロセッサ」とは違い、PostCSSは「必要な機能だけを選んで使えるプラグインランナー」です。

🔌 Sassとの違い：カスタムPC vs オールインワンPC
比較	    Sass	                               PostCSS
機能	    変数・ネスト・関数などが最初から搭載	すべてプラグインで追加
柔軟性	    限定的（Sassの仕様に従う）	           無限（自作プラグインも可能）
処理速度	やや重め	                            高速
拡張性	    低め	                              高い（200以上のプラグイン）
PostCSSは「自分仕様にカスタマイズできるPC」、Sassは「最初から機能が揃ったノートPC」に例えられます。

🧩 PostCSSでできること（プラグイン例）
プラグイン	            機能
autoprefixer	    ベンダープレフィックス自動付与（例：-webkit-, -moz-）
cssnano	            CSSを圧縮して軽量化
postcss-nested	    SCSSのようなネスト構文を可能にする
postcss-import	    @import を統合して1ファイルにまとめる(複数のCSSファイルを1つに統合)
postcss-preset-env	最新CSS構文を古いブラウザ向けに変換
🟥 tailwindcss	    ユーティリティCSSフレームワーク（PostCSSベース）

🛠️ 実際の使い方（例）
1. 設定ファイル postcss.config.js
js
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('cssnano')({ preset: 'default' }),
  ],
};
2. ネスト構文の例
css
/* PostCSS記述 */
.footer {
  padding: 20px;
  .logo {
    width: 100px;
  }
}

/* 変換後のCSS */
.footer {
  padding: 20px;
}
.footer .logo {
  width: 100px;
}

ネスト構文 → 通常のCSSに展開
display: flex → -webkit-などのプレフィックスが自動付与
ファイル全体が圧縮されて軽量化

🌱 補足
Tailwind CSSはPostCSSプラグインとして動作しているので、Vite + Tailwind環境ではPostCSSがすでに活躍中です
必要な機能だけを選べるので、小規模案件でも無駄なく最適化可能
✅ vite.config.js に postcss.config.js を置くだけで自動で読み込まれるので、設定の再現性と保守性が高い

【Tailwind CSS #3】4つのインストール方法の紹介。オススメはPostCSSのプラグインとして使う方法。
https://www.youtube.com/watch?v=mzRxqknA9Jg