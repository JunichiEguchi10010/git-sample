Prisma デモ 20250912

キャッシがうざい問題を調べること

🖥 GUI（pgAdmin）の起動方法
Windowsのスタートメニューを開く
「pgAdmin 4」を検索（または「PostgreSQL 17」フォルダ内にあります）
「pgAdmin 4」をクリックして起動
初回起動時は少し時間がかかります。ブラウザが開き、GUI画面が表示されます。

ローカルサーバー（PostgreSQL 17）に接続するには：
左側の「Servers」→「PostgreSQL 17」→「Connect」
パスワード（インストール時に設定したもの）を入力

💻 シェル（psql）の起動方法
Windowsのスタートメニューを開く
「SQL Shell (psql)」を検索（PostgreSQLフォルダ内にあります）
起動すると、以下のようなプロンプトが表示されます：

Server [localhost]:
Database [postgres]:
Port [5432]:
Username [postgres]:
Password:
すべてEnterキーでデフォルトを選択してもOK（インストール時の設定に依存）
ログイン後、SQLコマンドを直接入力できます：
sql
SELECT version();

🔐 パスワード入力時に「何も表示されない」のは正常です
psql のパスワード入力欄では、セキュリティのために入力文字が画面に表示されません。
つまり、キーを押しても「●」や「*」などの文字が出ないのは 仕様 です。
実際には入力されていますので、正しいパスワードを打ち終えたら Enter を押してください。

🔧 補足（構造的・教育的視点）
GUI（pgAdmin）は視覚的に操作できるため初心者に最適。
クエリツールやテーブル設計もドラッグ＆ドロップで可能。
シェル（psql）はスクリプトやテンプレート化に向いている。
両方を併用することで、GUIで設計 → CLIで自動化・検証という流れが作れます。

手順
SQLシェルでPostgreSQLにアクセス

CREATE DATABASE sampledb:でデータベース新規作成

￥c sampledbコマンド でデータベース"sampledb"にユーザー"postgres"として接続

シェルでもコマンドを使用してデータベースを作れるが、Prismaで作成する方が便利。

schemae.prismaに投稿データを表すモデルを追加
model Posts {
  id    Int    @id @default(autoincrement()) // 主キー。自動で連番が振られる整数型
  title String                              // 投稿のタイトル。必須の文字列
  body  String                              // 投稿の本文。必須の文字列
}

マイグレード処理
ターミナルでカレントディレクトリ内でnpx prisma migrate dev --name init実行
→ migrationsフォルダが作成される
migrations.splでsql文が自動的に作成されている

SQL shell(psql)で
postgres=# ￥c sampledb
データベース"sampledb"にユーザー"postgres"として接続しました。
sampledb=# ￥dデータベースを確認 → これ以降はSQL shell(psql)は不要

ターミナルnpx prisma studioコマンドで
npx prisma studioを立ち会あげる

npx prisma studio は Prisma が提供する GUIベースのデータベース管理ツールで、ローカルで起動してブラウザ上でデータベースの中身を視覚的に操作できるものです。

🖥️ npx prisma studio の役割
Prisma スキーマに基づいて生成されたモデルを一覧表示
各テーブル（モデル）のデータを GUIで閲覧・編集・追加・削除できる
SQL を書かずに、フォーム感覚でデータ操作が可能
開発中のデバッグや、データの確認に非常に便利

🔧 実行するとどうなる？
bash
npx prisma studio
これを実行すると：
ローカルサーバーが起動（通常は http://localhost:5555）
ブラウザが開き、Prisma Studio の画面が表示される
モデルごとにデータが一覧表示され、GUIで操作可能


server.jsでAPIを作成する → CRUD

ポストマンで確認
POSTMAN公式
https://www.postman.com/jp/downloads/

// PrismaClientをインスタンス化
const prisma = new PrismaClient(); 

// リクエストボディをJSON形式で解析 Express v4.16.0以降で組み込まれた ミドルウェア関数
app.use(express.json());

コマンド
npx prisma generate
npx prisma generate は Prisma プロジェクトにおける クライアントコードの自動生成コマンドで、データベースとやりとりするための JavaScript/TypeScript API を作り出します。


prisma/schema.prisma を読み込み
スキーマに定義されたモデル（テーブル構造）をもとに
JavaScript/TypeScript で使える Prisma Client を生成
生成されたクライアントは、アプリケーションコードからデータベース操作を行うためのインターフェースになります。

コマンド
node server.js
node server.js は、Node.js を使って server.js ファイルを実行するコマンドです。つまり、アプリケーションのサーバーを起動する命令ですね。

🧩 コマンドの構造
bash
node server.js
node：Node.js の実行エンジン。JavaScript ファイルをサーバーサイドで動かすためのもの。
server.js：起動対象のファイル。通常は Express や Fastify などのフレームワークを使って HTTP サーバーを構築している。

【Prisma入門】次世代ORMで簡単にデータベース管理ができるようになろう
https://www.youtube.com/watch?v=9mE1j1vzUAQ