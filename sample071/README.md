🔰React入門 概要まとめ 20250517

Reactで簡単なアプリ（ToDoリスト）を作る方法


💡Reactとは？
React（リアクト）は、Facebookが開発したJavaScriptのライブラリです。
特に、ユーザーインターフェース（UI）を効率よく作るためのツールとして広く使われています。

特徴
正確には「フレームワーク」ではなく「ライブラリ」

UIを構成する部品（＝コンポーネント）を組み合わせて画面を作る

複雑なDOM操作（HTMLの要素の変更）を簡単に管理できる

✅ Reactを使うメリット
コンポーネントベース開発
画面をパーツに分けて管理できる（例：ヘッダー、サイドバー、投稿欄など）

JSX（JavaScript + HTML風の構文）
JavaScriptの中にHTMLのような記述ができるため、直感的に開発可能。

Props・Stateの仕組み
値の受け渡しや状態の管理が簡単にできる。

💻 開発環境の準備ステップ
① Node.jsの確認・インストール
ターミナルで以下のコマンドを実行

nginx
node -v
バージョンが表示されればOK。

未インストールなら「Node.js インストール」で検索して導入。

② Reactアプリの雛形を作成
以下のコマンドをターミナルで実行します：

lua
npx create-react-app react-tutorial-youtube
→ 必要なファイル・フォルダを自動生成してくれる。

③ プロジェクトに移動してVS Codeを起動
bash
cd react-tutorial-youtube
code .
④ 開発用ローカルサーバを起動
sql
npm start
→ 自動的にブラウザが開いて、http://localhost:3000 が表示される。

🧾 ディレクトリ構成とファイルの役割
📁 public/index.html

アプリ全体のHTML土台。

<div id="root"></div> にReactが描画される。

📁 src/（ソースコード本体）

App.js：Reactのメインコンポーネント

App.css：デザイン用のスタイルファイル

index.js：Reactアプリの起点（Appコンポーネントをrootに描画）

🎓Reactの基礎知識
JSXとは何か：JavaScriptの中にHTMLを書くような書き方

コンポーネントとは：画面を構成する「部品」

React Hooks（useState, useRefなど）の使い方

Propsの仕組み：親から子に値を渡す方法

開発環境の使い方：VS Code、npm、create-react-appなど

🗣️ こんな人におすすめ
JavaScriptの基礎は分かるが、Reactは初めてという人

HTML/CSS/JavaScriptでWebアプリを作ってきたが、開発に限界を感じている人

モダンなWeb開発の仕組みを体験してみたい人

✅ 作成するアプリ
Reactを使って**ToDoリスト（タスク管理アプリ）**を作成します。

機能としては：

入力フォームから新しいタスクを追加できる

チェックボックスで「完了済み/未完了」を管理できる

入力フォームはuseRefで値を取得

状態管理にはuseStateを使用

🧱 実装ステップとコードの解説
① ToDoリストの状態（todos）を管理
jsx
const [todos, setTodos] = useState([
  { id: 1, name: "Task1", completed: false },
  { id: 2, name: "Task2", completed: true },
]);
useStateを使って、ToDoリストを配列で管理。

表示には .map() を使う：

jsx
{todos.map((todo) => (
  <div key={todo.id}>{todo.name}</div>
))}
② チェックボックスで完了状態を表示
jsx
<input type="checkbox" checked={todo.completed} readOnly />
checked属性に todo.completed を渡すことで、チェックのON/OFFを表示

readOnlyを付けないとReactから警告が出る

③ タスク追加フォームを作成
jsx
const todoNameRef = useRef();
jsx
<input ref={todoNameRef} type="text" />
<button onClick={handleAddTodo}>タスクを追加</button>
useRefでフォームの値を取得

ボタンをクリックするとタスクが追加される

④ タスク追加のロジック（handleAddTodo関数）
jsx
function handleAddTodo() {
  const name = todoNameRef.current.value;
  if (name === "") return;

  setTodos(prevTodos => {
    return [...prevTodos, { id: Date.now(), name, completed: false }];
  });

  todoNameRef.current.value = ""; // 入力欄を空にする
}
入力されたタスク名を元に、新しいタスクをtodosに追加

🧩 今後追加できる機能（応用）
チェックボックスをクリックして「完了/未完了」の切り替え

タスクごとの削除ボタンを作る

ローカルストレージを使って、タスクをブラウザに保存（永続化）

💡Tips（補足）
useRefはフォームから値を取得するのに便利だが、値が変わっても再レンダリングされない（非リアクティブ）

状態の変化によって再描画が必要な場面では、useStateで状態を管理する方が適している

🔗 その他
講師はUdemyでも教材を販売中（動画概要欄に割引リンクあり）

この1本の動画だけで、Reactを始めるための最初のステップを踏める

必要に応じて、実際のコード例や画像で視覚的に補足するのもおすすめです。
もしこの内容をPDF化やスライド資料にしたい場合もサポートできます。ご希望があればお知らせください！






ChatGPT:
React アプリを create-react-app コマンドで作成すると、以下のようなディレクトリとファイル構成になります（2025年時点の標準的な構成です）：

📁 プロジェクト構成（例：react-app）

react-app/
├── node_modules/              # 依存パッケージ群（npm installで自動生成）
├── public/                    # 公開用ファイル（HTMLなど）
│   ├── favicon.ico
│   ├── index.html             # 実際のHTML。Reactがここに描画される（<div id="root">）
│   └── ...
├── src/                       # 開発用ソースコード（Reactのコンポーネント群）
│   ├── App.css                # Appコンポーネント専用のCSS
│   ├── App.js                 # メインのReactコンポーネント
│   ├── App.test.js            # テスト用ファイル（Jestなど）
│   ├── index.css              # 全体のスタイル（グローバルCSS）
│   ├── index.js               # アプリのエントリーポイント（root要素にAppを描画）
│   ├── logo.svg               # 初期ロゴ画像（Reactロゴ）
│   └── reportWebVitals.js     # パフォーマンス測定用（任意で使用）
│
├── .gitignore                 # Gitで追跡しないファイルを指定
├── package.json               # 依存関係やスクリプトなどのプロジェクト設定
├── README.md                  # プロジェクト説明書
└── yarn.lock / package-lock.json  # パッケージのバージョン固定情報
🔍 主要ファイルの役割
ファイル / フォルダ名	説明
public/index.html	画面のベースHTML。<div id="root"> がReactの描画先
src/index.js	アプリのエントリーポイント。ReactDOM.render() でAppを表示
src/App.js	メインUIコンポーネント。最初に編集することが多い
src/App.css	Appに対応するCSSファイル
src/index.css	全体的なスタイル
package.json	アプリの名前・バージョン・依存モジュール・スクリプト定義など
node_modules/	Reactなどの外部ライブラリが保存される

🛠️ よく使うスクリプト（package.jsonに記述）
json
"scripts": {
  "start": "react-scripts start",      // 開発用ローカルサーバを起動
  "build": "react-scripts build",      // 本番用にビルド（最適化されたHTML/JS/CSS）
  "test": "react-scripts test",        // テスト実行
  "eject": "react-scripts eject"       // 設定ファイルをカスタム可能に（上級者向け）
}
🔰 最初に編集するおすすめファイル
src/App.js
→ 最初の「Hello World」などの表示をここで試すのが一般的です。

src/index.js
→ Reactアプリの起点。ここで <App /> を <div id="root"> に差し込んでいます。

js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


【React入門】完全初心者OK！１から簡単なTodoアプリを作ってReactの１歩を踏み出してみよう ~Reactチュートリアル~
https://www.youtube.com/watch?v=nRCNL9T3J98