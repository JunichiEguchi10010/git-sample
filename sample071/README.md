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


💡npmとは？
Node.jsのパッケージ管理システムのことです。
Node.jsを使って開発を行う際に、便利なパッケージ（ライブラリ）をインストール・管理するためのツールです。
npmを使うことで、パッケージの依存関係やバージョン管理を簡単に行うことができます2。

例えば、ReactやExpressなどのフレームワークをインストールする際にnpmを利用します。
また、npmにはパッケージレジストリがあり、世界中の開発者が作成したパッケージを簡単に検索・利用できます。

npmを使うには、まずNode.jsをインストールする必要があります。
Node.jsをインストールすると、npmも自動的にインストールされます。
基本的なコマンドとしては、以下のようなものがあります：

✅npm install <パッケージ名>：パッケージをインストール
✅npm uninstall <パッケージ名>：パッケージを削除
✅npm update：インストール済みのパッケージを更新
✅npm list：インストール済みのパッケージを一覧表示


💡Webpackとは？
JavaScript向けのモジュールバンドラーです。
簡単に言うと、複数のJavaScriptファイルや関連するCSS、画像などを1つのファイルにまとめるツールです。

Webpackの主な特徴
モジュール管理：JavaScriptのモジュールを適切にまとめ、依存関係を解決します。
バンドル機能：複数のファイルを1つにまとめることで、ブラウザのリクエスト数を減らし、ページの読み込み速度を向上させます。
ローダー：CSSや画像などの非JavaScriptファイルも処理可能。
プラグイン：機能を拡張できるプラグインが豊富。


💡Viteとは？
次世代のフロントエンドビルドツールです。
特に高速な開発環境を提供することを目的として設計されており、従来のWebpackなどのツールと比べて、開発時のパフォーマンスが大幅に向上します。

Viteの特徴
超高速な開発サーバー
ESモジュールを活用し、必要なファイルだけを変換して提供するため、開発時のビルドがほぼ不要。
npm run dev で即座に開発環境が立ち上がる。
ホットモジュールリプレースメント（HMR）
ファイルを編集すると、変更部分だけが即座にブラウザに反映される。
Webpackよりも圧倒的に速い更新速度。
シンプルな設定
Webpackのような複雑な設定が不要で、すぐに使える。
vite.config.js を使えば、簡単にカスタマイズ可能。
最適化された本番ビルド
本番環境向けのビルドでは、Rollupを使用して最適化されたバンドルを生成。
不要なコードを削減し、軽量なファイルを作成。


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


React アプリを create-react-app コマンドで作成すると、以下のようなディレクトリとファイル構成になります（2025年時点の標準的な構成）：

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


✅ public/ フォルダ内の index.html 以外の「...」の部分に入る可能性がある主なファイル一覧
create-react-app（CRA）や Vite でプロジェクトを作った場合、public/ フォルダには index.html のほかに、以下のようなファイルが含まれていることがあります：

public/
├── favicon.ico           # ブラウザタブに表示されるアイコン
├── index.html            # Reactが描画される土台のHTML（<div id="root">）
├── logo192.png           # PWA（プログレッシブWebアプリ）用のアイコン
├── logo512.png           # PWA用（高解像度）アイコン
├── manifest.json         # PWA設定ファイル（Webアプリとしての動作情報）
├── robots.txt            # 検索エンジン向けのクロール制御ファイル
└── その他、静的アセット     # 画像やPDF、音声など

🔍 各ファイルの意味
ファイル名	役割
favicon.ico	                タブやブックマークに表示されるアイコン（16×16など）
logo192.png / logo512.png	スマホにアプリとして追加したときのアイコン画像（PWA用途）
manifest.json	            アプリ名やテーマカラーなど、PWAとして動作させるための情報を記載
robots.txt	                検索エンジン（Googleなど）にクロールのルールを指示
画像・PDFなど	            public/ に入れると、そのままURLでアクセスできる静的ファイル（例：/images/sample.jpg）

💡 補足：なぜ public/ に入れるの？
public/ 内のファイルは Reactでは処理されず、そのまま公開される静的ファイル です。
例：public/sample.pdf → ブラウザで http://localhost:3000/sample.pdf で直接アクセスできる。

✨ 実際の例
bash
public/
├── favicon.ico
├── index.html
├── logo192.png
├── logo512.png
├── manifest.json
├── robots.txt
└── images/
    └── banner.jpg

まとめ
「...」に入るのは主に PWA関係ファイル（manifest・ロゴ画像）や静的アセット（画像・音声・PDF）。
public/ に入れたファイルは React で import せずに、URLで直接使えるのが特徴です。

💡React アプリにおいて public/ フォルダが存在する理由は？
「React では扱わない静的ファイル」 を置くためです。

