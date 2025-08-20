/** @type {import('tailwindcss').Config} */
// Tailwind CSS の設定ファイル（型補完のためのJSDocを使用）
module.exports = {
  // TailwindがCSSクラスを生成する対象ファイルを指定
  content: [
    "./index.html",                         // HTMLファイルを対象にする
    "./src/**/*.{js,ts,jsx,tsx}",           // Viteのsrcディレクトリ内のJS/TS/JSX/TSXファイルを対象にする
  ],
  theme: {
    // デフォルトテーマの拡張設定
    extend: {
      // フォントファミリーのカスタマイズ
      fontFamily: {
        sans: ['"Noto Sans JP"', "Helvetica", "Arial", "sans-serif"], // 通常テキスト用
        heading: ['"Montserrat"', "sans-serif"],                       // 見出し用
      },
      // カスタムカラーの定義
      colors: {
        brand: {
          DEFAULT: "#4f46e5", // メインカラー（例：ボタンやリンク）
          light: "#6366f1",   // 明るめのバリエーション
          dark: "#4338ca",    // 暗めのバリエーション
        },
        accent: {
          DEFAULT: "#f97316", // アクセントカラー（例：強調表示）
          dark: "#ea580c",    // より濃いアクセント
        },
      },
    },
  },
  // Tailwindプラグインの設定（現在は未使用）
  plugins: [],
};

// content 配列は、Tailwindが使用されているクラスを検出するために重要です。
// これにより、未使用のCSSが削除され、最小限のスタイルが生成されます（パージ機能）。

// extend を使うことで、既存のテーマを上書きせずに追加・拡張できます。

// plugins に公式またはサードパーティ製のTailwindプラグイン（例：@tailwindcss/forms や typography）を
// 追加することができます。

// 元コード
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}", // Vite の src 内を対象にする
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['"Noto Sans JP"', "Helvetica", "Arial", "sans-serif"],
//         heading: ['"Montserrat"', "sans-serif"],
//       },
//       colors: {
//         brand: {
//           DEFAULT: "#4f46e5",
//           light: "#6366f1",
//           dark: "#4338ca",
//         },
//         accent: {
//           DEFAULT: "#f97316",
//           dark: "#ea580c",
//         },
//       },
//     },
//   },
//   plugins: [],
// };
