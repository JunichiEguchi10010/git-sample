WebDesgin「サンクスページにリダイレクトする」フォーム 20250720

# セキュアな問い合わせフォーム

## 概要
reCAPTCHA v3、PHPMailer、Dotenvを使用したセキュアな問い合わせフォームです。

## 機能
- リアルタイムバリデーション（JavaScript）
- reCAPTCHA v3によるスパム対策
- PHPMailerによるSMTPメール送信
- 自動返信メール
- 環境変数による設定管理
- セキュリティ対策（サニタイズ、バリデーション）

## セットアップ

### 1. 依存関係のインストール
```bash
composer install
```

### 2. 環境変数の設定
`env.example`を`.env`にコピーして設定を編集：
```bash
cp env.example .env
```

`.env`ファイルの設定例：
```
RECAPTCHA_SECRET=6LcEXAMPLE_SECRET_KEY

SMTP_HOST=smtp.example.com
SMTP_USER=webmaster@example.com
SMTP_PASS=your_smtp_password
SMTP_PORT=587
SMTP_SECURE=tls
```

### 3. reCAPTCHA設定
1. [Google reCAPTCHA](https://www.google.com/recaptcha/admin)でサイトを登録
2. サイトキーを`index.html`の`6LcEXAMPLE_SITE_KEY`部分に設定
3. シークレットキーを`.env`の`RECAPTCHA_SECRET`に設定

### 4. SMTP設定
メール送信に使用するSMTPサーバーの情報を`.env`に設定

## ファイル構成
- `index.html` - お問い合わせフォーム
- `script.js` - フロントエンドバリデーション・reCAPTCHA
- `style.css` - フォームスタイル
- `send.php` - バックエンド処理（メール送信）
- `thanks.html` - 送信完了ページ
- `env.example` - 環境変数設定例
- `composer.json` - PHP依存関係

## セキュリティ機能
- 入力値のサニタイズ
- サーバーサイドバリデーション
- reCAPTCHA v3によるボット対策
- CSRF対策（reCAPTCHAトークン）
- 環境変数による機密情報管理

## 使用方法
1. フォームに必要事項を入力
2. reCAPTCHAが自動実行される
3. 送信ボタンをクリック
4. 管理者とユーザーにメール送信
5. 完了ページにリダイレクト 