WebDesign PHPMailer reCAPTCHA v3対応 + HTMLメールの自動返信機能付き お問い合わせフォーム　20250716

サイトキー（sitekey）
6LfKOoQrAAAAAF3803H5UvwNyeYrGleM93KVGVOQ

シークレットキー（secretkey）
6LfKOoQrAAAAAJrnu1ZHDwoKXvoUa8UiEw_HGItI

グーグルアプリパスワード
liaccngouowhcbrq'

グーグルメールアドレス
m100010eguchi@gmail.com

パス
cd C:\Users\eguchijunichi\git-sample\sample129\ver_4\

ターミナルで起動：ローカルホスト立上げ
bash
php -S localhost:8000

phpmailerインストール（composer）
composer require phpmailer/phpmailer



「HTMLメール」とは、本文がHTML形式で記述されていて、メールクライアント上で装飾やレイアウトが反映されるメールのことです。

📁 ver_4/
├── index.html          ← フォーム画面（HTML＋reCAPTCHA埋め込み）
├── style.css           ← スタイル
├── script.js           ← フォーム送信時の動作（reCAPTCHA連携）
├── send.php            ← フォーム処理（PHP）
├── 🟥 mail_template.html  ← 自動返信メールテンプレート（HTML）

send.php
 // 自動返信メール（ここからHTMLメールの設定）
  $template = file_get_contents('mail_template.html');
  $htmlBody = str_replace(
    ['{{name}}', '{{email}}', '{{message}}'],
    [$name, $email, nl2br($message)],
    $template
  );
　// ここまでHTMLメールの設定

🧩 疑似コード
1. 「mail_template.html」というファイルを開いて、その中身（HTMLテンプレート）を読み込む。
   → 読み込んだ内容を「テンプレート」という変数に保存する。

2. テンプレートの中にある「{{name}}」「{{email}}」「{{message}}」という文字を探す。

3. それぞれの文字を、以下の値に置き換える：
   - 「{{name}}」 → ユーザーの名前（$name）
   - 「{{email}}」 → ユーザーのメールアドレス（$email）
   - 「{{message}}」 → ユーザーのメッセージ（$message）
     ※ メッセージ内の改行は、HTMLの改行タグ（<br>）に変換する。

4. 置き換えが完了したテンプレートを「htmlBody」という変数に保存する。


🧩 コードの解説
$template = file_get_contents('mail_template.html');
file_get_contents() は、指定したファイルの中身を 文字列として読み込む関数。
'mail_template.html' は、HTMLメールのテンプレートファイルの名前。
この行で、テンプレートファイルの内容を $template という変数に格納しています。

$htmlBody = str_replace(
  ['{{name}}', '{{email}}', '{{message}}'],
  [$name, $email, nl2br($message)],
  $template
);
🔄 str_replace() の役割
テンプレート内の プレースホルダー（{{name}} など）を実際の値に置き換える処理です。

🧷 第1引数: ['{{name}}', '{{email}}', '{{message}}']
テンプレート内で使われている 置き換え対象の文字列（プレースホルダー）。

📦 第2引数: [$name, $email, nl2br($message)]
プレースホルダーに 実際に挿入する値。

$name: ユーザーの名前

$email: ユーザーのメールアドレス

nl2br($message): ユーザーのメッセージ。改行を <br> タグに変換してHTML表示に対応

🧾 第3引数: $template
置き換えを行う 元のテンプレート文字列。

✅ 結果
$htmlBody に、プレースホルダーが実際の値に置き換えられた 完成したHTMLメール本文が格納されます。

✅まとめ
このコードは、テンプレートファイルを読み込み、ユーザー情報を埋め込んで、HTML形式のメール本文を作成しています。
 次のステップでは、この $htmlBody を使ってメール送信処理を行うことになります。