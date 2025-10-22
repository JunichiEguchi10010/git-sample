Docker コンテナについて 20251122

🐳 Docker（ドッカー）とは？

**Docker（ドッカー）**は、アプリケーションを動かすための「小さな仮想環境」を作るツールです。
この「小さな環境」のことを コンテナ（Container） と呼びます。

たとえば：
あなたが作ったWebアプリが、自分のパソコンでは動くのに他の人のパソコンでは動かない…
「動作環境が違うせいでうまくいかない！」というトラブルがよくあります。

Dockerを使うと、この問題を解決できます。
なぜなら、アプリとその動作に必要な環境（設定やライブラリ）を「1つの箱」にまとめて動かせるからです。

⚙️ Dockerを使うと何がいいの？
動画でも紹介されていた主なメリットを、初心者にもわかる言葉で説明します👇

メリット	            わかりやすい説明
🧩 環境の統一	        開発者みんなが同じ環境で作業できるので、「動かない」が減る。
🔁 コードで環境を再現	「Dockerfile」という設定ファイルを書けば、誰でも同じ環境を再現できる。
☁️ クラウド展開が簡単	 Dockerのコンテナはそのままクラウドでも動かせる。
📦 Docker Hubの利用	   世界中の人が作った環境（MySQLやNginxなど）をすぐダウンロードして使える。

💻 Docker Desktop のインストール
Dockerを使うには、まず Docker Desktop というアプリをインストールします。
これは、Windows・Mac どちらでも使えます。

公式サイト（https://www.docker.com/）にアクセス
自分のOS（Windows / Mac）に合った「Docker Desktop」をダウンロード
インストールして起動すればOK
起動後、ターミナル（またはPowerShell）で次のコマンドを入力して確認します：

docker --version

→ バージョンが表示されたら準備完了！

🧱 コンテナの基本操作
動画では、Docker Hub から「MySQL」というデータベースのコンテナを使って、基本操作を紹介していました。

1️⃣ イメージを取得（ダウンロード）
docker pull mysql

Docker Hub（世界のコンテナ倉庫）からMySQLの「設計図」をダウンロードします。
この設計図のことを イメージ（Image） と呼びます。

2️⃣ コンテナを起動
docker run --name mydb -e MYSQL_ROOT_PASSWORD=pass -d mysql

このコマンドで、MySQLのコンテナ（実際に動く箱）を作って動かします。

--name mydb：コンテナの名前を「mydb」にする

-e MYSQL_ROOT_PASSWORD=pass：パスワード設定

-d：バックグラウンドで動かす

3️⃣ コンテナの一覧を見る
docker ps

4️⃣ コンテナを停止
docker stop mydb

5️⃣ コンテナを削除
docker rm mydb

これで、基本的な流れ（起動 → 確認 → 停止 → 削除）が一通りできました。

🧰 Dockerfile（ドッカーファイル）とは？
Dockerfile は、自分専用のコンテナを作るためのレシピ（設計図） です。
たとえば、「自分だけのWebサーバー」を作りたいときに、このファイルに「どんな設定で作るか」を書きます。

よく使われる命令文：
命令	        意味
FROM	    どのイメージをもとにするか（例：FROM ubuntu）
RUN	        コマンドを実行してソフトをインストールする
COPY	    ファイルをイメージの中にコピーする
ENTRYPOINT	コンテナが起動したときに実行するメインコマンドを指定する

例：
FROM ubuntu
RUN apt-get update && apt-get install -y nginx
COPY index.html /var/www/html/
ENTRYPOINT ["nginx", "-g", "daemon off;"]


このDockerfileは、
Ubuntuをベースにする
Nginx（Webサーバー）をインストールする
自分のHTMLファイルを中にコピーする
コンテナ起動時にNginxを動かす
という内容になっています。

🚀 カスタムイメージの作成と起動
Dockerfileを作ったら、次のコマンドで自分専用のイメージを作ります：
docker build -t my-nginx .

そのイメージを元にコンテナを起動します：

docker run -d -p 8080:80 my-nginx

これでブラウザで「http://localhost:8080」にアクセスすると、自分のWebページが表示されます！

