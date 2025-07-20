<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

// 環境変数読み込み
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

function h($str) {
  return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

// 入力値
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');
$token   = $_POST['token'] ?? '';

$errors = [];

if (empty($name) || mb_strlen($name) < 2 || !preg_match('/^[ぁ-んァ-ヶー一-龠a-zA-Zａ-ｚＡ-Ｚ0-9 　]+$/u', $name)) {
  $errors[] = 'お名前の形式が正しくありません。';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $errors[] = 'メールアドレスが無効です。';
}

if (empty($message) || mb_strlen($message) < 10) {
  $errors[] = 'お問い合わせ内容は10文字以上で入力してください。';
}

if (empty($token)) {
  $errors[] = 'reCAPTCHAトークンがありません。';
}

if ($errors) {
  http_response_code(400);
  echo implode("\n", $errors);
  exit;
}

// reCAPTCHA検証
$secret = $_ENV['RECAPTCHA_SECRET'];
$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$token}");
$responseData = json_decode($response);

if (!$responseData->success || $responseData->score < 0.5) {
  exit('スパムと判定されました。');
}

// メール送信
try {
  $mail = new PHPMailer(true);
  $mail->isSMTP();
  $mail->Host       = $_ENV['SMTP_HOST'];
  $mail->SMTPAuth   = true;
  $mail->Username   = $_ENV['SMTP_USER'];
  $mail->Password   = $_ENV['SMTP_PASS'];
  $mail->SMTPSecure = $_ENV['SMTP_SECURE'];
  $mail->Port       = $_ENV['SMTP_PORT'];
  $mail->CharSet    = 'UTF-8';

  $mail->setFrom($_ENV['SMTP_USER'], 'フォーム通知');
  $mail->addAddress($_ENV['SMTP_USER'], '管理者');
  $mail->Subject = '【問い合わせ】' . $name . ' 様より';
  $mail->Body = "お名前: {$name}\nメール: {$email}\n\nメッセージ:\n{$message}";
  $mail->send();

  // 自動返信メール
  $auto = new PHPMailer(true);
  $auto->isSMTP();
  $auto->Host       = $_ENV['SMTP_HOST'];
  $auto->SMTPAuth   = true;
  $auto->Username   = $_ENV['SMTP_USER'];
  $auto->Password   = $_ENV['SMTP_PASS'];
  $auto->SMTPSecure = $_ENV['SMTP_SECURE'];
  $auto->Port       = $_ENV['SMTP_PORT'];
  $auto->CharSet    = 'UTF-8';

  $auto->setFrom($_ENV['SMTP_USER'], 'お問い合わせ受付');
  $auto->addAddress($email, $name);
  $auto->Subject = '【自動返信】お問い合わせありがとうございます';
  $auto->Body = "{$name} 様\n\nお問い合わせありがとうございました。\n\n以下の内容で受け付けました：\n\n{$message}";
  $auto->send();

  // ✅ 送信完了ページにリダイレクト
  header('Location: thanks.html');// HTTPレスポンスヘッダーでリダイレクトを指示。
  exit;//exitで以降のPHP処理を終了します。
  // header() 関数は、HTTP ヘッダーを送信するための PHP の組み込み関数です。
  // 'Location: thanks.html' は、そのヘッダーの内容で、「このページを thanks.html に移動してください」という指示をブラウザに与えています。
} catch (Exception $e) {
  echo '送信エラー: ' . $e->getMessage();
} 