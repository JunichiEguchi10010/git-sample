// postcss.config.js
// export default {
//   plugins: [
//     require('@tailwindcss/postcss'),
//     require('autoprefixer'),
//   ],
// }

// CommonJSの記述方法(推奨:昔の方法)
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
