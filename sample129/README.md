メール送信用ライブラリ PHPMailer smtpjs PEAR::Mail Qdmail 20250707


🔸1. PEAR::Mail（ピア・メール）🟥 非推奨
✅ 概要 
PEAR（PHP Extension and Application Repository）は、PHPの再利用可能なライブラリ集。
その中の PEAR::Mail はメール送信用ライブラリ。
PHP 4～5時代に広く使われていました。

✅ 特徴
安定しているが、古く、最近のプロジェクトではあまり使われません。
Mail, Mail_Mime パッケージと組み合わせて、HTMLメールや添付ファイルも対応可。
SMTPサーバーを指定してメール送信可能。

✅ 使いどころ
レガシーPHPシステムの保守で、既にPEARが組み込まれている場合に限り有用。
新規開発では非推奨（代替はPHPMailerやSymfony Mailer）。

🔸2. Qdmail（キューディーメール）🟥 非推奨 
✅ 概要
PHPで日本人が開発したメールライブラリ。
日本語メール・マルチバイトに強く、HTMLや添付も得意。

✅ 特徴
日本語（マルチバイト文字）を自動エンコード処理してくれる。
HTML、テキストのマルチパート送信、添付ファイルも対応。
PHPの mbstring 拡張と連携。

✅ 使いどころ
日本語メールを確実に送信したい時。
文字化けの心配があるPHPプロジェクト。
現在はあまりメンテナンスされていないため、新規案件では非推奨（PHPMailerで十分対応可能）。

🔸3. PHPMailer（MAILER）🔴🔴🔴推奨🔴🔴🔴
✅ 概要
PHPで最も有名なメール送信用ライブラリ。
WordPressや多くのCMSでも内部利用されている。

✅ 特徴
SMTP認証・SSL/TLS対応。
HTMLメール・添付・BCC・マルチパートも簡単に設定可能。
エラー処理もしやすい。
composerからインストール可能でメンテも活発。

✅ 使いどころ
新規のPHPアプリケーションでメール送信するなら最優先の選択肢。
HTMLメール・添付ファイルを含む、あらゆるメール送信用途に対応。
信頼性と柔軟性が高い。

🔸4. smtpjs（SMTP.js）
✅ 概要
JavaScriptでメールを直接送信できるライブラリ。
クライアントサイド（ブラウザ）からメールを送れるのが特徴。

✅ 特徴
外部SMTPサービス（例：ElasticEmailやSendGrid）を使って送信。
送信にはAPIキーが必要。
PHP不要で、JSだけで実装可能
🔴ただしセキュリティ的に注意が必要（APIキーを公開してしまわないように）。

✅ 使いどころ
小規模な静的Webサイトの問い合わせフォーム。
バックエンドを持たないプロジェクト（HTML+JSのみ）。
ただし、本番運用ではセキュリティ対策を必ず実施すること。

🔁 まとめ比較表
ライブラリ	   言語	        特徴	                  推奨度	    日本語対応	                  用途例
PEAR::Mail	  PHP	        古い、安定	           ★☆☆☆☆	  △（対応するが手間）	         レガシー保守
Qdmail	      PHP	        日本語に強い、シンプル	★★☆☆☆	   ◎	                        日本語メール中心の旧案件
PHPMailer	    PHP	        現役、豊富な機能	      ★★★★★	   ◎	                        新規PHP案件の標準
smtpjs	      JavaScript	PHP不要、軽量	         ★★☆☆☆	  △（エンコード対応に工夫必要）	静的サイトのお問い合わせフォーム

💡補足：おすすめの選び方
🟥 PHPで新規開発 → PHPMailer
🟥 JavaScriptだけでメールを送りたい → smtpjs（ただしセキュリティ対策必須）

日本語メール中心で、簡単に済ませたい → Qdmail（ただし古い）
古いPHPシステムの保守 → PEAR::Mail（触らざるを得ない時のみ）


