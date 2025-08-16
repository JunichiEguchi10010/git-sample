Vite 環境構築 20250816

超高速なフロントエンド開発環境を構築するためのビルドツールです。
Vue.jsの作者 Evan You 氏によって開発され、2020年に登場しました。名前の由来はフランス語で「速い」。

🔧 主な特徴
特徴	説明
⚡ 高速起動	       開発サーバーが数百msで起動。Webpackのような事前バンドルが不要。
🔥 爆速HMR	        コード変更が即座にブラウザに反映される（Hot Module Replacement）。
🧠 モダン設計	    ES Modulesを活用し、必要なファイルだけをオンデマンドで処理。
🧼 シンプル構成	    設定が軽量で、すぐに開発を始められる。React/Vue/Svelteなどに対応。
🛠️ 最適化ビルド	 本番用にはRollupを使って効率的なバンドルを生成。
🔌 プラグイン対応	 Rollupベースのプラグインシステムで拡張性も高い。

🛠️ React + Vite のセットアップ例
bash
# プロジェクト作成
npm create vite@latest frontend -- --template react

# ディレクトリ移動
cd frontend

# 依存パッケージインストール
npm install

# 開発サーバー起動
npm run dev
これだけで、http://localhost:5173 にReactアプリが立ち上がります。

🧩 Viteが選ばれる理由
従来のWebpackやParcelは、プロジェクトが大きくなるとビルド時間が長くなりがちでした。
Viteは「必要なものだけを、必要な時に処理する」というアプローチで、開発効率を劇的に向上させます。
小規模〜中規模の案件でも高速開発が可能

📦 ES Modulesとは？
ES Modules（ECMAScript Modules）は、JavaScriptの標準的なモジュールシステムです。 
ES2015（ES6）で導入され、現在ではブラウザとNode.jsの両方でネイティブに対応しています。

🔑 基本の仕組み
export：モジュールから関数や変数などを外部に公開する

import：他のモジュールから公開された要素を読み込む

例：モジュールの定義と使用
js
// math.js
export function add(a, b) {
  return a + b;
}
export const PI = 3.14159;
js
// app.js
import { add, PI } from './math.js';
console.log(add(2, 3)); // 5
console.log(PI);        // 3.14159

🌐 ブラウザで使うには？
HTMLで読み込むときは、<script>タグに type="module" を指定します。

html
<script type="module" src="app.js"></script>
拡張子 .js を省略できない

相対パス（./ や ../）が必須
非同期で読み込まれるため、パフォーマンス向上にも貢献

🔄 CommonJSとの違い（Node.jsでよく使われる旧方式）

比較項目	     ES Modules(モダン)	  CommonJS(レガシー)
読み込み	     import	              require()
書き出し	     export	              module.exports
実行タイミング	 静的（コンパイル時）	動的（実行時）
Tree Shaking	可能	              難しい
ブラウザ対応	 あり	               なし（バンドラー必要）

✅ なぜ重要？
ViteやWebpackなどのモダンツールはES Modulesを前提に設計されています
コードの再利用性・保守性が向上
最適化（Tree Shaking）や高速化に貢献


🌳 Tree Shakingとは？
Tree Shakingとは、JavaScriptのバンドル時に「使われていないコード（デッドコード）」を自動的に除去する技術です。 
これにより、最終的なファイルサイズを小さくし、ページの読み込み速度やパフォーマンスを向上させます。

🔍 どうやって動くの？
モジュールバンドラー（Vite、Webpack、Rollupなど）が以下のような処理を行います：
エントリーポイントから依存関係をたどる
各モジュールで使われている関数や変数を解析
使われていないものを削除（＝Tree Shaking）

📦 例：使われない関数が削除される
js
// utils.js
export function used() {
  console.log("使われている関数");
}
export function unused() {
  console.log("使われていない関数");
}

// main.js
import { used } from './utils.js';
used();
この場合、unused() はどこでも使われていないので、Tree Shakingによってバンドルから除外されます。

✅ 有効にする条件
Tree Shakingが機能するには、以下の条件が必要です：

条件	                説明
ES Modules構文	    import / export を使っていること
バンドラー使用	     Vite、Webpack、Rollupなど
Productionモード	開発モードでは除去されないことが多い

⚠️ 注意点
CommonJS（require()）では基本的にTree Shaking不可
副作用（サイドエフェクト）のあるコードは除去されない
デフォルトエクスポートは除去されにくい場合がある