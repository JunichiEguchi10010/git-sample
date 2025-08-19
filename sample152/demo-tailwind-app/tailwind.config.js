/** @type {import('tailwindcss').Config} */
// Tailwind CSSの設定ファイル。型情報を付けることで補完が効くようになる。
module.exports = {
  // Tailwindが使用されるファイルを指定。未使用のCSSを削除するために重要。
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // デフォルトテーマを拡張するための設定。ここにカスタムカラーやフォントなどを追加可能。
    extend: {},
  },
  // Tailwindのプラグインを追加する場所。今は空。
  plugins: [],
};


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }



// ✅ なぜCommonJSでOKなのか？
// （tailwind.config.js）は CommonJS形式でも問題なく動作します。
// ただし、ES Modules形式（export default）もサポートされているので、どちらでも動きます。
// 違いと選び方を整理してみましょう👇

// ✅ Vite × Tailwind CSS：どちらの形式でもOK
// 書き方	                              モジュール形式	              使用例	                          備考
// module.exports = {...}	CommonJS	tailwind.config.js	Node.jsベースのツールで広く使われている形式。   安定性あり。
// export default {...}	ES Modules	tailwind.config.mjs または type: "module" を package.json に指定	Viteやモダンな環境に合わせた形式。ファイル拡張子や設定が必要。

// 🧠 ViteでES Modules形式を使うには？
// もし export default を使いたい場合は、以下のいずれかが必要です：
// tailwind.config.mjs にする（.jsではなく .mjs）
// package.json に "type": "module" を追加する

// json
// {
//   "type": "module"
// }
// これをしないと、Node.jsはES Modulesとして認識しないため、エラーになる可能性があります。

// 🔚 結論
// Viteを使っていても、tailwind.config.js を CommonJS形式（module.exports）で書くのが最も一般的で安全です。
// ES Modules形式を使いたい場合は、.mjsにするか、package.jsonでモジュールタイプを指定しましょう。