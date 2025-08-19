// Tailwind CSSとAutoprefixerをPostCSSで使用するための設定。
// Autoprefixerはベンダープレフィックスを自動で付与してくれる。
module.exports = {
  plugins: {
    tailwindcss: {},     // Tailwind CSSを有効化
    autoprefixer: {},    // Autoprefixerを有効化
  },
};

// CommonJS形式
// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };

// ES Modules (ESM)形式
// export default {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }

// ✅ なぜCommonJSでOKなのか？
// PostCSS自体がNode.jsベースで動作しており、設定ファイルはNode.jsが読み込むため、module.exportsが標準的。
// Viteは内部的にPostCSSを使う際、PostCSSの仕様に従って設定ファイルを読み込むので、CommonJS形式で書かれていても正しく認識されます。
// 実際、Tailwind CSS公式ドキュメントでも、postcss.config.jsはCommonJS形式で記述されています。

// 🧠 例外はある？
// もしプロジェクト全体をES Modules形式（.mjs拡張子やtype: "module"をpackage.jsonに指定）で統一している場合は、PostCSSの設定もESM形式にしたくなるかもしれません。
// ただし、PostCSSはESM形式の設定ファイルを公式にはサポートしていません（2025年現在）。そのため、CommonJS形式が最も安全で確実です。

// 🔚 結論
// ✔️ Viteを使っていても、postcss.config.jsはこのようにCommonJS形式で書いてOKです：

// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };