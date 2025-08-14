node.js npm（Node Package Manager）環境構築 20250815

📦 npmとは？
npm（Node Package Manager）は、Node.jsのためのパッケージ管理ツールです。

簡単に言うと：
「Node.jsで使える便利な部品（ライブラリ）を探して、インストールして、管理してくれる道具」

🧰 npmでできること
機能	                    説明
パッケージのインストール	必要なライブラリを簡単に追加できる（例：npm install express）
バージョン管理	           どのバージョンのライブラリを使うか指定できる
依存関係の管理	           他のライブラリが必要な場合も自動でインストールしてくれる
スクリプト実行	           npm runで開発用のコマンドをまとめて実行できる

🏗️ パッケージって何？
Node.jsで使える「機能のかたまり」です。例えば：
express：Webサーバーを作るためのライブラリ
dotenv：環境変数を管理するライブラリ
axios：HTTP通信を簡単にするライブラリ
これらはすべてnpmでインストールできます。

📁 npmが作るファイル
npmを使うと、以下のようなファイルがプロジェクトに追加されます：

package.json：プロジェクトの設定ファイル。使っているライブラリやスクリプトが記録される

node_modules/：インストールされたライブラリが保存されるフォルダ

🖥️ よく使うnpmコマンド
bash
npm init -y          # プロジェクトを初期化（package.jsonを作成）
npm install <名前>   # ライブラリをインストール
npm uninstall <名前> # ライブラリを削除
npm update           # ライブラリを最新に更新
npm run <スクリプト名> # スクリプトを実行

🌐 世界最大のライブラリ倉庫
npmは世界最大のオープンソースライブラリの倉庫でもあります。 
公式サイトはこちら 👉 https://www.npmjs.com


🧩 ライブラリの共通点：どの言語でも「機能の部品」
Node.jsのライブラリ（npmパッケージ）も、PythonやJava、Rubyなど他の言語のライブラリと基本的な目的は同じです：
再利用可能なコードの集まり
特定の機能を簡単に使えるようにする
開発効率を高める

たとえば：
機能	        Node.js（npm）	        Python（pip）	        Java（Maven）
Webサーバー	    express	                Flask, Django	        Spring Boot
HTTP通信	    axios, node-fetch	    requests	            HttpClient
環境変数管理	dotenv	                python-dotenv	        System.getenv()
テスト	        jest, mocha	            pytest, unittest	    JUnit

🔍 違いはどこにある？
1. インストール方法と管理ツール
Node.js → npm や yarn

Python → pip や conda

Java → Maven や Gradle

それぞれ独自の仕組みでライブラリを管理します。

2. 依存関係の管理方法
Node.jsでは package.json に依存関係を記録しますが、Pythonでは requirements.txt、Javaでは pom.xml など、管理ファイルの形式が異なります。

3. 実行環境の違い
Node.js → JavaScriptで書かれたコードをV8エンジンで実行
Python → Pythonインタプリタで実行
Java → JVM（Java仮想マシン）で実行
つまり、ライブラリの動作環境がまったく違うため、同じ機能でも内部の実装は異なります。

💡 まとめ
ライブラリの目的や役割は共通している（機能を追加するための部品）
ただし、言語ごとに管理方法・使い方・実行環境が異なる
同じ名前のライブラリでも、言語が違えばまったく別物