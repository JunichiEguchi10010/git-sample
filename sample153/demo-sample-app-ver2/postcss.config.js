// postcss.config.js
// PostCSSの設定ファイル（ES Modules形式）
// Tailwind CSSとAutoprefixerをプラグインとして使用
export default {
  plugins: {
    // Tailwind CSSのユーティリティクラスをPostCSSで処理
    tailwindcss: {},
    
    // Autoprefixerでベンダープレフィックスを自動付与（例：-webkit-など）
    autoprefixer: {},
  },
};

// ES Modules形式（推奨）
// export default {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };

// CommonJS形式
// module.exports = {
//     plugins: {
//       tailwindcss: {},
//       autoprefixer: {},
//     },
//   }
  