🔧 目的：「Reactに触れさせずに、ブラウザにそのまま出すファイル」を置く場所
Reactの src/ フォルダ内のファイルは、開発時に Webpack（またはVite）によってビルド・変換される 仕組みになっています。
一方、public/ フォルダにあるファイルは、そのままコピーされてビルド結果に含まれる という特徴があります。

🎯 なぜ public/ が必要なのか？
① HTMLの土台（index.html）を置くため
public/index.html は React アプリの「土台」となる唯一のHTMLファイルです。
ReactはこのHTMLの中の <div id="root"></div> にコンポーネントを描画します。

② Webアプリとして使うための設定ファイルを置く（PWAなど）
manifest.json や robots.txt はビルドせずにそのまま使われる必要があります。

これらは React のコンポーネントではなく、ブラウザや検索エンジンに読まれる設定ファイルです。

③ 静的な画像やPDF、音声ファイルを直接アクセスできるようにするため
例えば public/sample.pdf を作っておけば、http://example.com/sample.pdf で直接アクセスできます。
これは React アプリの外側で使いたいときや、<a href="/file.pdf"> でダウンロードさせたいときに便利です。

🆚 src/ との違い（簡単まとめ）
項目	                                            src/	public/
Reactによってビルドされる？	                        ✅ Yes	❌ No
JSXやCSSモジュールを含める？	                    ✅ Yes	❌ No
画像やファイルに import する必要ある？	             ✅ 必要	❌ 不要（URLで使える）
URLで直接アクセスできる？	                        ❌ できない	✅ できる

✅ まとめ
public/ フォルダは Reactが介在しない「静的ファイル」 を置く場所。
Reactアプリ全体を描画するベースHTML（index.html）もここに置く。
PWAやSEO、外部リンクなど「React外」の用途に対応するために不可欠。

✅画像や動画（メディアファイル）を保存する場所
保存場所	                適した用途	                                                                特徴
src/ フォルダ内	            Reactコンポーネント内でimportして使う画像・動画	                           ビルド時に最適化・ハッシュ付きファイル名で出力される（キャッシュ対策〇）
public/ フォルダ内	        URLで直接アクセスする必要がある画像・動画（例：PDF・外部リンク・favicon）	  Reactでimportできないが、/img/logo.pngのようにURLで使える


① src/ フォルダに入れるケース（Reactが扱う）
Reactコンポーネント内で使う画像・動画
例: <img src={logo} />

使い方：
js
import logo from './images/logo.png';
<img src={logo} alt="ロゴ" />
✅ メリット：
Webpackで最適化される（サイズ圧縮、ハッシュ付きファイル名）
コンポーネントと一緒に管理できる（再利用・整理しやすい）

② public/ フォルダに入れるケース（React外で使う）
HTMLから直接呼び出したいファイル

例: index.htmlの<link rel="icon" href="/favicon.ico" />
ダウンロードリンクにしたいファイル

例: <a href="/sample.pdf" download>PDFをダウンロード</a>

CMSなど外部システムからURLでアクセスされるファイル

例: SNSのOGP画像（/ogp.png）

❗注意：
public/の画像はimportできません。使うには絶対パス(/images/photo.jpg)で書く必要があります。
Webpackによる最適化は行われません（大きな画像を大量に置くのには不向き）

📌 まとめ（選び方の目安）
使い方	                                                保存場所                    	理由
Reactの中で使う（importして使いたい）	                    src/                    	最適化されて、メンテもしやすい
URLで直アクセスさせたい（ダウンロード・OGP・faviconなど）	public/	                    　HTMLやブラウザがそのまま読み取る必要があるから

フォルダ名の例（実際の構成）
react-app/
├── public/
│   ├── images/
│   │   └── banner.jpg         ← 直リンク用
│   └── sample.pdf             ← ダウンロード用
├── src/
│   ├── assets/
│   │   ├── logo.png           ← React内で使う
│   │   └── video.mp4
│   ├── components/
│   │   └── Header.jsx
│   └── App.js


🔧 理由（なぜ src/ 内が良いのか）
理由	説明
✅ Webpackで自動最適化	ビルド時に画像が圧縮され、ファイル名にハッシュが付くためキャッシュ対策もされる
✅ importで直接使える	コンポーネント内で簡単にパスを解決できる（パス間違いを減らせる）
✅ 保守・整理しやすい	ページや用途ごとにフォルダを分けて管理できる

✅ 使用例：
jsx
import mainVisual from './assets/fv/main-bg.jpg';

const Hero = () => (
  <div className="hero" style={{ backgroundImage: `url(${mainVisual})` }}>
    <h1>ようこそ！</h1>
  </div>
);

🚫 public/ に置くケース（使わない方がいいことが多い）
public/images/fv-bg.jpg のように置いても使えますが、

jsx
<div style={{ backgroundImage: "url('/images/fv-bg.jpg')" }}></div>
のようにパスを手で書く必要があるため、

ファイル名変更が反映されない
キャッシュ破棄が難しい
Webpackの管理外になる
などの理由で保守性が下がります。

