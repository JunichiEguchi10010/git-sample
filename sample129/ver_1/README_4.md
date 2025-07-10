PHPMailer × Gmail × ローカルPHPサーバー開発
～ お問い合わせフォームをローカルで構築・テストする方法 ～ 20250710

🧱 1. 開発に必要な環境
ツール	用途
PHP	                PHPスクリプトを動かすための実行環境
Composer	        ライブラリ管理（PHPMailer導入）
CursorやVS Code	    コーディング
Gmail + アプリパスワード	SMTPメール送信に必要

📂 2. プロジェクト構成（例）
pgsql
コピーする
編集する
/project-folder/
├── index.html      ← フォームページ
├── send.php        ← PHPMailerによる送信処理
├── style.css       ← フォームのスタイル
├── script.js       ← 「送信中です…」表示
├── vendor/         ← Composer導入後に生成
└── composer.json   ← Composer設定ファイル

📦 3. PHPMailerの導入手順
ターミナルで以下を実行：
bash
composer require phpmailer/phpmailer

🔑 4. GmailのSMTP設定方法（アプリパスワード発行）
必要条件：
2段階認証を有効にしていること

手順：
Googleのアプリ パスワードページへアクセス
「メール」+「Windowsパソコン」など選び発行
出力された 16桁のコード（例：liac cngo uowh cbrq）をコピー
send.php の $mail->Password にペースト（スペース除去）

💌 5. send.php でのSMTP設定例
php
$mail->isSMTP();
$mail->Host       = 'smtp.gmail.com';
$mail->SMTPAuth   = true;
$mail->Username   = 'あなたのGmailアドレス';
$mail->Password   = 'アプリパスワード'; // スペース除く
$mail->SMTPSecure = 'ssl'; // or 'tls'
$mail->Port       = 465;   // ssl→465, tls→587

🖥️ 6. PHP開発サーバーでローカルテスト
✅ コマンド：php -S localhost:8000
PHPが持っている「開発用の簡易ウェブサーバー」を起動するコマンド。

意味と構成：
bash
php       ← PHPのコマンド
-S        ← Serverモードで起動
localhost:8000 ← PCの8000番ポートで受け付ける
簡単に言うと：
PHPファイルをブラウザで動かすための一時的なミニサーバーを立ち上げるコマンドです。

✅ よく使うケース
使う場面	                    目的
HTML+PHPフォームをテスト	    send.php でメール送信確認
サーバーにアップ前の動作確認	 デザインやロジックのチェック
XAMPPを使いたくない	            簡易にPHPを実行したいときに便利

✅ 起動後の動作
index.html などが置かれているフォルダで実行
ブラウザでアクセス：

bash
http://localhost:8000/index.html
フォーム送信で send.php が動き、PHPMailerが実行される

✅ 注意点
Live ServerではPHPが動かない（静的ファイル専用）
php -S はあくまで 開発・テスト用
ポート番号は自由に変更可能（例：php -S localhost:3000）

❗ よくあるエラーと対策
エラー	                    対処法
Not Found	ph          p -S を間違ったフォルダで起動している
SMTP connect() failed	アプリパスワード・ポート・セキュリティ方式の確認
白い画面	             PHPエラー。$e->getMessage()で内容を表示する

💡 今後の拡張案
自動返信メール（送信者にも内容を送る）
reCAPTCHA v3 でスパム対策
HTMLメール化
.env に機密情報を分離（セキュア化）

✅ 最後に一言まとめ
フォームからのメール送信をローカルで完結したいなら、php -S localhost:8000 を使うのが最も手軽！
PHPMailer × Gmailの組み合わせで、どこにいてもテスト可能。