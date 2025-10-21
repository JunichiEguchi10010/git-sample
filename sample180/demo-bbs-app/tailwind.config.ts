// import twAnimate from "tw-animate-css";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [twAnimate],
};

// ✅ tw-animate-css は Tailwind のプラグインなので、@import ではなく plugins 配列に登録します。

// CommonJS形式（.js）
// const twAnimate = require("tw-animate-css");

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   plugins: [twAnimate],
// };
