<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// 文字コードをUTF-8に統一
mb_language("Japanese");
mb_internal_encoding("UTF-8");

function h($str) {
  return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

// 入力値を取得・バリデーション
$name    = h($_POST['name'] ?? '');
$email   = h($_POST['email'] ?? '');
$message = h($_POST['message'] ?? '');

if (!$name || !$email || !$message) {
  exit('入力が不足しています');
}

$mail = new PHPMailer(true);

try {
  // SMTP設定
  $mail->isSMTP();
  $mail->Host = 'smtp.example.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'your@example.com';
  $mail->Password = 'your_password';
  $mail->SMTPSecure = 'tls';
  $mail->Port = 587;

  $mail->CharSet = 'UTF-8';

  // 送信元・送信先
  $mail->setFrom('your@example.com', 'お問い合わせフォーム');
  $mail->addAddress('admin@example.com', '管理者');

  // 件名・本文
  $mail->Subject = '【お問い合わせ】' . $name . '様より';
  $mail->Body    = "お名前: {$name}\nメールアドレス: {$email}\n\nメッセージ:\n{$message}";

  // メール送信
  $mail->send();
  echo '送信が完了しました。ありがとうございました。';
} catch (Exception $e) {
  echo 'メールの送信に失敗しました。';
}
