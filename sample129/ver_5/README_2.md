.envファイル .env.exampleファイル ライブラリphpdotenv  20250717

✅ 1. phpdotenvってなに？
.env ファイルに書かれた 環境変数（設定情報）を読み込むライブラリ です。

PHPは標準で .env ファイルを読み取る機能がないため、phpdotenv を使って .env に書いた設定を $_ENV や getenv() で使えるようにします。

✅ 2. なんで必要なの？
セキュリティのため、パスワードやAPIキーなどの機密情報はソースコードに書かず、.env ファイルに分けて管理します。

🔴 ダメな例（セキュリティ上危険）
php
$mail_password = 'MySuperSecretPassword';  // ←これダメ！
✅ 良い例（phpdotenvを使う）
env
SMTP_PASS=MySuperSecretPassword
php
$mail_password = $_ENV['SMTP_PASS'];
✅ 3. 使い方（基本ステップ）
① インストール（Composerで）
bash
composer require vlucas/phpdotenv

② .envファイルをプロジェクト直下に作成
env
SMTP_HOST=smtp.example.com
SMTP_USER=myuser@example.com
SMTP_PASS=MySuperSecretPassword
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
※「=の後にスペースを入れない」よう注意。

③ PHPコードで読み込み
php
require_once __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__); // ← プロジェクトのルートパス
$dotenv->load();

// こうして値を使う
$mail_host = $_ENV['SMTP_HOST'];
$mail_pass = $_ENV['SMTP_PASS'];

✅ 4. セキュリティ対策
.envファイルは絶対に公開しないように、.gitignore に入れます。

gitignore
.env
.env.example のように中身を空にした雛形ファイルを作って共有するのが一般的です。

✅ 5.               よくある用途
使用目的	        読み込む例
メール設定	        SMTP_HOST、SMTP_USER、SMTP_PASS
reCAPTCHAキー	    RECAPTCHA_SECRET_KEY
データベース接続	 DB_HOST、DB_NAME、DB_USER、DB_PASS
APIキー	            STRIPE_API_KEY、GOOGLE_MAPS_API_KEY

✅ 6. 補足：古いPHPバージョンとの互換性
phpdotenv バージョン 5.x は PHP 7.1以上 が必要です。
PHP 8 でも動作します。

✅ まとめ
項目	        内容
ライブラリ名	vlucas/phpdotenv
主な役割	    .env ファイルを読み込み、PHPから使えるようにする
主な利点	    機密情報の管理が安全かつ柔軟になる
使い方	        composer → .env作成 → autoload.php読み込み


































✅ .envファイルについて

アプリケーションの環境変数を定義するためのファイルです。
主に開発や運用の際に、設定情報や機密情報（APIキー、データベース接続情報など）をコードとは分離して管理するために使われます。

✅ .envファイルの特徴
拡張子は .env

キーと値のペアで記述（例：KEY=value）

通常はプロジェクトのルートディレクトリに置く

Gitなどのバージョン管理には含めないのが一般的（.gitignoreに追加）

🟥 .envは 「environment」（環境）の略です。

より正確には、.env は 「environment variables file」（環境変数ファイル）を意味する慣習的な名前です。
ファイル名の先頭にドット（.）が付いているのは、Unix系のシステムで「隠しファイル」として扱うためです。

🧠 用語の分解
部分	意味
.	    隠しファイル（Unix系の慣習）
env	    environment（環境）

💡「環境変数」って何？
環境変数とは、OSやアプリケーションの動作環境に関する設定情報のことです。

例えば：
実行環境（開発・本番など）
データベースの接続情報
外部サービスのAPIキー
これらをコードに直接書かず、.envファイルにまとめておくことで、柔軟で安全な設定管理が可能になります。


🛠 .envファイルのよくある記述例
env
# データベース設定
DB_HOST=localhost
DB_PORT=5432
DB_USER=myuser
DB_PASSWORD=secretpassword

# APIキー
API_KEY=abcdef123456

# 実行環境
NODE_ENV=development

