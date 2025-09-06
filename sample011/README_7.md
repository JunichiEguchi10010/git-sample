React「ラップ系」や「レイアウト系」のコンポーネント 20250907

構造や見た目の“枠”を提供するコンポーネントの分類です。
中身のロジックやデータには関与せず、どう見せるか・どう配置するかに特化しています。

🧣 ラップ系コンポーネントとは？

✅ 定義
中身を包むだけのコンポーネント
見た目やスタイルを統一するために使う
childrenを使って、中身は自由に差し替え可能

🧱 例：Boxコンポーネント

jsx
function Box({ children }) {
  return <div style={{ border: '1px solid gray', padding: '10px' }}>{children}</div>;
}

// 使用例
📁 ディレクトリ構成（例）
コード
src/
├── components/
│   └── Box.jsx
├── App.jsx
└── main.jsx

🧱 Box.jsx（ラップ系コンポーネント）

jsx
// src/components/Box.jsx
import React from 'react';

function Box({ children }) {
  return (
    <div style={{ border: '1px solid gray', padding: '10px', borderRadius: '4px' }}>
      {children}
    </div>
  );
}

export default Box;


🧩 App.jsx（使用例）
jsx
// src/App.jsx
import React from 'react';
import Box from './components/Box';

function App() {
  return (
    <div style={{ margin: '20px' }}>
      <Box>
        <h2>タイトル</h2>
        <p>これはBoxの中に表示される本文です。</p>
      </Box>
    </div>
  );
}

export default App;

Boxをインポートして使用
childrenとしてh2とpを渡している

🚀 main.jsx（エントリーポイント）
jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
Reactアプリの起動点

Appをレンダリング

childrenを使って中身を開放
スタイル付きの枠を提供するラップ系コンポーネント
→ 「見た目の枠（＝UIの構造）を統一・抽象化するため」

要素	            役割	    利点
<div style={...}>  見た目の枠	情報のまとまりを視覚化
Boxコンポーネント	枠の抽象化	 利用性・統一感
children	       中身の自由	構造を開放し、意味を差し込める



🧭 レイアウト系コンポーネントとは？

✅ 定義
画面の配置や構造を決めるコンポーネント
ヘッダー、サイドバー、メインなどの配置ルールを定義
childrenやpropsで中身を差し込む

構造の見通し・再利用性を意識しています。

📁 ディレクトリ構成（例）
コード
src/
├── components/
│   └── PageLayout.jsx
├── App.jsx
└── main.jsx

🧱 PageLayout.jsx（レイアウト系コンポーネント）

// src/components/PageLayout.jsx
import React from 'react';
import './PageLayout.css';

<!-- 
/**
 * PageLayout コンポーネント
 * 
 * 画面全体のレイアウト構造を定義するラッパー。
 * ヘッダー、サイドバー、メインコンテンツの3領域を持ち、
 * 各領域の中身は props で柔軟に差し込むことができる。
 * 
 * props:
 * - header: JSX要素（ヘッダー領域に表示）
 * - sidebar: JSX要素（サイドバー領域に表示）
 * - children: JSX要素（メイン領域に表示）
 * 
 * 使用例:
 * <PageLayout
 *   header={<h1>タイトル</h1>}
 *   sidebar={<nav>メニュー</nav>}
 * >
 *   <p>メインコンテンツ</p>
 * </PageLayout>
 */ -->

function PageLayout({ header, sidebar, children }) {
  return (
    <div className="page-layout">
      <header className="page-header">{header}</header>
      <div className="page-body">
        <aside className="page-sidebar">{sidebar}</aside>
        <main className="page-main">{children}</main>
      </div>
    </div>
  );
}

export default PageLayout;

export default PageLayout;
header, sidebar, childrenをそれぞれ受け取り、画面構造を定義

スタイルはCSSで分離

🧩 App.jsx（使用例）
jsx
// src/App.jsx
import React from 'react';
import PageLayout from './components/PageLayout';

function App() {
  return (
    <PageLayout
      header={<h1>マイページ</h1>}
      sidebar={
        <ul>
          <li>ホーム</li>
          <li>プロフィール</li>
          <li>設定</li>
        </ul>
      }
    >
      <p>ここがメインコンテンツです。</p>
    </PageLayout>
  );
}

export default App;
headerとsidebarはpropsで制御

childrenはメインコンテンツとして開放

🚀 main.jsx（エントリーポイント）
jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
React 18以降の構文（createRoot）を使用

Appをルート要素にレンダリング

🧠 補足
PageLayoutは構造の「型」を提供
propsで制御、childrenで中身を開放
初心者にも「画面の構造がどうできているか」が視覚的に伝わる

headerとsidebarはpropsで制御
childrenはメインコンテンツとして開放
構造のテンプレート化＋中身の柔軟性が両立できる

🧠 設計思想
ラップ系は、構造を抽象化して再利用性を高めるための道具
レイアウト系は、教育テンプレートやライフ設計図の構造を定義するのに最適
childrenによって構造を開放しつつ、propsで制御可能な部分を明示できる

✨ まとめ
種類	            目的	            使い方	                例
ラップ系	    見た目の枠を提供	childrenで中身を自由に	<Box>{...}</Box>
レイアウト系	画面構造を定義	    props＋childrenで配置	<PageLayout header={...}>{...}</PageLayout>