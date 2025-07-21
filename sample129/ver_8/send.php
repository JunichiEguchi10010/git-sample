<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

function h($str) {
  return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

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

$secret = $_ENV['RECAPTCHA_SECRET'];
$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$token}");
$responseData = json_decode($response);

if (!$responseData->success || $responseData->score < 0.5) {
  http_response_code(400);
  echo 'スパムと判定されました。';
  exit;
}

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

  // fetch経由でもリダイレクト
  header('Location: thanks.html');
  exit;
} catch (Exception $e) {
  http_response_code(500);
  echo '送信エラー: ' . $e->getMessage();
} 


// 🟥 疑似コード
// 必要なライブラリを読み込む（PHPMailer と dotenv）
// PHPMailer、Exception クラス、Dotenv クラスを読み込む

// .envファイルから環境変数を読み込む
// .envファイルに記載されたメール設定やreCAPTCHAキーを取得できるようにする

// XSS対策用の関数 h() を定義
// 入力文字列をエスケープしてHTMLタグの注入を防ぐ

// フォームから送られてきたデータを受け取る（name, email, message, token）
// POST送信された値をそれぞれ変数に代入（未入力時は空文字）

// バリデーション用のエラーリストを用意する
// エラーがあった場合はここに追加されていく

// 入力チェック：名前が2文字以上で指定の文字種（日本語・英字）に合っているか
// メールアドレスの形式が正しいか
// メッセージが10文字以上か
// reCAPTCHAトークンがあるか
// それぞれ不正であればエラーを配列に追加する

// もしエラーが1つでもあれば、HTTPステータス400でエラー内容を表示して終了
// バリデーション失敗時の早期リターン処理

// reCAPTCHAのサーバー側検証（GoogleのAPIを使う）
// // スコアが低ければスパム判定として拒否
// GoogleのAPIにreCAPTCHAトークンを送って結果を確認する
// スコアが0.5未満 or 成功していなければスパムと判断して終了

// ここからメール送信処理（例外処理 try-catch を使う）

// PHPMailerで管理者宛にメールを送信
// SMTP情報を.envから取得して設定する
// 件名や本文に送信者の名前やメッセージを含めて送信

// PHPMailerでユーザー宛に自動返信メールを送信
// 同じSMTP情報を使って、ユーザーにも受付完了メールを送る

// 最後にサンクスページ（thanks.html）にリダイレクトして処理終了
// fetchなどのPOST送信経由でも問題なく画面遷移させる

// もし送信中にエラーが発生した場合（例外が投げられた場合）
// ステータス500でエラーメッセージを表示
// メール送信エラーなどが起きたら catch で処理してユーザーに通知する

// 🟥 コード解説
// <?php
// Composerでインストールしたライブラリを読み込む（PHPMailer, Dotenvなど）
// require 'vendor/autoload.php'; // ライブラリの読み込み

// use PHPMailer\PHPMailer\PHPMailer; // PHPMailerクラスを読み込む
// use PHPMailer\PHPMailer\Exception; // Exceptionクラスを読み込む
// use Dotenv\Dotenv; // 環境変数を読み込むためのライブラリ

// .envファイルから環境変数を読み込む
// $dotenv = Dotenv::createImmutable(__DIR__); // 環境変数を読み込む
// $dotenv->load(); // 環境変数を読み込む

// XSS対策：出力時に使うエスケープ関数
// function h($str) {
//   return htmlspecialchars($str, ENT_QUOTES, 'UTF-8'); // エスケープ処理
// }

// POSTデータを受け取る（未定義の場合は空文字）
// $name    = trim($_POST['name'] ?? ''); // 名前
// $email   = trim($_POST['email'] ?? ''); // メールアドレス
// $message = trim($_POST['message'] ?? ''); // メッセージ
// $token   = $_POST['token'] ?? ''; // reCAPTCHAトークン

// // エラーメッセージを格納する配列
// $errors = [];

// // 名前が空 or 2文字未満 or 指定の文字種でない場合はエラー
// if (empty($name) || mb_strlen($name) < 2 || !preg_match('/^[ぁ-んァ-ヶー一-龠a-zA-Zａ-ｚＡ-Ｚ0-9 　]+$/u', $name)) {
//   $errors[] = 'お名前の形式が正しくありません。';
// }

// // メールアドレスが空 or 無効な形式ならエラー
// if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
//   $errors[] = 'メールアドレスが無効です。';
// }

// // メッセージが空 or 10文字未満ならエラー
// if (empty($message) || mb_strlen($message) < 10) {
//   $errors[] = 'お問い合わせ内容は10文字以上で入力してください。';
// }

// // reCAPTCHAトークンが空ならエラー
// if (empty($token)) {
//   $errors[] = 'reCAPTCHAトークンがありません。';
// }

