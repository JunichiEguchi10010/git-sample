✅ サーバーサイド バリデーション send.phpコード解説 20250720
<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

mb_language("Japanese");
mb_internal_encoding("UTF-8");

// .env読み込み
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// 入力の整形と取得
function h($str) {
  return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');
$token   = $_POST['token'] ?? '';

// バリデーション（サーバー側の最終確認）
$errors = [];

if (empty($name) || mb_strlen($name) < 2 || mb_strlen($name) > 50 || !preg_match('/^[ぁ-んァ-ン一-龥a-zA-Z\s]+$/u', $name)) {
  $errors[] = 'お名前が正しく入力されていません。';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $errors[] = '有効なメールアドレスを入力してください。';
}

if (empty($message) || mb_strlen($message) < 10 || mb_strlen($message) > 1000) {
  $errors[] = 'お問い合わせ内容は10〜1000文字で入力してください。';
}

if (empty($token)) {
  $errors[] = 'reCAPTCHAトークンがありません。';
}

if (!empty($errors)) {
  echo implode("<br>", $errors);
  exit;
}

// reCAPTCHA検証
$secret = $_ENV['RECAPTCHA_SECRET'];
$verifyURL = "https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$token}";
$response = json_decode(file_get_contents($verifyURL));

if (!$response->success || $response->score < 0.5) {
  exit('スパム判定されました。');
}

try {
  // 管理者通知メール
  $mail = new PHPMailer(true);
  $mail->isSMTP();
  $mail->Host = $_ENV['SMTP_HOST'];
  $mail->SMTPAuth = true;
  $mail->Username = $_ENV['SMTP_USER'];
  $mail->Password = $_ENV['SMTP_PASS'];
  $mail->SMTPSecure = $_ENV['SMTP_SECURE'];
  $mail->Port = $_ENV['SMTP_PORT'];
  $mail->CharSet = 'UTF-8';

  $mail->setFrom($_ENV['SMTP_USER'], 'Webフォーム');
  $mail->addAddress($_ENV['SMTP_USER'], '管理者');
  $mail->Subject = "【お問い合わせ】{$name}様より";
  $mail->Body = "お名前: {$name}\nメール: {$email}\n\nメッセージ:\n{$message}";
  $mail->send();

  // 自動返信
  $template = file_get_contents('mail_template.html');
  $htmlBody = str_replace(
    ['{{name}}', '{{email}}', '{{message}}'],
    [h($name), h($email), nl2br(h($message))],
    $template
  );

  $autoReply = new PHPMailer(true);
  $autoReply->isSMTP();
  $autoReply->Host = $_ENV['SMTP_HOST'];
  $autoReply->SMTPAuth = true;
  $autoReply->Username = $_ENV['SMTP_USER'];
  $autoReply->Password = $_ENV['SMTP_PASS'];
  $autoReply->SMTPSecure = $_ENV['SMTP_SECURE'];
  $autoReply->Port = $_ENV['SMTP_PORT'];
  $autoReply->CharSet = 'UTF-8';

  $autoReply->setFrom($_ENV['SMTP_USER'], 'お問い合わせ受付');
  $autoReply->addAddress($email, $name);
  $autoReply->isHTML(true);
  $autoReply->Subject = '【自動返信】お問い合わせありがとうございます';
  $autoReply->Body = $htmlBody;
  $autoReply->AltBody = "{$name}様\n\n以下の内容で受け付けました。\n\nお名前: {$name}\nメール: {$email}\nメッセージ:\n{$message}";

  $autoReply->send();

  echo '送信が完了しました。ありがとうございました。';
} catch (Exception $e) {
  echo 'メール送信に失敗しました: ' . $e->getMessage();
}

✅ 疑似コード
1. 必要なライブラリ（PHPMailer、Dotenvなど）を読み込む。
2. 文字エンコーディングを日本語に設定する。
3. .envファイルを読み込み、環境変数を使えるようにする。
4. POSTで送られてきたフォームの値（名前・メール・メッセージ・reCAPTCHAトークン）を取得し、不要な空白を取り除く。
5. HTMLタグなどの無害化関数（h）を定義する。→ 出力時にXSS対策として使用する。
6. サーバー側でバリデーションを実施：
   - 名前：2〜50文字、日本語・英字・スペースのみ許可。
   - メール：正しいメール形式であること。
   - メッセージ：10〜1000文字の範囲内であること。
   - reCAPTCHAのトークンが存在するか。
7. どれか1つでもバリデーションに失敗した場合：
   - エラーメッセージを出力して、処理を中断。
8. reCAPTCHAトークンをGoogleのサーバーに送信して、正当なアクセスかを検証する。
   - 成功しない場合、またはスパムスコアが0.5未満の場合はスパムと判定し、処理を中断。
9. PHPMailerを使って、管理者へ通知メールを送信：
   - SMTP情報は.envから読み取る。
   - 送信者、宛先、件名、本文を設定。
   - お問い合わせ内容を含むメールを送信。
10. ユーザーへの自動返信メールを準備：
    - HTMLテンプレート（mail_template.html）を読み込み。
    - テンプレート内の {{name}} や {{message}} を実際の値に置換。
    - HTML形式とテキスト形式の本文を設定。
    - ユーザーのメールアドレス宛に送信。
11. 全て成功したら、「送信が完了しました」と表示。
12. エラーが発生した場合は、「メール送信に失敗しました」とエラーメッセージを表示。

💡補足：このコードの目的と役割
処理	                説明
フォームバリデーション	ユーザーが正しく情報を入力しているかチェック
セキュリティ対策	    XSS・スパム（bot）・不正POSTなどから保護
管理者通知	           お問い合わせがあったことを運営側へ通知
自動返信	           ユーザーへ確認メールを自動で送信
フォールトトレラント	エラー時に適切なメッセージで処理停止し、安全な状態を保つ


✅ 1行づつコード解説
<?php
PHPスクリプトの開始タグです。

require 'vendor/autoload.php';
Composerでインストールした外部ライブラリ（PHPMailerやDotenvなど）を自動読み込みします。

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;
PHPの名前空間から、PHPMailerクラス、例外クラス、Dotenvクラスを使う宣言をします。

mb_language("Japanese");
mbstring（マルチバイト文字列）関数で使用する言語を「日本語」に設定。

mb_internal_encoding("UTF-8");
PHPの内部文字エンコーディングをUTF-8に設定。日本語を含む多言語対応のため。

// .env読み込み
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();
プロジェクトのルートディレクトリにある .env ファイルを読み込んで環境変数を設定します。

// 入力の整形と取得
function h($str) {
  return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}
HTML特殊文字を安全に表示するための関数を定義（XSS対策）。
例：「<」を「<」に変換するなど。

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');
$token   = $_POST['token'] ?? '';
POST送信されたデータを受け取る。
trim()で前後の空白を削除。
?? '' は、値が存在しなければ空文字を代入。

// バリデーション（サーバー側の最終確認）
$errors = [];
エラーメッセージを格納する配列を初期化。

if (empty($name) || mb_strlen($name) < 2 || mb_strlen($name) > 50 || !preg_match('/^[ぁ-んァ-ン一-龥a-zA-Z\s]+$/u', $name)) {
  $errors[] = 'お名前が正しく入力されていません。';
}
「名前」が空、文字数2〜50文字でない、もしくは許可していない文字が含まれている場合はエラーを追加。

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $errors[] = '有効なメールアドレスを入力してください。';
}
メールアドレスが空か、正しい形式でなければエラーを追加。

