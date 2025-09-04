Vite + React + TypeScript + CSS Modules の構成 20250904

demo-sample-app/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── global.css
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   ├── Card.tsx
│   │   └── Card.module.css

✅ 実務対応ポイント
・CSS Modules を適用し、クラス名の競合を防止。
・グローバルCSS はリセット・共通レイアウトのみ。
・コンポーネント単位 に Button / Card を分離し、再利用性を高めた。
・アクセシビリティ考慮：Button に disabled サポート。
・デザイン面：ホバー時のアニメーション、影、丸みを追加し「実務でそのまま使える見栄え」。