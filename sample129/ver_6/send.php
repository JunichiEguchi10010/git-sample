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
