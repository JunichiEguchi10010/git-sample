WebDesing PHPMailer（SMTP認証）メールライブラリ 問い合わせフォーム 20250708

📂 フォルダ構成
contact-form/
├── index.html
├── style.css
├── script.js
├── send.php
└── vendor/         ← composer install用（PHPMailer）

💡 疑似コード
1. HTMLでフォームを作成する（名前・メール・本文）
2. JavaScriptで送信ボタン押下時に「送信中...」など表示
3. フォームの送信先は send.php に設定
4. send.phpではPOSTされた値をバリデーション（空チェック、エスケープ）
5. PHPMailerを使い、SMTPでメールを送信
6. 成功時は「送信完了」メッセージを返す



✅ 実務で想定されるの発展例
Google reCAPTCHA v3の導入
自動返信メール（$mail->addReplyTo()や別インスタンスで）
添付ファイル機能（$mail->addAttachment()）
ログ保存（DBやCSVに問い合わせ履歴を保存）
サンクスページへのリダイレクト