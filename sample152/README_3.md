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

部分	                          意味
npm create vite@latest	    Vite の最新バージョンでプロジェクトを作成するコマンド
frontend	                  作成するプロジェクトのフォルダ名（この名前で新しいフォルダが作られる）
--	                        ここから先は Vite に渡すオプション（npm にではなく）
--template react	          Vite に「React テンプレートを使ってね」と指示する部分

✅ npm create vite@latest がやってくれること
機能	                          説明
📁 新規フォルダ作成	          入力したプロジェクト名でフォルダを作成します（例：sample-app）
📦 package.json の生成	     Vite 用の依存関係・スクリプトが含まれた設定ファイルを自動作成
🏗 必要なファイルの構成	       index.html, src/, vite.config.js などをセットアップ
🧩 フレームワーク選択	        React, Vue, Vanilla などを選べる（それに応じた構成になる）

❌ mkdir my-node-app は不要
❌ cd my-node-app は不要
❌ npm init -y は不要
npm init -y は、空のフォルダから自分で Node.js プロジェクトを始めるときに使うコマンドです。 
でも npm create vite@latest はそれを すべて自動でやってくれるので、重複して使う必要はありません。

🎓 まとめ
npm create vite@latest → 全部やってくれる！
npm init -y → 自分で構成する場合のみ使う







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


✅ Viteの稼働に必要な基本条件
1. 🖥️ Node.jsのインストール
推奨バージョン：Node.js 18以上（LTS版が望ましい）
ViteはNode.jsベースで動作するため、これがないと始まりません。

bash
node -v
npm -v
2. 📁 プロジェクトディレクトリの準備
空のディレクトリを作成し、npm init または npm create vite@latest で初期化

ViteはES Modules構成を前提としているため、ファイル拡張子 .js や .ts を明示する必要があります

3. 📦 必要な依存パッケージのインストール
bash
npm create vite@latest my-app
cd my-app
npm install
テンプレート選択（React, Vue, Svelteなど）に応じて必要な依存が自動で追加されます

4. 🧠 ES Modules構文の使用
import / export を使ったモジュール構成が必須
CommonJS（require()）は非推奨

5. 🌐 ブラウザの対応
開発中はモダンブラウザ（Chrome, Firefox, Edgeなど）が必要
ViteはES Modulesをネイティブに扱えるブラウザを前提にしているため、古いIEなどは非対応

6. ⚙️ Viteの設定ファイル（vite.config.js）
必須ではないが、カスタマイズする場合は必要
TailwindやPostCSSとの統合、環境変数の設定などに使う

7. 🌍 環境変数の設定（任意）
.env ファイルを使って BASE_URL や API_KEY などを管理
モードごとに .env.development や .env.production を分けることも可能

💡 補足
Tailwind CSSやPostCSSを使う場合は、postcss.config.js や tailwind.config.js の整備も必要です
Viteは「必要なものだけを、必要な時に処理する」設計なので、ディレクトリ構成やimportの明示性が重要です

✅ vite.config.jsで設定できる主な項目
項目	    説明
plugins	React/Vueなどのフレームワークや、Tailwind・PostCSSなどのツールを統合するためのプラグインを指定
server	開発サーバーの設定（ポート番号、HMRの挙動、CORSなど）
build	本番ビルドの設定（出力先、ソースマップ、圧縮など）
resolve	モジュールのパス解決（エイリアス設定など）
define	グローバル定数の定義（環境変数の注入など）
css	    CSS関連の設定（PostCSS、モジュール、プリプロセッサなど）
envDir	.env ファイルの読み込みディレクトリ指定
base	アプリのベースURL（デプロイ先がサブディレクトリの場合など）

🧪 例：React + Tailwind + PostCSSの構成
js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
});

🧠 defineConfigを使う理由
型補完が効く（VSCodeなどで自動補完される）
設定ミスを防げる
Vite公式が推奨

🔄 条件付き設定も可能
開発と本番で設定を分けたい場合、関数として設定を返すこともできます：

js
export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      server: { port: 3000 },
    };
  } else {
    return {
      build: { sourcemap: false },
    };
  }
});

🌱 補足
TailwindやPostCSSとの統合には css.postcss や plugins の設定が重要
resolve.alias を使えば、@/components/Header のようなパス指定が可能になり、保守性が向上
.env ファイルの読み込みには envDir や loadEnv() の活用もおすすめ
