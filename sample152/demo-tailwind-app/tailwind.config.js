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

