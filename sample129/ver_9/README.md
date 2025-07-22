# お問い合わせフォーム（その場で完了メッセージ表示・非同期送信・フェードイン）20250722

サイトキー（sitekey）
6LfKOoQrAAAAAF3803H5UvwNyeYrGleM93KVGVOQ

シークレットキー（secretkey）
6LfKOoQrAAAAAJrnu1ZHDwoKXvoUa8UiEw_HGItI

グーグルアプリパスワード
liaccngouowhcbrq'

グーグルメールアドレス
m100010eguchi@gmail.com

パス
cd C:\Users\eguchijunichi\git-sample\sample129\ver_7\

phpmailerインストール（composer）
composer require phpmailer/phpmailer

composer require vlucas/phpdotenv

ターミナルで起動：ローカルホスト立上げ
bash
php -S localhost:8000



## 概要
- fetchによる非同期送信
- 送信後thanks.htmlに遷移せず、その場で完了メッセージをフェードイン表示
- 入力欄は自動でクリア（form.reset）
- 完了メッセージは5秒後に自動で非表示
- reCAPTCHA v3・PHPMailer・Dotenvによるセキュアな実装

## 特徴
- ユーザー体験を重視したモダンなフォーム
- 送信後も同じページに留まり、次回送信もスムーズ
- 完了メッセージはアニメーションで視線誘導
- エラー時も画面上で即時フィードバック

## セットアップ

### 1. 依存パッケージのインストール
```bash
cd sample129/ver_9
composer install
```

### 2. 環境変数の設定
`env.example`を`.env`にコピーして編集してください。

```
RECAPTCHA_SECRET=6LcEXAMPLE_SECRET_KEY
SMTP_HOST=smtp.example.com
SMTP_USER=webmaster@example.com
SMTP_PASS=your_smtp_password
SMTP_PORT=587
SMTP_SECURE=tls
```

### 3. reCAPTCHAのサイトキー設定
- Google reCAPTCHA管理画面でv3のサイトキーを取得し、index.htmlとscript.jsの該当箇所に設定してください。

### 4. サーバー起動
```bash
php -S localhost:8000
```

## ファイル構成
- `index.html` ... お問い合わせフォーム本体＋完了メッセージ領域
- `style.css` ... フォーム・完了メッセージのデザイン、アニメーション
- `script.js` ... fetchによる非同期送信、バリデーション、完了メッセージ制御
- `send.php` ... バックエンド（バリデーション・reCAPTCHA・PHPMailer・自動返信）
- `env.example` ... 環境変数サンプル
- `.env` ... 実際の環境変数（git管理外）
- `.gitignore` ... .envやvendor/などを除外
- `composer.json` ... PHP依存パッケージ

## 使い方
1. フォームに入力し「送信」
2. 送信成功時はその場で完了メッセージがフェードイン表示
3. 入力欄は自動でクリア
4. 5秒後にメッセージが自動で消え、再度送信可能

## セキュリティ・実装ポイント
- クライアント・サーバー両方でバリデーション
- reCAPTCHA v3でスパム対策
- PHPMailerでSMTP送信（管理者・自動返信）
- .envで機密情報管理
- エラー時は画面上で即時フィードバック

## 補足
- 完了メッセージの表示・非表示はCSSアニメーションで実装
- thanks.htmlへの遷移やalertは使いません
- 送信処理が遅い場合はSMTPサーバーやreCAPTCHAの影響が大きいです

---

**このREADMEはver_8の内容をもとに、「その場で完了メッセージ表示・インプット欄クリア・フェードイン・自動非表示」バージョンに合わせて作成しています。** 

---

## ver_9 フォルダ構成

```
<code_block_to_apply_changes_from>
```

---

### 各ファイルの役割

- **index.html**  
  お問い合わせフォーム本体。送信後はthanks.htmlに遷移せず、その場で完了メッセージを表示。

- **style.css**  
  フォームや完了メッセージのデザイン、アニメーション。

- **script.js**  
  fetchによる非同期送信、バリデーション、完了メッセージの表示・非表示制御。

- **send.php**  
  サーバー側処理（バリデーション、reCAPTCHA検証、PHPMailerでメール送信、自動返信）。

- **env.example**  
  .envファイルのサンプル（SMTPやreCAPTCHAの設定例）。

- **.gitignore**  
  .envやvendor/など、バージョン管理しないファイル・ディレクトリを指定。

- **composer.json / composer.lock**  
  PHP依存パッケージ管理ファイル。

- **README.md**  
  セットアップ手順、使い方、特徴、セキュリティ説明。

- **vendor/**  
  composer installで生成される依存パッケージ（PHPMailer, Dotenvなど）。