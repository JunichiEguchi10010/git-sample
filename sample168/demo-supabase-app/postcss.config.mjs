// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};


// postcss.config.mjs

// PostCSS の設定ファイル
// Tailwind CSS や Autoprefixer などのプラグインを通じて、
// CSS を構文解析・変換するために使用されます。

// export default {
//   plugins: {
//     // Tailwind CSS 用の PostCSS プラグイン
//     "@tailwindcss/postcss": {},

//     // Autoprefixer プラグイン
//     autoprefixer: {},
//   },
// };

// ファイルの拡張子がmjsとなっているのは？
// 拡張子 .mjs は、ECMAScript モジュール（ESM）形式で JavaScript ファイルを記述していることを示します。
// これは Node.js や一部のブラウザ環境で、モジュールを明示的に扱うための形式です。

// 🔍 .mjs を使う理由と背景
// モジュールとして認識される Node.js は .mjs 拡張子を見ることで、そのファイルが ES モジュールであると判断します。
// これにより import / export 構文が使えるようになります。

// CommonJS (.js) との区別 Node.js では .jsファイルがデフォルトで CommonJS として扱われるため、
// ESM を使いたい場合は .mjs にするか、package.json に "type": "module" を明示する必要があります。

// 構成ファイルでも import/export を使いたいとき postcss.config.js を .mjs にすることで、export default を使って設定をモジュールとして書けるようになります。
// これは ESM 構文であり、module.exports = ... ではなく export default ... を使う形式です。