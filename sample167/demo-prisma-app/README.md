Prisma デモ 20250912

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

🔧 補足（構造的・教育的視点）
GUI（pgAdmin）は視覚的に操作できるため初心者に最適。
クエリツールやテーブル設計もドラッグ＆ドロップで可能。
シェル（psql）はスクリプトやテンプレート化に向いている。
両方を併用することで、GUIで設計 → CLIで自動化・検証という流れが作れます。

