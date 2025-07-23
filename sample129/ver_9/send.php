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

// reCAPTCHA サーバー側検証　シークレットー登録
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


// 🟥 お問い合わせフォーム処理の全体の流れ（PHPサーバー側）
// ライブラリと設定情報の読み込み
// ・PHPMailer と dotenv を利用し、SMTP・reCAPTCHA の設定を読み込む

// フォーム入力の取得と検証
// ・名前・メール・メッセージ・reCAPTCHA トークンを取得
// ・入力内容が不正ならエラーとして終了（400ステータス）

// reCAPTCHA でユーザーの正当性を検証
// ・スパムと判断された場合は終了

// メール送信処理
// ・管理者宛に通知メールを送信
// ・ユーザーに自動返信メールを送信

// 送信結果のレスポンス
// ・成功：200ステータスで終了
// ・エラー：500ステータスでエラーメッセージを返す


// 🟥 擬似コード
// 1. 必要なライブラリ（PHPMailer・dotenv）を読み込む

// 2. .env ファイルから設定情報（SMTP情報・reCAPTCHA秘密鍵など）を読み込む

// 3. XSS対策のための関数（htmlspecialchars）を用意（※今回未使用）

// 4. フォームから送られてきた情報（名前・メール・メッセージ・reCAPTCHAトークン）を取得し、余分な空白を除去

// 5. 入力内容のチェック：
//    ・名前が空 or 2文字未満 or 指定された文字でない → エラー
//    ・メールが空 or メール形式でない → エラー
//    ・メッセージが空 or 10文字未満 → エラー
//    ・reCAPTCHAトークンが空 → エラー

// 6. エラーが1つでもあれば、
//    → HTTPステータス400でエラーメッセージを返して終了

// 7. GoogleのreCAPTCHAサーバーにトークンを送って、ユーザーの正当性を検証する

// 8. 検証結果：
//    ・successがfalse or scoreが0.5未満 → スパムと判定し、エラーで終了

// 9. メール送信処理を開始（tryブロック）

// 10. 管理者宛のメール作成・送信：
//     - SMTPで接続設定
//     - 管理者アドレスへ、送信者の情報＋メッセージ内容を通知

// 11. ユーザー宛の自動返信メール作成・送信：
//     - ユーザーのメールアドレスへ、「お問い合わせ受け付けました」メールを送信
//     - メッセージ内容も含めて送信

// 12. メール送信成功なら、HTTPステータス200で正常終了

// 13. メール送信中にエラーが出た場合 catchブロックでキャッチし、
//     → HTTPステータス500でエラーメッセージを返す


// 🟥 コード解説
// <?php
// require 'vendor/autoload.php';
// → Composerで管理されたライブラリを一括で読み込む（PHPMailer・Dotenvなど）

// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;
// use Dotenv\Dotenv;
// → クラスを明示して名前空間を使いやすくする

// $dotenv = Dotenv::createImmutable(__DIR__);
// $dotenv->load();
// → .env ファイルから環境変数（SMTP情報、reCAPTCHA秘密鍵など）を読み込む

// 🔐 XSS対策の関数
// （今回は未使用：は「PHP側ではメール送信のみ」だから、画面に直接表示する場面がなかったため、未使用とコメン:は「PHP側ではメール送信のみ」だから、
// 画面に直接表示する場面がなかったため、未使用とコメント）

// function h($str) {
//   return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
// }
// → HTMLタグや特殊文字をエスケープ（画面に表示する際のセキュリティ対策用）

// 📮 フォームデータの受け取りと整形
// $name    = trim($_POST['name'] ?? '');
// $email   = trim($_POST['email'] ?? '');
// $message = trim($_POST['message'] ?? '');
// $token   = $_POST['token'] ?? '';
// → POSTされたデータを取得。空白は除去し、存在しない場合は空文字を入れる

// ✅ バリデーションチェック
// $errors = [];
// → エラーを蓄積する配列を用意

