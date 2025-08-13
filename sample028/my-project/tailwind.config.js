/** @type {import('tailwindcss').Config} */
// 上記はTypeScriptやVSCodeの補完（IntelliSense）用の型注釈コメントです。

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// CommonJS の形式(昔のタイプ)

// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}"
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],

