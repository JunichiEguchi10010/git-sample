import { defineConfig } from "vite";

// Viteの設定ファイル。defineConfigを使うことで型補完が効く。
export default defineConfig({
  server: {
    // 開発サーバーのポート番号を指定。デフォルトは3000だが、ここでは5173に変更。
    port: 5173,
  },
});

// vite.config.js は CommonJS形式（module.exports）でも、ESM形式（export default）でも書けますが、
// Vite公式では ESM形式（export default defineConfig({...})）が推奨されています。
// TypeScriptで書く場合は vite.config.ts にして、型補完を活かすこともできます。
// TailwindやPostCSSの設定ファイルも同じくルートに置くのが一般的です。