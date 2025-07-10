<!-- 「PHPMailerを使ったお問い合わせフォーム送信スクリプト（SMTP対応・日本語対応）」 -->
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
  // ✅ GmailのSMTP設定
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'm100010eguchi@gmail.com';  // あなたのGmailアドレス
  $mail->Password = 'liaccngouowhcbrq';         // アプリパスワード（スペース除去済み）
  $mail->SMTPSecure = 'ssl';                    // Gmail推奨（TLSの場合は587）
  $mail->Port = 465;

  $mail->CharSet = 'UTF-8';

  // 送信元・送信先
  $mail->setFrom('m100010eguchi@gmail.com', 'お問い合わせフォーム');
  $mail->addAddress('m100010eguchi@gmail.com', '管理者'); // Gmailで自分に届くように設定

  // 件名・本文
  $mail->Subject = '【お問い合わせ】' . $name . '様より';
  $mail->Body    = "お名前: {$name}\nメールアドレス: {$email}\n\nメッセージ:\n{$message}";

  // メール送信
  $mail->send();
  echo '送信が完了しました。ありがとうございました。';
} catch (Exception $e) {
  echo 'メールの送信に失敗しました。エラー内容: ' . $mail->ErrorInfo;
}


// ✅ 対応ポイント
// 項目	                対応内容
// Host	                Gmail用に smtp.gmail.com に変更
// Username	            あなたの Gmail アドレスを指定
// Password	            発行済みのアプリパスワード（スペース削除済）を指定
// SMTPSecure & Port	  ssl + 465 に設定（最も安定）
// addAddress()	        Gmailにも送信できるよう、自分自身を宛先に指定

// ✅ 動作確認チェックリスト
// アプリパスワードが正確に入力されているか（スペース無し）
// vendor/autoload.php が存在する（ComposerでPHPMailerがインストール済み）
// ローカル or サーバー側のファイアウォールで smtp.gmail.com:465 がブロックされていないか

// ✅ テスト完了後のおすすめ
// echo 出力ではなく、サンクスページにリダイレクトするなどUX向上も検討可能です
// お問い合わせ内容の確認メール（自動返信）機能も追加可能です


// コードスニペット
// <?php
// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// require 'vendor/autoload.php';

// // 文字コードをUTF-8に統一
// mb_language("Japanese");
// mb_internal_encoding("UTF-8");

// function h($str) {
//   return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
// }

// // 入力値を取得・バリデーション
// $name    = h($_POST['name'] ?? '');
// $email   = h($_POST['email'] ?? '');
// $message = h($_POST['message'] ?? '');

// if (!$name || !$email || !$message) {
//   exit('入力が不足しています');
// }

// $mail = new PHPMailer(true);

// try {
//   // SMTP設定
//   $mail->isSMTP();
//   $mail->Host = 'smtp.example.com';
//   $mail->SMTPAuth = true;
//   $mail->Username = 'your@example.com';
//   $mail->Password = 'your_password';
//   $mail->SMTPSecure = 'tls';
//   $mail->Port = 587;

//   $mail->CharSet = 'UTF-8';

//   // 送信元・送信先
//   $mail->setFrom('your@example.com', 'お問い合わせフォーム');
//   $mail->addAddress('admin@example.com', '管理者');

//   // 件名・本文
//   $mail->Subject = '【お問い合わせ】' . $name . '様より';
//   $mail->Body    = "お名前: {$name}\nメールアドレス: {$email}\n\nメッセージ:\n{$message}";

//   // メール送信
//   $mail->send();
//   echo '送信が完了しました。ありがとうございました。';
// } catch (Exception $e) {
//   echo 'メールの送信に失敗しました。';
// }