🚀 使用例（Node.js + dotenvライブラリ）
Node.jsでは、dotenvというライブラリを使って.envファイルの内容を読み込むことができます。

javascript
require('dotenv').config();

console.log(process.env.DB_HOST); // localhost

🔒 なぜ使うの？
セキュリティ向上：コードに直接パスワードやAPIキーを書かない

環境ごとの切り替えが簡単：開発・テスト・本番環境で設定を分けられる

チーム開発で便利：個々の開発者が自分の環境に合わせて設定できる



✅ .env.exampleファイルについて

.env.exampleファイルは、.envファイルのテンプレートやサンプルとして使われるファイルです。
主に以下の目的で利用されます：

📦 .env.exampleの役割
✅ 必要な環境変数の一覧を示す

🧑‍💻 チームメンバーや他の開発者に設定項目を共有する

🚫 機密情報は含めない（パスワードやAPIキーは空欄やダミーにする）

📝 例：.env.exampleの内容
env
# データベース設定
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=

# APIキー（ダミー値）
API_KEY=your-api-key-here

# 実行環境
NODE_ENV=development
このファイルを見た人は、「あ、こういう環境変数を設定すればいいんだな」と理解できます。

🛠 使い方の流れ
プロジェクトに .env.example を含める（Gitで共有OK）

開発者はこれをコピーして .env ファイルを作成する：

bash
cp .env.example .env
.env に自分の環境に合わせた値を設定する

🔐 セキュリティ上の注意
.env.example は 共有してOK 
.env は 共有しない（.gitignoreに追加）


✅ .envファイルの目的

用途：バックエンドで使用する機密情報を安全に管理するため。

使う場所：send.php（メール送信処理やreCAPTCHA検証など）

例：
ini
RECAPTCHA_SECRET_KEY=xxxxxxx
SMTP_HOST=smtp.example.com
SMTP_USER=username
SMTP_PASS=password

✅ サイトキー（Site Key）の扱い

用途：reCAPTCHAのフロント側でトークンを取得するために使用。

使う場所：index.html や script.js（ユーザーの操作時にreCAPTCHAを動かす）

記述例（HTML内）：

html
<script src="https://www.google.com/recaptcha/api.js?render=サイトキー"></script>
🛡 セキュリティ観点の補足

.envファイルは公開リポジトリに絶対に含めない（.gitignoreに追加）。

サイトキーは公開しても問題ないが、シークレットキーは絶対にフロントで使わない。

✅ reCAPTCHAの「サイトキー」と「シークレットキー」の役割
🟡 サイトキー（Site Key）
公開してもよいキー
フロントエンド（HTMLやJavaScript）で使う
ユーザーのブラウザでreCAPTCHAウィジェットやトークン発行に使う
例：6LfKOoQrAAAAAF3803H5UvwNyeYrGleM93KVGVOQ

🟡シークレットキー（Secret Key）
絶対に公開してはいけないキー
サーバーサイド（PHPなど）でのみ使う
reCAPTCHAの「検証API」に問い合わせるときに使う
例：6LfKOoQrAAAAAJrnu1ZHDwoKXvoUa8UiEw_HGItI

🟡 なぜ「シークレットキー」はフロントで使わないのか？
シークレットキーは「reCAPTCHAの検証API」にアクセスするためのパスワードのようなものです。
もしフロントエンド（HTMLやJS）に書いてしまうと、誰でも簡単に見れてしまい、悪用されるリスクがあります。
そのため、サーバーサイド（send.php）でのみ使い、絶対に外部に漏れないようにします。

具体的な流れ
フロントエンド
サイトキーを使ってreCAPTCHAトークンを取得
そのトークンをフォームと一緒にサーバー（send.php）へ送信
サーバーサイド（send.php）
受け取ったトークンと「シークレットキー」を使ってGoogleのAPIに「このトークンは本物か？」を問い合わせる
結果がOKならメール送信などの処理を実行

🟡 まとめ
サイトキーは「公開用」なのでフロントで使う
シークレットキーは「認証用」なのでサーバーだけで使う
セキュリティのため、シークレットキーは絶対に外部に出さない