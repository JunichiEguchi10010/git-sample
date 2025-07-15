<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Composerインストール済みが前提

mb_language("Japanese");
mb_internal_encoding("UTF-8");

function h($str) {
  return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

// 入力取得
$name    = h($_POST['name'] ?? '');
$email   = h($_POST['email'] ?? '');
$message = h($_POST['message'] ?? '');
$token   = $_POST['token'] ?? '';

if (!$name || !$email || !$message || !$token) {
  exit('入力が不足しています');
}

// ✅ reCAPTCHA 検証
// reCAPTCHAのシークレットキーを設定
$secretKey = '6LfKOoQrAAAAAJrnu1ZHDwoKXvoUa8UiEw_HGItI';
$verifyURL = 'https://www.google.com/recaptcha/api/siteverify';

$recaptcha = file_get_contents($verifyURL . '?secret=' . $secretKey . '&response=' . $token);
$response = json_decode($recaptcha);

if (!$response->success || $response->score < 0.5) {
  exit('スパムの可能性が高いため、送信をブロックしました。');
}

try {
  // 管理者宛
  $mail = new PHPMailer(true);
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'm100010eguchi@gmail.com';
  $mail->Password = 'liaccngouowhcbrq';
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;
  $mail->CharSet = 'UTF-8';

  $mail->setFrom('m100010eguchi@gmail.com', 'お問い合わせフォーム');
  $mail->addAddress('m100010eguchi@gmail.com', '管理者');

  $mail->Subject = '【お問い合わせ】' . $name . '様より';
  $mail->Body = "お名前: {$name}\nメールアドレス: {$email}\n\nメッセージ:\n{$message}";
  $mail->send();

  // 自動返信
  $autoReply = new PHPMailer(true);
  $autoReply->isSMTP();
  $autoReply->Host = 'smtp.gmail.com';
  $autoReply->SMTPAuth = true;
  $autoReply->Username = 'm100010eguchi@gmail.com';
  $autoReply->Password = 'liaccngouowhcbrq';
  $autoReply->SMTPSecure = 'ssl';
  $autoReply->Port = 465;
  $autoReply->CharSet = 'UTF-8';

  $autoReply->setFrom('m100010eguchi@gmail.com', 'お問い合わせ受付');
  $autoReply->addAddress($email, $name);
  $autoReply->Subject = '【自動返信】お問い合わせありがとうございます';
  $autoReply->Body = <<<EOT
{$name} 様

このたびはお問い合わせいただき、誠にありがとうございます。
以下の内容で受け付けいたしました。

-------------------------------
お名前: {$name}
メールアドレス: {$email}
メッセージ:
{$message}
-------------------------------

担当者より改めてご連絡差し上げます。
今しばらくお待ちくださいませ。

※このメールは自動送信です。
EOT;

  $autoReply->send();

  echo '送信が完了しました。ありがとうございました。';
} catch (Exception $e) {
  echo 'メール送信エラー: ' . $e->getMessage();
}