// エラーが1つでもあれば400を返して終了
// if ($errors) {
//   http_response_code(400); // 400エラーを返す
//   echo implode("\n", $errors); // エラーを改行区切りで出力
//   exit;
// }

// // Google reCAPTCHA v3 を検証（スパム判定）
// $secret = $_ENV['RECAPTCHA_SECRET']; // .envのシークレットキーを取得
// $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$token}"); // GoogleのAPIを使ってreCAPTCHAを検証
// $responseData = json_decode($response); // 結果をJSON形式で取得

// // reCAPTCHAが失敗 or スコアが低い場合（スパム）なら拒否
// if (!$responseData->success || $responseData->score < 0.5) {
//   http_response_code(400); // 400エラーを返す
//   echo 'スパムと判定されました。'; // エラーメッセージを表示
//   exit;
// }

// try {
//   // ---------- 管理者宛メール送信 ----------
//   $mail = new PHPMailer(true); // PHPMailerのインスタンスを作成
//   $mail->isSMTP(); 
//   $mail->Host       = $_ENV['SMTP_HOST']; // .envのSMTPホストを取得
//   $mail->SMTPAuth   = true; // SMTP認証を有効にする
//   $mail->Username   = $_ENV['SMTP_USER']; // .envのSMTPユーザー名を取得
//   $mail->Password   = $_ENV['SMTP_PASS']; // .envのSMTPパスワードを取得
//   $mail->SMTPSecure = $_ENV['SMTP_SECURE']; // .envのSMTPセキュア設定を取得
//   $mail->Port       = $_ENV['SMTP_PORT'];   // .envのSMTPポートを取得
//   $mail->CharSet    = 'UTF-8'; // 文字エンコーディングをUTF-8に設定

//   $mail->setFrom($_ENV['SMTP_USER'], 'フォーム通知'); // 送信者のメールアドレスと名前を設定
//   $mail->addAddress($_ENV['SMTP_USER'], '管理者'); // 管理者のメールアドレスと名前を設定
//   $mail->Subject = '【問い合わせ】' . $name . ' 様より'; // メールの件名を設定
//   $mail->Body = "お名前: {$name}\nメール: {$email}\n\nメッセージ:\n{$message}"; // メールの本文を設定
//   $mail->send(); // メールを送信

//   // ---------- 自動返信メール（ユーザー宛） ----------
//   $auto = new PHPMailer(true); // PHPMailerのインスタンスを作成
//   $auto->isSMTP(); // SMTPを使用するように設定
//   $auto->Host       = $_ENV['SMTP_HOST']; // .envのSMTPホストを取得
//   $auto->SMTPAuth   = true; // SMTP認証を有効にする
//   $auto->Username   = $_ENV['SMTP_USER']; // .envのSMTPユーザー名を取得
//   $auto->Password   = $_ENV['SMTP_PASS']; // .envのSMTPパスワードを取得
//   $auto->SMTPSecure = $_ENV['SMTP_SECURE']; // .envのSMTPセキュア設定を取得
//   $auto->Port       = $_ENV['SMTP_PORT']; // .envのSMTPポートを取得
//   $auto->CharSet    = 'UTF-8'; // 文字エンコーディングをUTF-8に設定

//   $auto->setFrom($_ENV['SMTP_USER'], 'お問い合わせ受付'); // 送信者のメールアドレスと名前を設定
//   $auto->addAddress($email, $name); // ユーザーのメールアドレスと名前を設定
//   $auto->Subject = '【自動返信】お問い合わせありがとうございます'; // メールの件名を設定
//   $auto->Body = "{$name} 様\n\nお問い合わせありがとうございました。\n\n以下の内容で受け付けました：\n\n{$message}"; // メールの本文を設定
//   $auto->send(); // メールを送信

//   // ---------- 正常終了時：サンクスページにリダイレクト ----------
//   header('Location: thanks.html'); // サンクスページにリダイレクト
//   exit;

// } catch (Exception $e) {
//   // 送信エラー時の処理
//   http_response_code(500); // 500エラーを返す
//   echo '送信エラー: ' . $e->getMessage(); // エラーメッセージを表示
// }

// ✅ 特徴
// .envファイルによるセキュアな設定管理（機密情報を外部ファイルに隔離）
// メールサーバーの設定を外部ファイルで管理
// シークレットキーを環境変数として管理

// reCAPTCHA v3 によるスパム防止（スコア0.5未満はブロック）
// ボットのアクションを検知してスパムとして拒否

// PHPMailer によるSMTP送信（管理者宛 + 自動返信）
// 管理者宛とユーザー宛にメールを送信
// メールの送信にPHPMailerを使用

// エラー処理もHTTPステータスコードを使って明確に応答

// header('Location: thanks.html'); により、サンクスページに自然遷移