❓ 静的サイトで企業用ホームページ10P程度で通常はPHP不要の場合でも、問い合わせフォームでPHPMailerを使用するのが良いですか？
✅ はい、企業用の静的サイトでも問い合わせフォームを設置するなら、サーバー側にPHPを導入してPHPMailerを使うのが最も信頼性が高く、おすすめです。

🔎 理由を詳しく解説します：
✅ 1. セキュリティ面で安心
フロントエンドだけで送るsmtpjsなどはAPIキーをJS内に書かないといけない＝漏洩リスク大。
PHPMailerはサーバー側（非公開）でメール送信処理を実行するので安全。

✅ 2. 信頼性が高く、スパム判定されにくい
企業サイトでは、メールが確実に届くことが非常に重要です。
PHPMailerはSPF/DKIM/SMTP認証を適切に設定できるので、Gmailなどに正しく届きやすい。
smtpjs経由だと、送信元偽装やスパム扱いされやすいケースが多い。

✅ 3. 拡張性・柔軟性が高い
管理者宛とユーザー宛の自動返信メールの送信や、
**ファイル添付（PDF、画像など）**も簡単に対応できる。
エラーハンドリングやバリデーションも自在。

🚫 静的サイト＋JavaScriptだけでフォーム送信するリスク
方法	                    メリット	                      デメリット
smtpjsなど	            PHP不要、サーバーいらず	        APIキー漏洩、スパム送信の危険、到達率が低い
Googleフォームなど	    実装が簡単	                    デザインが限定、企業向けのブランド感に合わない
Netlify Formsなど	     静的ホスティングと相性良し	      英語UI、学習コスト、ログ制限あり

✅ 実務でのおすすめ構成（企業サイト＋問い合わせフォーム）
**静的ページ（HTML/CSS/JS）**で全体を構築
フォーム送信部分だけPHPを使って処理（送信先を contact.php など）
サーバーにはPHPが使える環境（多くのレンタルサーバーでOK）
PHPMailerでSMTP認証付きでメール送信
Google reCAPTCHA v2/v3などでスパム対策も追加

✉️ PHPMailer利用の簡単な流れ
bash
composer require phpmailer/phpmailer
php
<?php
use PHPMailer\PHPMailer\PHPMailer;
require 'vendor/autoload.php';

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.example.com';
$mail->SMTPAuth = true;
$mail->Username = 'your@example.com';
$mail->Password = 'yourpassword';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->setFrom('your@example.com', '企業名');
$mail->addAddress('contact@yourcompany.com');

$mail->Subject = 'お問い合わせフォーム';
$mail->Body    = "お名前：{$_POST['name']}\nメール：{$_POST['email']}\n内容：{$_POST['message']}";

$mail->send();

✅ まとめ
目的	                                  最適な選択
信頼性・企業対応	                  ✅ PHPMailer（PHP＋SMTP）
JSだけで完結させたい（テスト・趣味）	⚠️ smtpjs（本番利用には注意）
外部サービスで代用	                 ⚠️ Googleフォーム・Netlify（簡単だけど制約あり）

静的サイトでも1ファイルだけPHPを導入することで、安心・安全・信頼性の高い問い合わせフォームが実現できます。

【PHP入門】メールを送信する方法(mail/mb_send_mail)
https://www.sejuku.net/blog/24658


php mb_send_mail から送信したメールがGmailに弾かれてしまう場合の対処2022年12月20日
https://qiita.com/kubothink/items/917fcde3dc218cdc896b


Qdmailで簡単メール送信（PHP）
この記事は最終更新日から5年以上が経過しています。
https://qiita.com/kotekichi/items/643fb5113005a6259767


PEAR::MailでSMTP送信に挑戦!|無事に動作したコピペで使えるコードを公開2018-10-04
https://pinkmonky.net/detail/?id=86

smtpjs公式
https://smtpjs.com/

Qdmail公式 2008/04/15
https://hal456.net/qdmail/