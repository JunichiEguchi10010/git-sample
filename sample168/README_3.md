Supabase PostgreSQL シェルpsql よく使うコマンド一覧 20250914

psql は PostgreSQL専用の対話型シェル（CLI） です。
一般的なコマンドプロンプトやターミナルとは異なり、PostgreSQLの操作に特化したコマンド体系を持っています。

💻 シェル（psql）の起動方法
Windowsのスタートメニューを開く
「SQL Shell (psql)」を検索（PostgreSQLフォルダ内にあります）
起動すると、以下のようなプロンプトが表示されます：

🧠 psql よく使うコマンド一覧

🔐 接続・ログイン関連
bash
psql -U postgres -d mydb         # ユーザーpostgresでmydbに接続
psql -h localhost -p 5432 -U postgres -d mydb  # ホスト・ポート指定付き接続
sql
\q                                -- psqlを終了
\c mydb                           -- 別のデータベースに接続
📦 データベース操作
sql
CREATE DATABASE sampledb;        -- データベース作成
DROP DATABASE sampledb;          -- データベース削除
\l                                -- データベース一覧表示
🧱 テーブル操作
sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE
);                               -- テーブル作成

DROP TABLE users;                -- テーブル削除
\d                               -- テーブル一覧表示
\d users                         -- テーブル構造の確認
📊 データ操作
sql
INSERT INTO users (name, email) VALUES ('Taro', 'taro@example.com');  -- データ挿入
SELECT * FROM users;              -- 全件取得
UPDATE users SET name = 'Jiro' WHERE id = 1;  -- データ更新
DELETE FROM users WHERE id = 1;  -- データ削除
🔍 情報取得・メタコマンド
sql
\dt                              -- テーブル一覧
\du                              -- ユーザー一覧
\dn                              -- スキーマ一覧
\df                              -- 関数一覧
\dv                              -- ビュー一覧
📁 ファイル入出力（スクリプト化向け）
bash
psql -U postgres -d mydb -f init.sql     # SQLファイルを実行
psql -U postgres -d mydb > dump.sql      # 出力をファイルに保存
sql
\i init.sql                      -- psql内でSQLファイルを実行
\o output.txt                    -- 出力をファイルに切り替え
\o                               -- 出力を元に戻す
🧪 実用例：テーブル作成＋データ挿入スクリプト（init.sql）
sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC
);

INSERT INTO products (name, price) VALUES
('Apple', 120),
('Banana', 80),
('Orange', 100);
🧠 Junichiさん向け補足（テンプレート化の視点）
各コマンドに「目的 → 構文 → コメント」の3層構造を持たせることで、教育資料としての再利用性が高まります。

\d, \dt, \du などのメタコマンドは、構造確認・ドキュメント化に非常に便利です。

スクリプト化する際は、init.sql のようなファイル名と、実行方法（psql -f）をセットで教えると初心者にも安心です。