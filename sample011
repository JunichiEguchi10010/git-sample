React.jsの基本的な使い方 20250401時点

1. React.jsの概要
React.jsは、JavaScriptを使ったフロントエンドのライブラリで、動的なウェブアプリケーションを簡単に作成するためのツールです。

特に「コンポーネント」という考え方を中心に構築されており、再利用可能なUI部品を作るのに適しています。

【コーディングの流れ】
HTMLに<div id="root"></div>を用意。
ReactでAppコンポーネントを作成。
ReactDOMを使って、Appをrootに描画。


2. 環境の準備
HTMLファイル: 基本的なHTML構造を用意します。

CSSファイル: スタイルを適用するためのCSSを準備。

JavaScriptファイル: React.jsを動かすためのスクリプトを記述します。

必要なスクリプトの読み込み
React.jsを使うために、以下の3つのスクリプトをHTMLに読み込みます。

React本体

ReactDOM（DOM操作用）

Babel（JSXをブラウザで解釈可能にするため）


3. Reactの基本的な構造
コンポーネントの作成:

Reactでは、UIを「コンポーネント」という単位で作成します。

コード例として、Appというコンポーネントを作成し、Hello Worldを表示するコードを記述します。

JavaScriptファイル
function App() {
  return <div>Hello World</div>;
}

DOMへのレンダリング:

ReactDOMを使って、作成したコンポーネントをHTMLの特定の要素に描画します。(20250401時点での最新の記述方法)

JavaScriptファイル
; React 17以前で推奨されている記述方法
const root = document.getElementById('root');
ReactDOM.render(<App />, root);

; React 18以降で推奨されている記述方法
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);



4. JSXの使用
JSX（JavaScript XML）は、JavaScriptの中にHTMLのような記述を埋め込むための構文です。
通常のJavaScriptでは書けないHTMLライクなコードを、ReactではJSXを使って記述します。

JavaScriptファイル
function App() {
  return (
    <div>
      <h1>Hello, JSX!</h1>
      <p>This is a JSX example.</p>
    </div>
  );
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);

HTMLライクな記述:<div> や <h1> など、HTMLに似た記法をJavaScript内で使えるのがJSXの特徴です。

JavaScriptの中に埋め込む:JavaScriptの関数 App 内でHTMLライクな記述を行い、UIを作成します。

1つの親要素が必要:JSXでは、複数の要素を返す際に必ず1つの親要素（この例では <div>）で包む必要があります。
また空の<></>を使うこともできます。

変数とJSXの埋め込み
JSXでは、JavaScriptの変数や式を {} を使って埋め込むことができます。

JavaScriptファイル
function Greeting(props) {
  const name = props.name;
  return <h1>Hello, {name}!</h1>;
}

const root = document.getElementById('root');
ReactDOM.render(<Greeting name="Junichi" />, root);

変数の埋め込み:{name} のように変数を埋め込むことで、動的に内容を変更できます。

コンポーネントへのプロパティ:<Greeting name="Junichi" /> のように、プロパティ（props）を渡してカスタマイズします。


JSXでの条件付きレンダリング
JSXは条件分岐を使って表示内容を変更することも可能です。

JavaScriptファイル
function StatusMessage(props) {
  return (
    <div>
      {props.isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please log in.</h1>}
    </div>
  );
}

const root = document.getElementById('root');
ReactDOM.render(<StatusMessage isLoggedIn={true} />, root);

{条件 ? 条件が真の場合 : 条件が偽の場合} のように三項演算子を使い、条件に応じた表示を実現します。


5. 注意点
開発用と本番用のスクリプト:
開発中はエラーが詳細に表示される「開発用スクリプト」を使用。
本番環境では軽量化された「本番用スクリプト」を使用する必要があります。

開発用スクリプト
開発環境で使用するスクリプトです。エラーが発生した際に詳細な情報を提供してくれます。
html
<!-- React本体 -->
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" crossorigin></script> development
<!-- ReactDOM -->
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" crossorigin></script> development
<!-- Babel -->
<script src="https://unpkg.com/@babel/standalone@7.24.0/babel.min.js" crossorigin></script>

本番用スクリプト
本番環境で使用するスクリプトです。コードが圧縮されているため、読み込み速度が向上し、パフォーマンスが向上します。

html
<!-- React本体 -->
<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" crossorigin></script> production
<!-- ReactDOM -->
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin></script> production
<!-- Babel -->
<script src="https://unpkg.com/@babel/standalone@7.24.0/babel.min.js" crossorigin></script>


; React.js入門！はじめの一歩。初心者向けにまずは基本的な読み込みと設定から！
; https://www.youtube.com/watch?v=yrRvPxmxu2s