🧠 実際の企業制作現場では…
チーム開発や中〜大規模プロジェクトでは：

src/assets/images/hero/, src/assets/images/thumb/ など用途別に整理

LP（ランディングページ）や一時的なキャンペーンページでは：
ディレクトリを切って独立管理（例：src/pages/Campaign1/）

🏁 結論
画像の種類	                    配置先                  	            備考
サムネイル画像	            src/assets/thumbnails/	            コンポーネントからimportして使用
FVの背景画像	            src/assets/fv/                  	importしてスタイルに使用するのが基本
特別な理由がない限り        　public/ には置かないのがベスト		


企業用ホームページ用　Reactフォルダ構成例

my-company-site/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── robots.txt
│   └── manifest.json
│
├── src/
│   ├── assets/                      # 画像やフォント、動画などの静的リソース
│   │   ├── images/
│   │   │   ├── fv/                 # ファーストビューの背景画像など
│   │   │   ├── thumbnails/         # サムネイル画像
│   │   │   ├── logos/              # 会社ロゴ、パートナー企業ロゴなど
│   │   │   └── icons/              # アイコン類（svgなど）
│   │   └── fonts/
│   │
│   ├── components/                  # 再利用可能なUIコンポーネント
│   │   ├── Header/
│   │   │   ├── Header.js
│   │   │   ├── Header.module.css   # CSSモジュール推奨（もしくはstyled-componentsなど）
│   │   │   └── Logo.js
│   │   ├── Footer/
│   │   ├── Button/
│   │   ├── Card/
│   │   └── ...
│   │
│   ├── pages/                       # それぞれのページ単位のコンポーネント
│   │   ├── Home/
│   │   │   ├── Home.js
│   │   │   ├── Home.module.css
│   │   │   └── components/         # ページ内でのみ使う小コンポーネント
│   │   ├── About/
│   │   ├── Services/
│   │   ├── Contact/
│   │   └── ...
│   │
│   ├── hooks/                      # カスタムフックを格納
│   │   └── useWindowSize.js
│   │
│   ├── utils/                      # 関数ユーティリティ群（API呼び出し、計算ロジックなど）
│   │   ├── api.js
│   │   ├── formatDate.js
│   │   └── ...
│   │
│   ├── styles/                     # 全体共通のスタイル、変数、ミックスインなど
│   │   ├── variables.css
│   │   ├── reset.css
│   │   └── global.css
│   │
│   ├── App.js                      # アプリケーションのルートコンポーネント
│   ├── App.module.css
│   ├── index.js                    # エントリーポイント。ReactDOM.renderを実行
│   └── reportWebVitals.js
│
├── .gitignore
├── package.json
├── README.md
└── yarn.lock / package-lock.json

💡詳細解説
✅1. public/
静的ファイル（HTMLファイルやfaviconなど）を置く。
Reactのビルド後に直接公開される。
画像などは極力 src/assets/ に置くのが一般的。

✅2. src/assets/
画像・動画・フォント・SVGなどを管理。
ファーストビューの背景画像やサムネイルなどページで使う画像はここにまとめる。
import して使うので、Webpackの恩恵を受けられる。

✅3. src/components/
ヘッダー、フッター、ボタン、カードなどの再利用可能な部品。
CSS Modulesやstyled-componentsでスタイルをコンポーネントごとに分ける。
コンポーネントは「機能単位」で細かく分けておく。

✅4. src/pages/
企業サイトのトップページ、会社概要、サービス紹介、問い合わせページなどの「ページ単位」のコンポーネント。
ページ内でしか使わない小さなコンポーネントはページフォルダ内に components/ を作り管理。

✅5. src/hooks/
複数コンポーネントで使うカスタムフックをここにまとめる。
例：画面幅検知用、フォームバリデーション用など。

✅6. src/utils/
API呼び出し関数やデータ整形関数など、ロジックを分離。
コンポーネントをシンプルに保つ。

✅7. src/styles/
全体で使うCSS変数やリセットCSS、グローバルスタイル。
CSS Modulesを使わない部分や、共通のテーマ設定をここにまとめる。

✅8. App.js / index.js
App.js がアプリの親コンポーネント。ここでルーティング（React Router）やグローバルな状態管理を設定。
index.js はエントリーポイントで、ReactDOMで App をHTMLの root にレンダリング。

✅追加ポイント
ルーティングは react-router-dom を使い、App.js でページ遷移を管理。

状態管理は必要に応じて useState から Redux や Recoil まで拡張可能。

CSS設計はチームや好みに合わせて CSS Modules、Sass、styled-componentsなどを選択。

テストは src/__tests__/ にユニットテスト・E2Eテストを配置。


【React入門】完全初心者OK！１から簡単なTodoアプリを作ってReactの１歩を踏み出してみよう ~Reactチュートリアル~
https://www.youtube.com/watch?v=nRCNL9T3J98