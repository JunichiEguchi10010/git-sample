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


# React + Vite + CSS Modules 実務テンプレート

このテンプレートは、初心者でも安心して使えるように設計された React + Vite プロジェクトです。
CSS Modules を活用し、保守性と再利用性を高めた構成になっています。

## 📦 セットアップ手順

```bash
git clone https://github.com/your-repo/demo-sample-app.git
cd demo-sample-app
npm install
npm run dev

🧩 主な技術構成
React: UI構築のためのライブラリ
Vite: 高速な開発環境
CSS Modules: スタイルのスコープ管理
TypeScript: 型安全な開発

🛠 実装ポイント
1. CSS Modules の活用
App.module.css を使って、クラス名の衝突を防ぎます。

tsx
import styles from "./App.module.css";
<div className={styles.container}>

2. インラインスタイルの排除
スタイルは CSS にまとめて、保守性を向上させています。

css
/* App.module.css */
.grid {
  display: grid;
  gap: 20px;
  margin-top: 20px;
}

3. props の型定義
Card コンポーネントには明示的な型定義を行い、安心して使えるようにしています。

tsx
type CardProps = {
  title: string;
  content: string;
};