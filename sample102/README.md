WebDesign html css　javascript react ローディングアニメーション 20250611

✅CSSアニメーション
手軽さ: シンプルなローディングアニメーションなら、CSSだけで実装可能。

具体的な方法: @keyframes を使って transform や opacity を制御。

例:

css
@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading {
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top: 5px solid #333;
  border-radius: 50%;
  animation: spinner 1s linear infinite;
}


✅JavaScriptを使ったアニメーション(ホームページ制作向け)
柔軟性: イベントに応じた制御が可能（例: ローディング完了時にフェードアウト）。

具体的な方法: setInterval や requestAnimationFrame を利用してアニメーション。

例:

javascript
const loader = document.querySelector('.loading');
setTimeout(() => {
  loader.style.opacity = '0';
  loader.style.transition = 'opacity 0.5s';
}, 3000);


✅SVG & Canvasを使ったアニメーション
精密なデザイン: 高度なアニメーションが可能で、軽量。

具体的な方法: stroke-dasharray や stroke-dashoffset を使って動きを作成。

例:

html
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="#333" stroke-width="5" fill="none"
          stroke-dasharray="251.2" stroke-dashoffset="251.2">
    <animate attributeName="stroke-dashoffset" from="251.2" to="0" dur="1.5s" repeatCount="indefinite"/>
  </circle>
</svg>


✅Reactでローディングアニメーションを作る方法

🟡1. CSSのみで実装
メリット: 追加のライブラリなしで軽量なアニメーションを作れる方法:
@keyframes を利用してCSSで制御し、コンポーネントに適用

例: スピナー

jsx
import React from "react";
import "./Spinner.css"; // CSSファイルを読み込む

const Spinner = () => {
  return <div className="spinner"></div>;
};

export default Spinner;
css
/* Spinner.css */
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top: 5px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

🟡2. useStateで状態管理
メリット: ローディング状態を制御できる 方法: useState を使い、データ取得時に表示

例: フェッチ時のローディング

jsx
import React, { useState, useEffect } from "react";

const DataLoader = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData("データ取得完了");
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      {loading ? <div className="spinner"></div> : <p>{data}</p>}
    </div>
  );
};

export default DataLoader;

🟡3. ライブラリを使う（React Spinners）
メリット: すぐに使えるアニメーションが豊富 方法: react-spinners ライブラリを利用

インストール
npm install react-spinners
使用例

jsx
import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return <ClipLoader color="#333" loading={true} size={50} />;
};

export default Loader;




✅画像やアイコンを使ったローディングスピナーを作成する方法。

1. CSSで画像を回転させる
方法: transform: rotate() を使って画像をスピナーのように回転させる。

html
<img src="spinner.png" alt="Loading" class="loading-spinner">
css
.loading-spinner {
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
メリット: シンプルで軽量、どんな画像でもスピナーとして使える。


2. SVGアイコンをアニメーション
方法: stroke-dasharray を使ってSVGアイコンを動かす。

html
<svg width="50" height="50" viewBox="0 0 50 50">
  <circle cx="25" cy="25" r="20" stroke="#333" stroke-width="4" fill="none"
          stroke-dasharray="126" stroke-dashoffset="0">
    <animate attributeName="stroke-dashoffset" from="126" to="0" dur="1s" repeatCount="indefinite"/>
  </circle>
</svg>
メリット: ベクターなので高解像度でも綺麗に表示される。


3. JavaScriptでGIFやアイコンを制御
方法: setTimeout() を使ってローディング完了後に非表示にする。

html
<img src="loading.gif" alt="Loading" id="loader">
javascript
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 3000);
});
メリット: GIFアニメーションをそのまま使えるので簡単。


【頻出Webデザイン】シンプルなローディングアニメーションを作ろう
https://www.youtube.com/watch?v=b31CTSRFyKA

初心者でも無理なく作れるローディング時のアニメーション【keyframes, animation, rotate, style】
https://www.youtube.com/watch?v=O6S33mebHaA
