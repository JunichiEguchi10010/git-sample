PostgreSQL データベース SQL Shell（psql）について 20250910

PostgreSQL公式サイト
https://www.postgresql.org/

日本PostgreSQLユーザ会
https://www.postgresql.jp/

SQL Shell（psql）
データベースに対して直接SQLコマンドを入力して操作できる対話型のコマンドラインツールです。
PostgreSQLをダウンロードすると自動的についてくる

✅ PostgreSQLとは？
・読み方：ポストグレスキューエル（略して「ポスグレ」って呼ばれることが多い）
・正式には 「オープンソースのリレーショナルデータベース管理システム (RDBMS)」
👉 簡単に言うと「無料で使える高性能なデータベースソフト」です。

✅ PostgreSQLの特徴
オープンソース & 無料
・誰でも自由に使える
・世界中の開発者が改善している

リレーショナルデータベース
・データを「表（テーブル）」で管理
・例：users テーブルに「id, name, email」列を持たせて管理

SQLで操作できる
・SQL（Structured Query Language）という共通の言語でデータの追加・検索・更新・削除（CRUD）ができる

拡張性が高い
・JSON型やGISデータ（地図情報）も扱える
・拡張モジュールを入れて機能追加も可能

商用でもよく使われるほど安定
・信頼性が高く、大企業や金融機関でも使われている

✅ PostgreSQLのイメージ

📂 Excelの表に似ているけど、
・行（row）= データ（例：1人のユーザー情報）
・列（column）= 項目（例：名前、メールアドレス）
・そして「大量データを高速に扱え、複数人が同時に編集しても壊れない」

👉 Excelを超高速・超安全にしたバージョンがデータベース。
👉 その代表格のひとつが PostgreSQL。

✅ 他の有名なDBとの違い

MySQL
・世界で一番使われているDBの1つ
・WordPressや多くのWebサービスで採用
・シンプルで速いが、機能はPostgreSQLより少なめ

SQLite
・超軽量でアプリに組み込みやすい
・スマホアプリやローカル開発用に便利
・大規模サービスには不向き

PostgreSQL
・高機能・高信頼性
・JSON、GIS、並列処理など最新機能をサポート
・大規模システムでも安心

✅ Supabaseとの関係
Supabase は「バックエンド全部入りサービス」ですが、
その 中心のデータベースが PostgreSQL です。
つまり Supabase = PostgreSQL をベースに、認証やストレージ、APIを便利にまとめたサービス。

👉 まとめると
・PostgreSQL = 高機能・高信頼性のオープンソースDB
・Supabase = PostgreSQLを中心にした便利なクラウドサービス

✅ RDB（リレーショナルDB）と NoSQL の違い
RDB（リレーショナルDB, 代表例：PostgreSQL, MySQL）
・データは 表（テーブル）形式
・行 = データ、列 = 項目
・データ同士の関係（リレーション）を重視
・操作言語は SQL
・例）ユーザーと注文を「外部キー」で関連付け
👉 しっかりした構造でデータを管理したいときに強い

NoSQL（代表例：MongoDB, DynamoDB, Firebase Firestore）
・「表」に縛られない柔軟なデータ管理
・JSONのように自由な形で保存できる
・スキーマ（型や列の制約）がゆるい or ない
・横にスケールしやすい（大量アクセス向き）
👉 早く開発したい、データ形式が流動的、超大規模アクセスに対応したいときに強い

✅ PostgreSQL はどっち？

基本は RDB（リレーショナルDB）

でも JSON型のカラムを持てるので
→ JSONをそのまま保存して NoSQLっぽく扱える

💡 例：
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  profile JSONB
);

-- JSONで好きな形のデータを保存
INSERT INTO users (profile)
VALUES ('{ "name": "Alice", "hobbies": ["music", "running"] }');

👉 これだと「MongoDBっぽい使い方」が PostgreSQL でもできるんです。

✅ まとめ
PostgreSQL = RDBMS（SQLベース）
だけど NoSQL的な柔軟なデータ保存もできる
だから「SQLもNoSQLも使えるハイブリッドなDB」と言われることもある

✅ PostgreSQLは単体で使えるのか？
結論：はい、PostgreSQLは単体で使えます。
PostgreSQLは「データベースサーバー」そのものです。
インストールすれば、それだけで「データの保存・検索・更新・削除」はすべて可能です。
開発者は psql（コマンドラインツール） を使って直接SQLを叩いたり、GUIツール（pgAdminなど）から操作できます。
👉 なので、理論的には「PostgreSQL単体」で完結します。

