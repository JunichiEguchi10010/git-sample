関数 return の使い方 20250810

return が「いつ必要で、いつ不要なのか」は関数の目的によって変わる。

🧠 まず基本ルール
状況	                                return は必要？	            理由
関数が値を返す	                         ✅ 必要	                   呼び出し元に結果を渡すため
関数が何かを実行するだけ（表示・操作など）	❌ 不要	                  結果を返す必要がない

🧩 ユースケース別に解説！
① ✅ 値を返す関数（計算・取得など）
javascript
function add(a, b) {
  return a + b;
}

const result = add(2, 3); // result = 5
🔹 目的：計算結果を返す 🔹 必要：return がないと undefined になる！

② ❌ 実行するだけの関数（表示・操作など）
javascript
function showMessage(message) {
  console.log("メッセージ:", message);
}

showMessage("こんにちは"); // 表示されるだけ
🔹 目的：画面に表示するだけ 🔹 不要：返す値がないので return は不要

③ ✅ 条件によって値を返す関数
javascript
function isEven(num) {
  if (num % 2 === 0) {
    return true;
  }
  return false;
}
🔹 目的：偶数かどうかを判定して返す 🔹 必要：結果を返すために return が必要

④ ❌ イベント処理などの副作用系
javascript
function handleClick() {
  document.body.style.backgroundColor = "lightblue";
}
🔹 目的：画面の色を変える（副作用） 🔹 不要：返す値はないので return は不要

⑤ ✅ 関数を返す（高階関数）
🟥 JavaScriptでは関数も「値」として扱えるので、return で関数を返すことができる。

javascript
function createGreeter(name) {
  return function () {
    console.log("こんにちは、" + name + "さん！");
  };
}

const greetTaro = createGreeter("太郎");
greetTaro(); // こんにちは、太郎さん！
🔹 目的：関数を作って返す 🔹 必要：返さないと undefined() になってエラー！

🎯 どんな場面で使うの？
ユースケース	            説明
クロージャ	            外の変数を記憶した関数を返す
高階関数	            関数に機能を追加したり、条件で切り替える
カスタム設定	        ユーザーの入力や条件に応じた関数を生成
Reactのカスタムフック	状態やロジックを関数として返す（例：useForm()）



🎯 全体のまとめ：return が必要かどうかの判断ポイント
判断ポイント	            説明	        例
呼び出し元に値を渡したい	✅ 必要	    計算、判定、関数生成など
関数内で何かを実行するだけ	❌ 不要	    表示、DOM操作、イベント処理など

💡補足：return があっても値を返さない場合
javascript
function doSomething() {
  return; // 何も返さない → undefined
}
👉 これは「明示的に何も返さない」ケース。 使うことは少ないですが、早期終了などで使われることがあります。