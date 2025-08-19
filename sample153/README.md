 Vite + Tailwind CSS v3 + PostCSS 「ヘッダー / メイン / フッター」をそれぞれモジュール化 スニペット 20250819

project/
├─ index.html
├─ src/
│   ├─ main.js        ← アプリ全体を組み立てる
│   ├─ header.js      ← ヘッダー生成モジュール
│   ├─ footer.js      ← フッター生成モジュール
│   ├─ cards.js       ← カード生成モジュール
│   └─ style.css      ← Tailwind のエントリーポイント
