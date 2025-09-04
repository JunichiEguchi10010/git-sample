// App.tsx
// このファイルはアプリのメインコンポーネントです。
// Card コンポーネントを使ってサービス紹介を表示しています。
// import "./App.css"; → module.css化しています。

import { Card } from './components/Card';
import styles from "./App.module.css";

function App() {
  return (
      <div className={styles.container}>
      <h1>CSS Modules スニペット</h1>
      <p>React + Vite + CSS Modules で作ったコンポーネント例です。</p>
        <Card title="サービスA" content="高品質なWeb制作を提供します。" />
        <Card title="サービスB" content="スマホ対応・レスポンシブ設計。" />
        <Card title="サービスC" content="長期運用に強いWordPress構築。" />
      </div>
  );
}

export default App;