🏁 まとめ
項目	        内容
Dockerとは	    アプリを入れた箱（コンテナ）を作って動かすツール
メリット	    環境統一・再現性・クラウド連携・便利な共有
主要コマンド	docker pull, docker run, docker ps, docker stop, docker rm
Dockerfile	    自作のコンテナ環境をコードで定義できるレシピ


✅ Dockerfileの構成テンプレート

Dockerfileは「どんな環境で」「どんなアプリを」「どう動かすか」を書いたレシピです。
構成を理解すれば、どんなアプリでも自分でコンテナ化できるようになります。

🧱 Dockerfileの基本構成（テンプレート）
以下は、どんなアプリにも応用できる基本テンプレートです👇

# =========================================
# ① ベースイメージを指定
# =========================================
FROM ubuntu:22.04
# （例）Node.js を使う場合は：
# FROM node:18

# =========================================
# ② 作者情報やメタ情報（任意）
# =========================================
LABEL maintainer="yourname@example.com"
LABEL description="This is a sample Dockerfile for beginners."

# =========================================
# ③ 必要なパッケージをインストール
# =========================================
RUN apt-get update && apt-get install -y \
    curl \
    git \
    vim \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# =========================================
# ④ アプリケーション用の作業ディレクトリを作成
# =========================================
WORKDIR /app

# =========================================
# ⑤ ローカルのファイルをコンテナ内にコピー
# =========================================
COPY . /app

# =========================================
# ⑥ 必要な依存関係をインストール（Node.jsなどの場合）
# =========================================
# RUN npm install

# =========================================
# ⑦ コンテナ起動時に実行されるコマンド
# =========================================
ENTRYPOINT ["bash"]
# 例）Node.jsを動かす場合は：
# ENTRYPOINT ["node", "app.js"]

# =========================================
# ⑧ 公開するポート番号（必要に応じて）
# =========================================
EXPOSE 8080

💡 各パートの意味をわかりやすく解説
セクション	        説明
① FROM	        どんな環境をもとにするかを指定します。
                （例：ubuntu, node, python, nginxなど）
② LABEL	        作者情報や説明を書いておくと管理しやすいです（任意）。
③ RUN	        コマンドを実行します。パッケージのインストールや設定変更などに使います。
④ WORKDIR	    作業ディレクトリを指定します。以降の操作はここを基準に実行されます。
⑤ COPY	        自分のPCのファイルをコンテナの中にコピーします。
⑥ RUN (または npm installなど)	アプリに必要な依存関係（ライブラリ）をインストールします。
⑦ ENTRYPOINT / CMD	コンテナが起動したときに実行されるコマンドです。
⑧ EXPOSE	    コンテナ内で使用するポート番号を公開します（例：Webアプリなら80や8080）。

📦 実用例：Node.jsアプリのDockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT ["npm", "start"]

このファイルを使えば、ローカルで作ったNode.jsアプリをDocker上で簡単に動かせます。
（npm start でアプリが起動する構成です）

📘 もうひとつ：Pythonアプリの例
FROM python:3.11
WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
ENTRYPOINT ["python", "app.py"]

これで Flask や FastAPI などのPythonアプリをDockerで動かせます。

🚀 ビルドと実行の流れ
Dockerfileを作ったら、以下の2ステップで動かします。

1️⃣ イメージを作る
docker build -t myapp .

2️⃣ コンテナを起動
docker run -d -p 8080:8080 myapp

これでブラウザから http://localhost:8080 にアクセスすればOKです！

🧩 まとめ
要素	            内容
Dockerfileとは	コンテナ環境を自動構築するための「設計図」
重要な命令	    FROM / RUN / COPY / WORKDIR / ENTRYPOINT / EXPOSE
応用例	        Node.js・Python・Nginx・MySQL などすべてに応用できる
メリット	    どこでも同じ環境を再現できる（環境トラブルが激減）


【Docker入門】初心者向け！Dockerの基本を学んでコンテナ型の仮想環境を作ろう！
https://www.youtube.com/watch?v=B5tSZr_QqXw

 Docker超入門講座 合併版 | ゼロから実践する4時間のフルコース
 https://www.youtube.com/watch?v=lZD1MIHwMBY

 【初めてのDocker】コンテナってそもそも何なの？
 https://www.youtube.com/watch?v=vPaPgD72Z8o

 【図解】これなら分かる!!はじめてのDocker
 https://www.youtube.com/watch?v=B1EQ1oncKak