// 名前欄のチェック
// if (empty($name) || mb_strlen($name) < 2 || !preg_match('/^[ぁ-んァ-ヶー一-龠a-zA-Zａ-ｚＡ-Ｚ0-9 　]+$/u', $name)) {
//   $errors[] = 'お名前の形式が正しくありません。';
// }
// → 空・2文字未満・日本語/英字以外が含まれる場合はエラー

// メール欄のチェック
// if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
//   $errors[] = 'メールアドレスが無効です。';
// }
// → 空・正しいメール形式でない場合はエラー

// メッセージ欄のチェック
// if (empty($message) || mb_strlen($message) < 10) {
//   $errors[] = 'お問い合わせ内容は10文字以上で入力してください。';
// }
// → 空・10文字未満はエラー

// reCAPTCHAトークンのチェック
// if (empty($token)) {
//   $errors[] = 'reCAPTCHAトークンがありません。';
// }
// → トークンがない場合はエラー

// 🚫 バリデーションエラー処理
// if ($errors) {
//   http_response_code(400);
//   echo implode("\n", $errors);
//   exit;
// }
// → エラーがあった場合、HTTP 400（Bad Request）でメッセージを返して終了

// 🔒 reCAPTCHA サーバー側検証
// $secret = $_ENV['RECAPTCHA_SECRET'];
// $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$token}");
// $responseData = json_decode($response);
// → GoogleのAPIにトークンを送信し、ユーザーが人間かどうか確認

// ❌ スパム判定処理
// if (!$responseData->success || $responseData->score < 0.5) {
//   http_response_code(400);
//   echo 'スパムと判定されました。';
//   exit;
// }
// → 判定が失敗 or スコアが低すぎる（0.5未満）場合はスパムとみなして終了

// ✉️ メール送信（try-catch で例外処理）
// try {
// → メール送信処理を安全に実行するための例外処理開始

// 📧 管理者向けメール設定・送信
// $mail = new PHPMailer(true);
// $mail->isSMTP();
// $mail->Host       = $_ENV['SMTP_HOST'];
// $mail->SMTPAuth   = true;
// $mail->Username   = $_ENV['SMTP_USER'];
// $mail->Password   = $_ENV['SMTP_PASS'];
// $mail->SMTPSecure = $_ENV['SMTP_SECURE'];
// $mail->Port       = $_ENV['SMTP_PORT'];
// $mail->CharSet    = 'UTF-8';
// → SMTP接続の各設定を.envから読み込む

// $mail->setFrom($_ENV['SMTP_USER'], 'フォーム通知');
// $mail->addAddress($_ENV['SMTP_USER'], '管理者');
// $mail->Subject = '【問い合わせ】' . $name . ' 様より';
// $mail->Body = "お名前: {$name}\nメール: {$email}\n\nメッセージ:\n{$message}";
// $mail->send();
// → 管理者に問い合わせ内容を送信

// 📩 ユーザー向け自動返信メール
// $auto = new PHPMailer(true);
// // 以下 SMTP設定は上記と同様
// → 別のPHPMailerインスタンスを使ってユーザー宛の返信メールを設定

// $auto->setFrom($_ENV['SMTP_USER'], 'お問い合わせ受付');
// $auto->addAddress($email, $name);
// $auto->Subject = '【自動返信】お問い合わせありがとうございます';
// $auto->Body = "{$name} 様\n\nお問い合わせありがとうございました。\n\n以下の内容で受け付けました：\n\n{$message}";
// $auto->send();
// → 送信者に自動返信メールを送信（感謝＋問い合わせ内容）

// 🟢 正常終了
// http_response_code(200);
// exit;
// → 送信成功をJS側に知らせる（fetchの処理でOK判定）

// ❗ 送信エラー発生時の処理
// } catch (Exception $e) {
//   http_response_code(500);
//   echo '送信エラー: ' . $e->getMessage();
// }
// → 何らかのエラーが発生したら、HTTP 500（サーバーエラー）でメッセージを返す