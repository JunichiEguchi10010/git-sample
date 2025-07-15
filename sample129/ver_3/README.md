PHPMailer  reCAPTCHA v3 スパム(BOT)対策・自動返信付きのお問い合わせフォーム 20250714


✅ reCAPTCHA v3とは？
スパムやボットからフォームを守るためのGoogle提供のセキュリティ機能です。
v3は「私はロボットではありません」のチェックが不要で、ユーザーの行動をスコアで評価して判断します。

https://www.google.com/recaptcha/admin/create←キーの作成
https://developers.google.com/recaptcha?hl=ja

/contact-form/
├─ index.html         ← フォーム（HTML + reCAPTCHA v3）
├─ style.css          ← スタイル
├─ script.js          ← フォーム送信時のメッセージ表示
└─ send.php           ← メール送信処理（管理者 + 自動返信 + reCAPTCHA検証）


✅ reCAPTCHAの準備（重要）
Google reCAPTCHA v3 管理画面にログイン
https://www.google.com/recaptcha/admin

ドメインを登録して、以下を取得

サイトキー（sitekey）
6LfKOoQrAAAAAF3803H5UvwNyeYrGleM93KVGVOQ
シークレットキー（secretkey）
6LfKOoQrAAAAAJrnu1ZHDwoKXvoUa8UiEw_HGItI

各ファイルの以下を置き換えてください：
🟥 html､js､phpそれぞれキーを置き換えるところがあるので要確認

記述	                        差し替え内容
【あなたのサイトキー】	       reCAPTCHAのサイトキー（例: 6Labc...）
【あなたのシークレットキー】	シークレットキー（例: 6Labc...）

✅ テスト方法
上記ファイルを /contact-form フォルダに保存

ターミナルで起動：
bash
php -S localhost:8000
ブラウザでアクセス：

bash
http://localhost:8000/index.html

✅ 補足
vendor/ ディレクトリは ComposerでPHPMailerをインストール済みであることが前提です。
composer require phpmailer/phpmailer を事前に実行してください。


✅ Google reCAPTCHA v3 に対応しているコード
対応しているのは、以下の2つのコード部分です。

✅① index.html 内の reCAPTCHAトークン取得部分
html
<!-- reCAPTCHA v3のスクリプト -->
<script src="https://www.google.com/recaptcha/api.js?render=【あなたのサイトキー】"></script>
このスクリプトにより、ページ読み込み時に GoogleのreCAPTCHA v3スクリプトが読み込まれます。

そして JavaScript 側で：
javascript
grecaptcha.ready(function () {
  grecaptcha.execute('【あなたのサイトキー】', { action: 'submit' }).then(function (token) {
    document.getElementById('recaptchaToken').value = token;
    form.submit();
  });
});
この部分で、
トークン（token）を取得
フォームの <input type="hidden" name="token"> に代入
トークン付きで send.php に送信
を行っています。

🟥 わかりやすく解説
🧠 目的 ユーザーがフォームを送信する前に、reCAPTCHA v3 を使って「この操作は人間かどうか」を判断するための トークンを取得します。
🔧 やっていること
ページに Google reCAPTCHA v3 の スクリプトを読み込み
スクリプトが準備できたら grecaptcha.execute() で トークンを発行（このトークンが「人間っぽさの証」になります）
token を <input type="hidden" name="token"> に 格納
最後にフォームを 自動で送信

✅② send.php 内の reCAPTCHA検証コード
php
$secretKey = '【あなたのシークレットキー】';
$verifyURL = 'https://www.google.com/recaptcha/api/siteverify';

$recaptcha = file_get_contents($verifyURL . '?secret=' . $secretKey . '&response=' . $token);
$response = json_decode($recaptcha);

if (!$response->success || $response->score < 0.5) {
  exit('スパムの可能性が高いため、送信をブロックしました。');
}
ここで何をしているかというと：
POSTされた token を、Googleの検証API へ送信
Googleから返ってきたレスポンスを $response->score で評価
スコアが低ければ「スパム」判定して送信を中止します

🟥 わかりやすく解説
🧠 目的 reCAPTCHAが発行したトークンを Google に送って、送信者が「スパムかどうか」を スコアで判定します。
🔧 やっていること
Googleの検証用API (siteverify) に、トークンと秘密鍵を送る
Googleが返してきたレスポンスの score を確認（0.0〜1.0で評価）
スコアが 0.5未満だったらスパムと判定 → 処理をストップ
success が false の場合も送信中止

📊 スコアとは？
1.0 に近いほど「人間らしい操作」
0.0 に近いと「ボットっぽい、不正の可能性がある操作」


✅ まとめ
対応しているコード	                                                        内容	                        ファイル
<script src="https://www.google.com/recaptcha/api.js?render=...">	GoogleのreCAPTCHAライブラリを読み込む	index.html
grecaptcha.execute(...).then(token => ...)	                        トークンを取得してフォームに追加	     script.js
file_get_contents(...verify) & json_decode(...)	                    トークンをGoogleに送信して検証する	     send.php
if ($response->score < 0.5)	                                        スパム判定（スコア0.0〜1.0）            send.php

✅ 注意点
**v3は“見えないreCAPTCHA”**です。バッジが表示されるだけで、チェックボックスは出ません。

スコアが低い（例：0.2）と自動でブロックします。しきい値（0.5など）は調整可能です。


 ✅ Google reCAPTCHA v3 を使っている場合、メールの送信元が Gmail ではない（例：独自ドメインやYahooメールなど）のとき、どうすればいいのか？

✅ 結論：
🔸 Google reCAPTCHA v3 は、送信元メールアドレスが Gmail かどうかに関係なく使用できます。
📬 メールの送信元（例：info@example.com）と、reCAPTCHA の使用は完全に別物だからです。

✅ 関係を整理すると：
項目	                            内容・用途
✅ Google reCAPTCHA v3	  スパム防止。フォームが bot から送信されていないか判定する
📧 メール送信元	PHPMailer   などで使う送信アドレス（例：Gmailや独自ドメイン）
🔒 SMTPサーバー	            実際にメールを送るサーバー（Gmail, Xserver, ConoHaなど）

✅ 例：独自ドメインメールで送るケース
たとえばあなたが以下のように送信したい場合：
送信元：contact@egcdesign.jp（独自ドメイン）
SMTP：XserverやConoHaなどのメールサーバー
フォーム：Google reCAPTCHA v3 を使いたい
これは何の問題もなく併用可能です！

✅ 対応方法（簡略）
reCAPTCHA v3 の導入：
Google reCAPTCHA の管理画面で ドメインを登録（例：egcdesign.jp）
サイトキーとシークレットキーを取得し、index.html と send.php に組み込む
PHPMailerの設定：
Gmailではなく、使用中のメールサーバーのSMTP情報を使う（例：XserverのSMTP）

例（Xserver）：
php
$mail->Host = 'sv○○.xserver.jp';
$mail->Username = 'contact@egcdesign.jp';
$mail->Password = 'メールパスワード';
$mail->Port = 465;
$mail->SMTPSecure = 'ssl';
✅ まとめ
内容	                                                    答え
Google reCAPTCHA v3 は Gmail 以外でも使える？	         ✅ はい、使えます。送信元は関係ありません
独自ドメインのメールと併用できる？	                       ✅ はい、SMTPの設定を変えるだけでOK
注意点は？	ドメイン名が reCAPTCHA に登録されていること。   メールはSPF/DKIM対策もあると安心。

発展例：
Xserver、さくら、ConoHa、ムームーメールなどのSMTP設定も準備する。