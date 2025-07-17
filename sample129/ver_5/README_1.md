WebDesign PHPMailer reCAPTCHA v3対応 + HTMLメールの自動返信機能付き お問い合わせフォーム
機密情報（Gmailアドレス、パスワード、reCAPTCHAキーなど）を .env に分離してセキュア化した構成 2050717

機密情報（SMTP認証情報やreCAPTCHAキーなど）を .env に分離し、PHPから読み込む構成で、以下のようなセキュアで保守しやすい構成です。

📁 ver_5/
├── index.html               ... お問い合わせフォーム（reCAPTCHA v3対応）
├── style.css                ... スタイリング
├── script.js                ... フロントJS（reCAPTCHAトークン発行）
├── send.php                 ... メール送信処理（PHPMailer + reCAPTCHA + .env読込）
├── mail_template.html       ... HTMLメールテンプレート
├── .env                     ... 機密情報ファイル（※絶対にGitで公開しない）
├── .env.example             ... 雛形（共有用）
├── vendor/                  ... PHPMailerなど（composer）
├── composer.json
