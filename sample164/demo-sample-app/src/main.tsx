// Reactライブラリをインポート（UI構築のための基本ツール）
import React from 'react';

// ReactDOMライブラリから createRoot をインポート（React 18以降の新しいレンダリングAPI）
import ReactDOM from 'react-dom/client';

// アプリケーションのメインコンポーネントをインポート
import App from './App';

// HTMLのid="root"要素を取得し、Reactのレンダリング対象に設定
const rootElement = document.getElementById('root')!;

// createRootでReactのルートを作成し、アプリケーションを描画
ReactDOM.createRoot(rootElement).render(
  // StrictModeは開発時に潜在的な問題を検出するためのラッパー（本番環境では影響なし）
  <React.StrictMode>
    {/* アプリケーションのメインコンポーネントを描画 */}
    <App />
  </React.StrictMode>
);

// 元コード：
// import ReactDOM from 'react-dom/client';
// import App from './App';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
