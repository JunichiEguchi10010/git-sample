基本的なプログラムの構成 20250805

🟦 メイン処理を見極めるポイント
🟢 関数の実行箇所を探す

ファイルの下部や「即時実行（関数呼び出し）」の部分に注目。
例:
javascript
main(); // ここがスタートの可能性大！

🟢 イベントリスナー・コールバックを探す（Webの場合）
DOMのロードやボタンのクリックに反応する処理など。
例:
javascript
document.addEventListener("DOMContentLoaded", main);

🟢 処理の流れに注目する
console.log() や DOM操作、サーバー通信など、実際に動作を起こす関数からスタートしている部分。

🟢 ファイルの役割から推測する
メイン処理は、そのファイルの「目的」に沿って中心となる動きになっていることが多いです。
例えば、表示用のJSなら画面描画の開始がメイン。

🟢 即時関数（IIFE）の利用をチェック
書かれている処理がすぐ実行されているなら、それがメインの可能性あり。

例:
javascript
(() => {
  showMessage();
  count += 1;
})();

🧠 補足：main関数がない場合は？
JavaScriptでは main() という名前じゃなくても、ファイルの末尾やイベントで呼ばれる処理が「実質的なメイン」です。 
名前に惑わされず、「実際に何が起きているか」に着目するのがコツです 🔎


🟧 JavaScript
// 1. 外部モジュールの読み込み（必要な場合）
import { someFunction } from './utils.js';

// 2. 変数の定義
const userName = "Taro";
let count = 0;

// 3. 関数の定義
function greet(name) {
  return `こんにちは、${name}さん！`;
}

function showMessage() {
  console.log(greet(userName));
}

// 4. メイン処理（main 関数にまとめる）
function main() {
  showMessage();
  count += 1;
  console.log(`現在のカウント：${count}`);
}

// 実行
main();

🟧 PHP
<?php
// 1. 外部ファイルの読み込み（必要な場合）
require_once 'utils.php'; // 仮の外部ファイル

// 2. 変数の定義
$userName = "Taro";
$count = 0;

// 3. 関数の定義
function greet($name) {
  return "こんにちは、{$name}さん！";
}

function showMessage() {
  global $userName;
  echo greet($userName) . "\n";
}

// 4. メイン処理（main 関数的なもの）
function main() {
  global $count;
  showMessage();
  $count += 1;
  echo "現在のカウント：{$count}\n";
}

// 実行
main();
?>

🟧 Python
# 1. 外部ファイルの読み込み（必要な場合）
# 仮の外部ファイル utils.py をインポート（存在する場合）
# from utils import some_function  # ← 実際に使う関数があればここで読み込む

# 2. 変数の定義
user_name = "Taro"
count = 0

# 3. 関数の定義
def greet(name):
    return f"こんにちは、{name}さん！"

def show_message():
    global user_name
    print(greet(user_name))

# 4. メイン処理（main 関数的なもの）
def main():
    global count
    show_message()
    count += 1
    print(f"現在のカウント：{count}")

# 実行
if __name__ == "__main__":
    main()


✅ 関数化の判断基準：この5つをチェック！
チェック項目	                            YESなら関数化すべき
🔁 同じ処理を複数回使っているか？	        ✅ 再利用性のために関数化
🧱 処理が1つの責務にまとまっているか？	    ✅ 単一責務の関数に分ける
📏 処理が長すぎないか？（10行以上）	        ✅ 読みやすさのために分割
🧪 テストしたい処理か？	                   ✅ テスト可能な関数に分ける
🧠 名前をつけられる処理か？	               ✅ 意味のある関数名がつけられるなら分けるべき


🟧 具体例：関数化前のコード（PHP）
php
<?php
$data = $_POST;
if (!isset($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    echo "メールアドレスが不正です";
    exit;
}

$db = new PDO(...);
$stmt = $db->prepare("INSERT INTO users (email) VALUES (:email)");
$stmt->bindParam(':email', $data['email']);
$stmt->execute();

mail($data['email'], "登録完了", "ようこそ！");
echo "登録が完了しました";
?>

🟧 🛠 関数化後のコード（責務ごとに分割）
php
<?php
function validateEmail($email) {
    return isset($email) && filter_var($email, FILTER_VALIDATE_EMAIL);
}

function saveUser($email) {
    $db = new PDO(...);
    $stmt = $db->prepare("INSERT INTO users (email) VALUES (:email)");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
}

function sendWelcomeEmail($email) {
    mail($email, "登録完了", "ようこそ！");
}

function main() {
    $data = $_POST;
    if (!validateEmail($data['email'])) {
        echo "メールアドレスが不正です";
        exit;
    }

    saveUser($data['email']);
    sendWelcomeEmail($data['email']);
    echo "登録が完了しました";
}

main();
?>
💡 ポイント解説
validateEmail()：バリデーション処理は独立させることでテストしやすくなる
saveUser()：DB処理は副作用があるので、明確に分離
sendWelcomeEmail()：外部サービスとの連携は関数化しておくと後で差し替えやすい
main()：処理の流れを整理し、読みやすくする

🎯 どこまで関数化すべきか？
1つの関数は1つの目的に絞る（単一責務の原則）

関数名で処理の内容が説明できるか？ → YESなら関数化

関数の中で「そして」「さらに」「ついでに」が増えたら分割を検討

💬 まとめ
関数化は「分けること」よりも「意味で整理すること」が大事です。


🔍 「責務ごとに分割する」とは、それぞれの関数が“何を担当しているか”を明確にすることです。
以下では、関数化後のコードを「どの責務に対応しているか」をわかりやすく解説します。

🟧 🛠 関数化後のコード：責務ごとの分割と解説
php
function validateEmail($email) {
    return isset($email) && filter_var($email, FILTER_VALIDATE_EMAIL);
}
🧭 責務：入力の検証（バリデーション）
ユーザーが入力したメールアドレスが正しい形式かどうかをチェック
🟧 「入力チェック」は他の処理と分けるべき重要な責務

php
function saveUser($email) {
    $db = new PDO(...);
    $stmt = $db->prepare("INSERT INTO users (email) VALUES (:email)");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
}

🧱 責務：データベースへの保存
ユーザー情報（メールアドレス）をDBに登録する処理
🟧 「永続化処理」は副作用があるため、明確に分離すべき

php
function sendWelcomeEmail($email) {
    mail($email, "登録完了", "ようこそ！");
}

📧 責務：メール送信
ユーザーに登録完了の通知メールを送る
🟧 外部サービス（メール）との連携は、他のロジックと混ぜない方が安全

php
function main() {
    $data = $_POST;
    if (!validateEmail($data['email'])) {
        echo "メールアドレスが不正です";
        exit;
    }

    saveUser($data['email']);
    sendWelcomeEmail($data['email']);
    echo "登録が完了しました";
}

🚦 責務：処理の流れを制御する（オーケストレーション）
各機能を順番に呼び出して、全体の処理を構成する
🟧 「main関数」は、個々の責務を組み合わせて1つの目的を達成する役割

🧠 責務の分割まとめ
関数名	                担当する責務	    なぜ分けるべきか
validateEmail()	        入力の検証	    ロジックの再利用・テストがしやすい
saveUser()	            データ保存	    副作用がある処理は明確に分離
sendWelcomeEmail()	    通知処理	    外部連携は独立させることで変更に強くなる
main()	                処理の流れ	    各責務を組み合わせて全体を制御する

💬 補足
このように責務ごとに関数を分けることで、コードの見通しが良くなり、変更や拡張にも強くなります。
たとえば、メール送信を別のサービスに切り替えるときも sendWelcomeEmail() だけを変更すれば済みます。