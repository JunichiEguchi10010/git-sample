node.js環境構築 20250814

🌐 Node.jsとは？
Node.js（ノード・ジェイエス）は、JavaScriptを使ってサーバーサイド（裏側）のプログラムを書くための環境です。

💡 まとめ
Node.jsの初期設定は以下の流れです：
Node.jsをインストール
プロジェクトフォルダを作成
npm initで初期化
JavaScriptファイルを作成
nodeコマンドで実行！

🛠️ Node.js 初期設定ステップ
① Node.jsのインストール
公式サイトにアクセス 👉 https://nodejs.org/ja

推奨版（LTS）をダウンロード 「推奨版（LTS）」と書かれている方を選びましょう。安定していて初心者向きです。

インストーラーを実行してインストール 基本的に「次へ」を押していくだけでOKです。

インストール確認 ターミナル（Mac）またはコマンドプロンプト（Windows）を開いて、以下を入力：

bash
node -v
npm -v
→ バージョンが表示されれば成功です！

② プロジェクトフォルダの作成
bash
mkdir my-node-app
cd my-node-app
→ 自分のNode.jsプロジェクト用のフォルダを作成して移動します。

③ 初期化（package.jsonの作成）
bash
npm init -y
→ プロジェクトの設定ファイル（package.json）が自動で作成されます。

④ 最初のファイルを作る
bash
touch index.js   # Mac/Linux
type nul > index.js   # Windows
またはエディタで index.js を作成して、以下のように書いてみましょう：

js
console.log("Hello Node.js!");
⑤ 実行してみる！
bash
node index.js
→ 「Hello Node.js!」と表示されれば、あなたのNode.jsは動いています 🎉

✨ よく使うツール・ライブラリ
名前	用途
Express	Webサーバーを簡単に作れる
Nodemon	ファイル変更時に自動で再起動してくれる
dotenv	環境変数の管理に便利
