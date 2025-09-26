// tailwind.config.js (v4)
// Tailwind CSS の設定ファイル。
// v4 では PostCSS 経由ではなく、直接このファイルで設定を行う。

module.exports = {
  // Tailwind がクラス名を抽出する対象ファイルのパスを指定。
  // これにより、未使用のCSSが削除され、最小限のスタイルだけが生成される。
  content: [
    // アプリケーションの主要なページやルーティング関連のファイル群
    "./app/**/*.{js,ts,jsx,tsx,mdx}",

    // 再利用可能な UI コンポーネント群
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // Tailwind の公式またはカスタムプラグインを追加する場所。
  // v4では `tailwindcss/plugin` 経由で関数型プラグインを定義可能。
  plugins: [],
};

// 元コード
// tailwind.config.js (v4)
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   plugins: [],
// };
