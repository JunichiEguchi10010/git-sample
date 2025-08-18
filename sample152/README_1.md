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

🟦 Node.jsをインストールするタイミング
タイミング	                            理由
開発環境を構築する前	           🟥 npm（Node Package Manager）を使ってViteやTailwindなどのツールを導入するため
新しいプロジェクトを始めるとき	    プロジェクトごとにNode.jsのバージョンが異なることがあるため、適切なバージョンを選ぶ必要がある
他人のプロジェクトを引き継ぐとき	package.jsonに記載された依存関係をインストールするためにNode.jsが必要


🛠️ Node.js 初期設定ステップ
① Node.jsのインストール
公式サイトにアクセス 👉 https://nodejs.org/ja

Node.js公式サイトからダウンロード
WindowsやMacならインストーラーを使って簡単にセットアップ可能
バージョン管理には nvm や Volta を使うと便利（複数バージョンを切り替えられる）

✅ どのバージョンを選べばいい？
基本的には LTS（Long Term Support）版：推奨版 を選ぶのが安全です。安定していて、長期間サポートされます。 
2025年現在では、Node.js v20 や v22 がLTSとして推奨されています。
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

✅ mkdir は "make directory" の略で、新しいフォルダー（ディレクトリ）を作成するコマンドです。
✅ my-node-app は新しく作成するフォルダーの名前です。(任意だがプロジェクトを想起するフォルダ名にする)

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

********************************************************************************************************************************

🟦 Node.jsのインストール先
OSによってインストール先が少し異なります。以下に代表的な環境ごとのインストール場所をわかりやすくまとめました 🗂️

💻 Windowsの場合
Node.jsをインストーラーでインストールすると、通常は以下の場所に入ります：

Node.js本体

Code
C:\Program Files\nodejs\
npm（パッケージ管理ツール）関連

Code
C:\Users\<ユーザー名>\AppData\Roaming\npm\
npmのグローバルモジュール

Code
C:\Users\<ユーザー名>\AppData\Roaming\npm\node_modules\
🔍 AppDataフォルダは隠しフォルダなので、表示するには「隠しファイルを表示」に設定する必要があります。

🍎 macOSの場合（Homebrew使用）
Homebrewでインストールした場合：

Node.js本体

Code
/opt/homebrew/bin/node
npm関連

Code
/opt/homebrew/lib/node_modules/
または、直接公式インストーラーを使った場合は：

Node.js本体

Code
/usr/local/bin/node
npm関連

Code
/usr/local/lib/node_modules/
🐧 Linuxの場合（Ubuntuなど）
APTなどでインストールした場合：

Node.js本体

Code
/usr/bin/node
npm関連

Code
/usr/lib/node_modules/
🔧 インストール場所を確認するコマンド
以下のコマンドで、実際にどこにインストールされているか確認できます：

bash
which node
which npm
または：

bash
where node   # Windows
📦 npmのグローバルインストール先を確認するには
bash
npm root -g
→ グローバルモジュールの保存場所が表示されます。

********************************************************************************************************************************
