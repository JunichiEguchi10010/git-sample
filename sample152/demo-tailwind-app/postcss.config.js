// Tailwind CSSとAutoprefixerをPostCSSで使用するための設定。
// Autoprefixerはベンダープレフィックスを自動で付与してくれる。
module.exports = {
  plugins: {
    tailwindcss: {},     // Tailwind CSSを有効化
    autoprefixer: {},    // Autoprefixerを有効化
  },
};


// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };

// export default {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }
