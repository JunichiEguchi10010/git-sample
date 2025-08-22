CSS Sass（Syntactically Awesome Stylesheets） セットアップ方法について 20250822 

2. セットアップ方法
✅ ① グローバルインストール（Node.js 環境）
Node.js をインストール（未導入なら Node.js公式
 から）。

ターミナルで以下を実行：
npm install -g sass

Sass ファイルをコンパイル：
sass input.scss output.css

→ input.scss を output.css に変換。

自動監視（Watch モード）
sass --watch input.scss output.css
保存のたびに自動コンパイルされます。

✅ ② プロジェクトローカルに導入
プロジェクト単位で管理したい場合：

npm init -y          # package.json を作成
npm install sass --save-dev

実行方法：
npx sass input.scss output.css
package.json の "scripts" に追加しておくと便利：

"scripts": {
  "build-css": "sass src/scss:dist/css",
  "watch-css": "sass --watch src/scss:dist/css"
}

npm run build-css → 一括ビルド
npm run watch-css → 保存時に自動ビルド

✅ ③ Vite / Webpack / Gulp などのビルド環境で利用

Vite: Sass はすぐ使える（追加設定ほぼ不要）。
Webpack: sass-loader + css-loader + style-loader が必要。
Gulp: gulp-sass を利用してタスク自動化。

例（Vite の場合）
npm create vite@latest my-project
cd my-project
npm install
npm install sass

style.scss を import するだけで使えます：
import './style.scss';

✅ ④ Ruby Sass（古い方法、非推奨）
昔は Ruby ベースの Sass が主流でしたが、現在は Dart Sass が公式サポート。
（2020年以降 Ruby Sass は廃止済み）

3. ディレクトリ構成（例）
Sass を使うときはファイルを分割するのが一般的です：

project/
├─ src/
│   ├─ scss/
│   │   ├─ _variables.scss
│   │   ├─ _mixins.scss
│   │   ├─ base.scss
│   │   └─ style.scss  ← メイン（@use や @import でまとめる）
└─ dist/
    └─ css/
        └─ style.css

4. 簡単な例

SCSS:

$main-color: #3a99c9;

body {
  font-family: sans-serif;
  background: #f9f9f9;

  h1 {
    color: $main-color;
  }
}


出力されるCSS:

body {
  font-family: sans-serif;
  background: #f9f9f9;
}
body h1 {
  color: #3a99c9;
}