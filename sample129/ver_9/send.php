<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

// .env 読み込み
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// HTML特殊文字処理関数（XSS対策）
function h($str) {
  return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

// フォームデータ取得
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');
$token   = $_POST['token'] ?? '';

// 入力バリデーション
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

// reCAPTCHA サーバー側検証
$secret = $_ENV['RECAPTCHA_SECRET'];
$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$token}");
$responseData = json_decode($response);

// デバッグ確認用（必要なら一時的に使用してください）
// var_dump($secret);
// var_dump($token);
// var_dump($response);
// var_dump($responseData);
// exit;

// スパム判定（スコア低・失敗時）
if (!$responseData->success || $responseData->score < 0.5) {
  http_response_code(400);
  echo 'スパムと判定されました。';
  exit;
}

// メール送信処理
try {
  // 管理者向けメール
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

  // ユーザー向け自動返信メール
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

  // 完了（JS側のfetchで表示される）
  http_response_code(200);
  exit;
} catch (Exception $e) {
  http_response_code(500);
  echo '送信エラー: ' . $e->getMessage();
}