if (empty($message) || mb_strlen($message) < 10 || mb_strlen($message) > 1000) {
  $errors[] = 'お問い合わせ内容は10〜1000文字で入力してください。';
}
メッセージが空、または10文字未満、1000文字超ならエラー。

if (empty($token)) {
  $errors[] = 'reCAPTCHAトークンがありません。';
}
reCAPTCHAトークンがない場合はエラーを追加。

if (!empty($errors)) {
  echo implode("<br>", $errors);
  exit;
}
エラーがあればそれらを <br> で繋げて表示し、処理を終了する。

// reCAPTCHA検証
$secret = $_ENV['RECAPTCHA_SECRET'];
$verifyURL = "https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$token}";
$response = json_decode(file_get_contents($verifyURL));
Google reCAPTCHAの検証APIにサーバー側でトークンを送って検証結果を取得。

if (!$response->success || $response->score < 0.5) {
  exit('スパム判定されました。');
}
reCAPTCHAが成功していない、またはスコア（スパムでない確率）が0.5未満ならスパムとして処理中断。

try {
ここから「例外（エラー）が発生する可能性のある処理」を開始。

  // 管理者通知メール
  $mail = new PHPMailer(true);
  $mail->isSMTP();
  $mail->Host = $_ENV['SMTP_HOST'];
  $mail->SMTPAuth = true;
  $mail->Username = $_ENV['SMTP_USER'];
  $mail->Password = $_ENV['SMTP_PASS'];
  $mail->SMTPSecure = $_ENV['SMTP_SECURE'];
  $mail->Port = $_ENV['SMTP_PORT'];
  $mail->CharSet = 'UTF-8';
PHPMailerのSMTP設定を環境変数から読み込み、メール送信の準備。

  $mail->setFrom($_ENV['SMTP_USER'], 'Webフォーム');
  $mail->addAddress($_ENV['SMTP_USER'], '管理者');
  $mail->Subject = "【お問い合わせ】{$name}様より";
  $mail->Body = "お名前: {$name}\nメール: {$email}\n\nメッセージ:\n{$message}";
  $mail->send();
管理者（自分のメールアドレス）に問い合わせ内容を送信。

  // 自動返信
  $template = file_get_contents('mail_template.html');
  $htmlBody = str_replace(
    ['{{name}}', '{{email}}', '{{message}}'],
    [h($name), h($email), nl2br(h($message))],
    $template
  );
自動返信メールのHTMLテンプレートを読み込み、名前・メール・メッセージのプレースホルダーを実際の内容に置換。
nl2br() で改行コードをHTMLの <br> に変換。

  $autoReply = new PHPMailer(true);
  $autoReply->isSMTP();
  $autoReply->Host = $_ENV['SMTP_HOST'];
  $autoReply->SMTPAuth = true;
  $autoReply->Username = $_ENV['SMTP_USER'];
  $autoReply->Password = $_ENV['SMTP_PASS'];
  $autoReply->SMTPSecure = $_ENV['SMTP_SECURE'];
  $autoReply->Port = $_ENV['SMTP_PORT'];
  $autoReply->CharSet = 'UTF-8';
自動返信メール送信用にPHPMailerのSMTP設定を再度準備。

  $autoReply->setFrom($_ENV['SMTP_USER'], 'お問い合わせ受付');
  $autoReply->addAddress($email, $name);
  $autoReply->isHTML(true);
  $autoReply->Subject = '【自動返信】お問い合わせありがとうございます';
  $autoReply->Body = $htmlBody;
  $autoReply->AltBody = "{$name}様\n\n以下の内容で受け付けました。\n\nお名前: {$name}\nメール: {$email}\nメッセージ:\n{$message}";
ユーザー宛の自動返信メールの差出人・宛先・件名・HTML本文・テキスト本文を設定。

  $autoReply->send();
自動返信メールを送信。

  echo '送信が完了しました。ありがとうございました。';
正常に処理が終わったことをユーザーに通知。

} catch (Exception $e) {
  echo 'メール送信に失敗しました: ' . $e->getMessage();
}