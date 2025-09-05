// Cardコンポーネントをインポート（サービス紹介用の再利用可能なUI部品）
import { Card } from './components/Card';

// CSS Modulesをインポート（クラス名の衝突を防ぎ、スコープを限定）
import styles from "./App.module.css";

// アプリケーションのメインコンポーネント
function App() {
  return (
    // スタイルを適用したコンテナ要素（CSS Modulesで定義されたクラスを使用）
    <div className={styles.container}>
      {/* アプリケーションのタイトル */}
      <h1>CSS Modules スニペット</h1>

      {/* 説明文：使用技術の概要を表示 */}
      <p>React + Vite + CSS Modules で作ったコンポーネント例です。</p>

      {/* サービス紹介カードを3つ表示（Cardコンポーネントにpropsを渡して動的に描画） */}
      <Card title="サービスA" content="高品質なWeb制作を提供します。" />
      <Card title="サービスB" content="スマホ対応・レスポンシブ設計。" />
      <Card title="サービスC" content="長期運用に強いWordPress構築。" />
    </div>
  );
}

// Appコンポーネントを他ファイルで使えるようにエクスポート
export default App;


// App.tsx
// このファイルはアプリのメインコンポーネントです。
// Card コンポーネントを使ってサービス紹介を表示しています。
// import "./App.css"; → module.css化しています。

// 元コード
// import { Card } from './components/Card';
// import styles from "./App.module.css";

// function App() {
//   return (
//       <div className={styles.container}>
//       <h1>CSS Modules スニペット</h1>
//       <p>React + Vite + CSS Modules で作ったコンポーネント例です。</p>
//         <Card title="サービスA" content="高品質なWeb制作を提供します。" />
//         <Card title="サービスB" content="スマホ対応・レスポンシブ設計。" />
//         <Card title="サービスC" content="長期運用に強いWordPress構築。" />
//       </div>
//   );
// }

// export default App;