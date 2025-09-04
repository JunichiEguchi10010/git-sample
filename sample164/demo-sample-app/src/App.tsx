import { Card } from './components/Card';
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>CSS Modules 実務サンプル</h1>
      <p>React + Vite + CSS Modules で作ったコンポーネント例です。</p>
      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        <Card title="サービスA" content="高品質なWeb制作を提供します。" />
        <Card title="サービスB" content="スマホ対応・レスポンシブ設計。" />
        <Card title="サービスC" content="長期運用に強いWordPress構築。" />
      </div>
    </div>
  );
}

export default App;
