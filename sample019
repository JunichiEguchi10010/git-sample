Reactを使って、メニューを表示・非表示する方法 20250405


// useStateでクラスやスタイルを切り替え
import React, { useState } from "react";

const App = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="mask"></div>

      <header>
        <h1>React test</h1>
        <a href="#" onClick={handleClick}>メニューを開く</a>
      </header>

      <nav className={isActive ? "open" : "close"}>
        <a href="#">メニューを閉じる</a>
        <ul>
          {/* メニュー項目など */}
        </ul>
      </nav>
    </>
  );
};

export default App;



CDNを使ったHTML+Reactの書き方

CDN（Content Delivery Network）を使ってReactを読み込む場合は、import 文が使えないため、次のように グローバル変数としてのReact を前提とした書き方になります。
例:React + ReactDOM + Babel をCDNで読み込むシンプルなHTML
html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>React メニュー切り替え</title>
  <style>
    .mask {
      display: none;
    }
    .mask.is-active {
      display: block;
      position: fixed;
      background: rgba(0, 0, 0, 0.5);
      top: 0; left: 0; right: 0; bottom: 0;
    }
    nav.close {
      display: none;
    }
    nav.open {
      display: block;
    }
  </style>
</head>
<body>
  <div id="root"></div>

  <!-- React, ReactDOM, Babel CDN -->
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <!-- Reactコード本体 -->
  <script type="text/babel">
    const App = () => {
      const [isActive, setIsActive] = React.useState(false);

      const handleClick = () => {
        setIsActive(!isActive);
      };

      return (
        <>
          <div className={`mask ${isActive ? 'is-active' : ''}`}></div>

          <header>
            <h1>React test</h1>
            <button onClick={handleClick}>メニューを開く</button>
          </header>

          <nav className={isActive ? 'open' : 'close'}>
            <a className="close" href="#" onClick={(e) => { e.preventDefault(); handleClick(); }}>
              メニューを閉じる
            </a>
            <ul>
              <li>メニュー1</li>
              <li>メニュー2</li>
              <li>メニュー3</li>
            </ul>
          </nav>
        </>
      );
    };

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>
💡ポイントまとめ
    項目	            内容
Reactの読み込み	    <script> タグでCDNから読み込む
JSXの使用	        type="text/babel" にする必要あり
import文	        使えない（グローバルの React, ReactDOM を使う）
スタイル	        <style> タグでHTMLに直接書いてOK
イベント処理	    <button> や <a onClick={...}> を使用


Reactを使って、メニューを表示・非表示する方法
https://www.youtube.com/watch?v=B8SYcpgqro8&t=8s


想定される追加機能
外クリックで閉じる	実用性が高い
アニメーション	見た目が自然に
ハンバーガーメニュー化	モバイル対応
動的レンダリング	実務でよく使う
グローバル状態管理	複数メニュー対応など



外側クリックでメニューを閉じる
ESCキーで閉じる機能
setTimeout を使ってアニメーション付きで閉じる
フェードイン/アウト（CSS Transition）

必要な技術と目的
技術	                                役割
useRef	                            メニュー要素への参照を取得
useEffect	                        コンポーネントマウント時にイベントを登録／クリーンアップ
document.addEventListener("click")	外側のクリック検知

ポイント
ref.current.contains(e.target) は、「クリックされた要素がメニューの中かどうか」を判定。
useEffect の中でイベント登録→クリーンアップするのがポイント。
button や a のクリックでトグル表示も可能。

import React, { useState, useRef, useEffect } from "react";
import "./App.css"; // CSSは別ファイルで定義（下に書きます）

const App = () => {
  const [isActive, setIsActive] = useState(false); // 表示フラグ
  const [isClosing, setIsClosing] = useState(false); // 閉じる途中フラグ
  const menuRef = useRef(null);

  const openMenu = () => {
    setIsActive(true);
    setIsClosing(false);
  };

  const closeMenu = () => {
    setIsClosing(true); // アニメーション開始
    setTimeout(() => {
      setIsActive(false); // 実際に閉じる
      setIsClosing(false);
    }, 300); // CSSのtransition時間と合わせる
  };

  const toggleMenu = () => {
    if (isActive) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // 外側クリック検知
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isActive && menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isActive]);

  // ESCキー検知
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isActive) {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isActive]);

  return (
    <>
      <header>
        <h1>React Menu Demo</h1>
        <button onClick={toggleMenu}>メニューを{isActive ? "閉じる" : "開く"}</button>
      </header>

      <div className={`mask ${isActive ? "is-active" : ""}`}></div>

      <nav
        ref={menuRef}
        className={`menu ${isActive ? "open" : ""} ${isClosing ? "closing" : ""}`}
      >
        <a href="#" onClick={(e) => { e.preventDefault(); closeMenu(); }}>
          × 閉じる
        </a>
        <ul>
          <li>メニュー1</li>
          <li>メニュー2</li>
          <li>メニュー3</li>
        </ul>
      </nav>
    </>
  );
};

export default App;



CSS（App.cssに保存）
.mask {
  display: none;
}

.mask.is-active {
  display: block;
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
}

/* メニューの基本スタイル */
.menu {
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.3s ease;
  pointer-events: none;
  position: absolute;
  top: 60px;
  left: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.menu.open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.menu.closing {
  opacity: 0;
  transform: translateY(-20px);
}

メニュー外クリック → 自動で閉じる
ESCキー → メニュー閉じる
メニューが開閉時に「ふわっ」とアニメーション