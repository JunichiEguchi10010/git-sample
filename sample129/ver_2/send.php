<?php
// 自動返信付きスニペット
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

try {
  // === 設定メール共通設定 ===
  $mail = new PHPMailer(true);
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'm100010eguchi@gmail.com'; // Gmailアカウント
  $mail->Password = 'liaccngouowhcbrq'; // スペースを除いた16桁
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;
  $mail->CharSet = 'UTF-8';

  // === 管理者宛メール ===
  $mail->setFrom('m100010eguchi@gmail.com', 'お問い合わせフォーム');
  $mail->addAddress('m100010eguchi@gmail.com', '管理者');
  $mail->Subject = '【お問い合わせ】' . $name . '様より';
  $mail->Body = "お名前: {$name}\nメールアドレス: {$email}\n\nメッセージ:\n{$message}";
  $mail->send();

  // === 自動返信メール ===
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
  echo 'メールの送信に失敗しました。エラー内容: ' . $e->getMessage();
}