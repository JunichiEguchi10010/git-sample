JavaScript ファイル分割(import export) 20250524

📁 JavaScriptのファイル分割（import/export）入門
JavaScriptでアプリケーションを作ると、コードがどんどん長くなっていきますよね。
そこで便利なのが「ファイル分割」です。

複数のファイルに分けることで、

✅ コードが整理されて読みやすくなる

✅ 管理や修正がしやすくなる

✅ 他の人との共同開発がしやすくなる

というメリットがあります。

🔁 export（エクスポート）とは？
exportは、「この変数や関数を、他のファイルでも使えるようにする」ためのキーワードです。

🧪 例：変数や関数をexportする
js
コピーする
編集する
// module.js
export const message = "Hello, World!";

export function greet(name) {
  return `Hello, ${name}!`;
}
上記のコードでは、messageという定数と、greetという関数を外部から使えるようにしています。

📥 import（インポート）とは？
importは、「他のファイルからexportされた値を使う」ためのキーワードです。

🧪 例：exportされたものをimportする
js
コピーする
編集する
// main.js
import { message, greet } from './module.js';

console.log(message); // Hello, World!
console.log(greet("Alice")); // Hello, Alice!
{} の中にexportされた名前をそのまま書いて使います。

⭐ デフォルトexport（export default）
通常のexportとは別に、「1つだけ特別な値」としてexportする方法があります。

🧪 例：デフォルトexportを使う
js
コピーする
編集する
// module.js
export default function sayHello() {
  return "Hello!";
}
🔽 import時には自由な名前でOK！
js
コピーする
編集する
// main.js
import saySomething from './module.js';

console.log(saySomething()); // Hello!
🔸 defaultでexportされたものは、{}なしでインポートします。
🔸 名前も自由に付けられます（例：saySomething）。

🤝 名前付きexport vs デフォルトexportの違い
比較項目	名前付きexport	デフォルトexport
複数exportできる？	✅ できる	❌ 1つだけ
importの形式	{} が必要	そのまま
import時の名前変更	as を使って変更	自由に付けられる

🌟 名前付きexportの例
js
コピーする
編集する
// utils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
js
コピーする
編集する
// main.js
import { add, subtract } from './utils.js';

console.log(add(3, 2));      // 5
console.log(subtract(3, 2)); // 1
📦 モジュールをまとめてimportする
すべてのexportをまとめて1つのオブジェクトとして受け取りたいときは、import * as 名前 を使います。

🧪 例：全部まとめてインポート
js
コピーする
編集する
// module.js
export const message = "Hello!";
export function greet(name) {
  return `Hi, ${name}`;
}
js
コピーする
編集する
// main.js
import * as utils from './module.js';

console.log(utils.message);       // Hello!
console.log(utils.greet("Bob"));  // Hi, Bob
✅ まとめ
項目	説明
export	他のファイルで使えるようにする
import	他のファイルから使いたいものを取り込む
名前付きexport	複数の変数・関数をexportできる
デフォルトexport	1つだけ特別な値をexportできる
import * as ...	すべてのexportをまとめて使える