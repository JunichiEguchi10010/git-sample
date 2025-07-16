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

// reCAPTCHA v3 確認
$secretKey = 'あなたのシークレットキー';
$verifyURL = 'https://www.google.com/recaptcha/api/siteverify';
$response = json_decode(file_get_contents($verifyURL . "?secret=$secretKey&response=$token"));
if (!$response->success || $response->score < 0.5) {
  exit('スパムの可能性があります。');
}

// 管理者宛メール
try {
  $mail = new PHPMailer(true);
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'あなたのGmailアドレス';
  $mail->Password = 'アプリパスワード';
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;
  $mail->CharSet = 'UTF-8';

  $mail->setFrom('あなたのGmailアドレス', 'Webフォーム');
  $mail->addAddress('あなたのGmailアドレス', '管理者');
  $mail->Subject = '【お問い合わせ】' . $name . '様より';
  $mail->Body    = "お名前: {$name}\nメール: {$email}\n\nメッセージ:\n{$message}";
  $mail->send();

  // 自動返信メール（ここからHTMLメールの設定）
  $template = file_get_contents('mail_template.html');
  $htmlBody = str_replace(
    ['{{name}}', '{{email}}', '{{message}}'],
    [$name, $email, nl2br($message)],
    $template
  );
　// ここまでHTMLメールの設定

  $autoReply = new PHPMailer(true);
  $autoReply->isSMTP();
  $autoReply->Host = 'smtp.gmail.com';
  $autoReply->SMTPAuth = true;
  $autoReply->Username = 'あなたのGmailアドレス';
  $autoReply->Password = 'アプリパスワード';
  $autoReply->SMTPSecure = 'ssl';
  $autoReply->Port = 465;
  $autoReply->CharSet = 'UTF-8';

  $autoReply->setFrom('あなたのGmailアドレス', 'お問い合わせ受付');
  $autoReply->addAddress($email, $name);
  $autoReply->isHTML(true);
  $autoReply->Subject = '【自動返信】お問い合わせありがとうございます';
  $autoReply->Body = $htmlBody;
  $autoReply->AltBody = "{$name}様\n\n以下の内容で受け付けました。\n\nお名前: {$