✅ でも実際の開発ではツールと組み合わせることが多い
現実的にはアプリを作るとき、以下のように組み合わせることがほとんどです。

例1: Webアプリの場合
フロントエンド（React, Next.jsなど）
バックエンド（Node.js, Python, Ruby on Railsなど）
データベース（PostgreSQL）
👉 バックエンドが ユーザーのリクエストを受け取り → PostgreSQLにSQLを投げ → 結果を返す という流れ。

例2: Prismaと組み合わせる
PostgreSQL に直接SQLを書かなくても、ORM (Prisma) を使えば
TypeScriptから型安全にアクセスできる。

例3: Supabaseと組み合わせる
Supabaseは PostgreSQL をクラウドでホスティングして
認証・ストレージ・APIを全部まとめて提供する。

✅ まとめ
PostgreSQLは単体で使える（SQLで直接操作できる）。
でも、アプリ開発では 他のツールと組み合わせるのが普通。
組み合わせる相手は用途によって違う：

ORM（Prisma, Sequelize, TypeORMなど）
バックエンドフレームワーク（Rails, Django, Expressなど）
クラウドサービス（Supabase, Heroku, AWS RDSなど）

💡イメージとしては：
PostgreSQL = 大きな倉庫（データを保管できる）
他のツール = 倉庫から荷物を出し入れするためのトラックや人
倉庫単体でも存在できるけど、現実の物流（アプリ開発）では必ずトラックや人（他ツール）と一緒に使う、という感じです 🚚📦



🧩 PostgreSQLの基本概要
開発開始：1986年、カリフォルニア大学バークレー校で「POSTGRES」としてスタート
現在の名称：1996年に「PostgreSQL」に改名
最新バージョン：2023年時点で「PostgreSQL 16」がリリース

🔧 主な特徴
特徴	                内容
🆓 オープンソース	   BSDライセンスで無料利用可能。商用でも使える
🧠 高機能	         トランザクション、全文検索、ストアドプロシージャ、並列クエリなど
🌐 標準SQL準拠	    SQL標準に忠実で、移植性が高い
🗣 日本語対応	       バージョン6.3以降、日本語を含むマルチバイト文字に対応
🔌 拡張性	          pgpool-II、Slony-I、PGClusterなどOSSとの連携が豊富
🏢 商用利用にも強い	 高可用性・堅牢性・パフォーマンスに優れ、大規模システムにも対応

🆚 他のDBとの違い
比較項目	        PostgreSQL	          MySQL	              Oracle
ライセンス	      BSD（自由度高）	      GPL（制限あり）	    商用（高額）
拡張性  	        高い	               中程度	            非常に高い
標準SQL準拠	      ◎	                  △（独自仕様あり）	  ◎
商用サポート	    あり（複数企業が提供）	あり（Oracle社）	Oracle社が提供

🧠 どんな場面で使われる？
Webアプリケーションのバックエンド（例：Django, Rails）
データ分析基盤（ETL、BIツール連携）
金融・医療・行政などのミッションクリティカルな業務システム
教育・研究機関のデータ管理

📚 学び方・使い方
ローカル環境にインストールして psql コマンドで操作
GUIツール（pgAdminなど）で視覚的に管理
SQLの基本を学びながら、PostgreSQL特有の機能（CTE, JSON型, 拡張モジュールなど）を習得


🧩 SQLとは
SQL（エスキューエル、またはシークェル）とは、Structured Query Language（構造化問い合わせ言語）の略で、リレーショナルデータベース（RDB）を操作するための標準的な言語です。
簡単に言えば、データベースと会話するための言語です2。

🧠 SQLでできること
SQLは、以下のような操作を簡潔な文法で実現します：

操作	    目的	        例
SELECT	データの検索	SELECT * FROM users;
INSERT	データの追加	INSERT INTO users (name) VALUES ('Junichi');
UPDATE	データの更新	UPDATE users SET name = 'J' WHERE id = 1;
DELETE	データの削除	DELETE FROM users WHERE id = 1;

🧩 SQLの3つの分類
SQLは機能ごとに以下の3つに分類されます2：

分類	  名前	      主なコマンド
DDL	データ定義言語	CREATE, ALTER, DROP
DML	データ操作言語	SELECT, INSERT, UPDATE, DELETE
DCL	データ制御言語	GRANT, REVOKE, COMMIT, ROLLBACK

🏛 SQLが使われる場面
Webアプリのバックエンド（例：ログイン情報の取得）
データ分析（売上集計、ユーザー行動分析）
業務システム（在庫管理、顧客情報の更新）
AIの前処理（データの抽出・整形）

🧠 SQLの思想と構造
SQLは「テーブル（表）」という構造をベースにしています：
テーブル：行と列で構成されるデータの集合
行（レコード）：1件のデータ
列（カラム）：属性（名前、年齢など）
主キー：行を一意に識別するための列
外部キー：他のテーブルとの関連を示す
この構造により、複雑なデータも整理・検索・集計が可能になります。

🧭 SQLはプログラミング言語ではない？
厳密には、SQLは「宣言型言語」であり、命令を記述するだけで処理内容を指定できるものです。
CやPythonのように「手続き」を書くわけではありません。

🌍 どんなデータベースで使える？
SQLは以下のような主要なRDBMSで使えます：
PostgreSQL
MySQL
Oracle Database
Microsoft SQL Server
SQLite
どれもSQL文法をベースにしているため、習得すれば多くのDBに応用可能です。

✅ SQLシェル（SQL Shell）
データベースに対して直接SQLコマンドを入力して操作できる対話型のコマンドラインツールです。
代表的なのは PostgreSQL の psql や Oracle の SQL*Plus など。
目的に応じて使い方が変わりますが、ここでは代表的な使い方をざっくり紹介します。

🐘 PostgreSQL の SQL Shell（psql）
✅ 起動方法（Windowsの場合）
PostgreSQLをインストールすると「SQL Shell (psql)」が付属します。
スタートメニューや検索窓で「SQL Shell」または「psql」と入力
起動すると以下のようなプロンプトが表示されます：

コード
Server [localhost]:
Database [postgres]:
Port [5432]:
Username [postgres]:
Password for user postgres: 

pass1226 パスワードを入力欄は入力してもなんも変化がないが、入力されているので続けて入力すること。

✅ よく使うコマンド
sql
CREATE DATABASE mydb;
\c mydb               -- データベースに接続
CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);
INSERT INTO users (name) VALUES ('Junichi');
SELECT * FROM users;
\q                    -- 終了

🔧 主な機能と操作例
機能カテゴリ	    内容例
データベース操作	作成・削除・一覧表示（例：CREATE DATABASE、\l）
テーブル操作	    作成・削除・構造確認（例：CREATE TABLE、\d）
データ操作	      挿入・更新・削除・検索（例：INSERT INTO、SELECT）
ユーザー管理	    権限の確認・設定（例：\du）
ファイル操作	    SQLファイルの読み込み・結果の出力（例：\i ファイル名.sql、\o 出力.txt）
接続管理	        データベースへの接続・切り替え（例：\c データベース名）

🧙 Oracle の SQL*Plus + シェルスクリプト
Oracle環境では、SQL*Plus を使ってシェルスクリプト内でSQLを実行できます。たとえば：

bash
#!/bin/sh
sqlplus -s / as sysdba <<EOF
SELECT host_name, instance_name, status FROM v\$instance;
EXIT;
EOF
このように ヒアドキュメント を使って SQL を埋め込むことで、バッチ処理や自動化が可能になります。

🧠 Tips
・PostgreSQLなら psql を使って CLI から直接データベース設計・操作が可能。
・Oracleなら SQL*Plus をシェルスクリプトと組み合わせて、運用系の自動化に活用できる。


🧠 初期データベースの構造と役割
データベース名	役割	                      削除・編集の可否	                    ポイント
postgres	    作業用の汎用データベース。    初期接続先として使われることが多い。	✅ 編集・テーブル作成可能	初学者が最初に使うのに最適
template1	    新しいDB作成時のテンプレート。CREATE DATABASE で使われる。	      ⚠ 編集可能だが慎重に	テンプレートの仕組みを学ぶ教材に使える
template0	    完全な初期状態のテンプレート。ロケール変更時などに使用。	          ❌ 編集・接続は制限あり	システム保護のための存在。「触らない」こと



PostgreSQL(psql)のコマンドが覚えられない全ての人へ
https://www.youtube.com/watch?v=78u1V4iFPd4