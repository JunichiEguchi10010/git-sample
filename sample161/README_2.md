JavaScript 非同期処理 Promiseオブジェクト とは？ 20250901

ざっくり
JavaScriptで非同期処理（時間がかかる処理）を扱うための仕組みです。
 Promiseは「約束された値」を表し、まだ結果が出ていないけど、将来出る予定の値を扱います。

→JavaScript で「非同期処理の結果を表す箱」のようなものです。
まだ結果がわからないけど「いずれ成功するか失敗するか」を約束（Promise）してくれます。

✅ Promiseオブジェクト詳細
PromiseはJavaScriptの組み込みオブジェクト（Built-in Object）です。
つまり、特別なライブラリを読み込まなくても、JavaScriptの実行環境（ブラウザやNode.js）に標準で備わっている機能です。

🔧 Promiseは何者か？
Promise は 非同期処理を扱うためのオブジェクト型。
JavaScriptのグローバルスコープに存在しており、new Promise(...) でインスタンス化できます。

Promise は ES6（2015年）で正式導入
その後のバージョンで便利なメソッドが少しずつ増えている
async/await は ES2017（2017年）から

✅ 組み込みオブジェクトとしての特徴
特性	                 内容
グローバルに定義済み	Promise はどのスクリプトでもすぐ使える
コンストラクタ関数	  new Promise((resolve, reject) => {...}) でインスタンス生成
メソッド	           .then(), .catch(), .finally() などで非同期処理を制御
静的メソッド	       Promise.resolve(), Promise.reject(), Promise.all() など

🧠 補足：Promiseの設計思想
Promiseは、非同期処理の構造を明示的に表現するための抽象化です。 
それまでのコールバック地獄（callback hell）を避け、処理の流れ・成功・失敗の分岐を構造的に記述できるように設計されています。

Promiseの状態（3つ）
Promise には必ず「状態（state）」があります。

・pending（保留中）
　まだ処理が終わっていない状態

・fulfilled（成功）
　処理が成功して値が返ってきた状態

・rejected（失敗）
　処理が失敗してエラーが返ってきた状態

具体例
// Promise を作る
const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("成功しました！"); // 成功すると fulfilled に
  } else {
    reject("エラーが発生しました"); // 失敗すると rejected に
  }
});

// Promise を使う
promise
  .then(result => {
    console.log(result); // 成功時 → "成功しました！"
  })
  .catch(error => {
    console.error(error); // 失敗時 → "エラーが発生しました"
  });

よくある実用例：API取得
fetch("https://example.com/data.json")
  .then(response => response.json()) // データが来るのを待つ
  .then(data => {
    console.log("取得成功:", data); // 成功したらここに来る
  })
  .catch(error => {
    console.error("エラー:", error); // 失敗したらここに来る
  });

Promise を使うメリット
非同期処理を「成功」「失敗」でわかりやすく書ける
ネスト地獄（コールバック地獄）を避けられる
その上で async/await を使うとさらにシンプルになる

👉 まとめると
Promise = 将来の結果を入れておく箱で、
成功したら .then() に値が渡る
失敗したら .catch() にエラーが渡る

✅ 同じ処理（API からデータを取得して表示する）を 「コールバック → Promise → async/await」 の順で比較

2. Promise（ES6, 2015〜）
// データ取得関数（Promise を返す）
function getData() {
  return fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(response => response.json());
}

// 実行
getData()
  .then(result => {
    console.log("成功:", result);
  })
  .catch(error => {
    console.error("エラー:", error);
  });


👉 .then() で処理をつなげられるので読みやすくなった。
👉 でも .then().then().catch() のチェーンが長いと少し読みにくい。

3. async/await（ES2017, 2017〜）
// async/await を使った書き方
async function getData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const result = await response.json();
    console.log("成功:", result);
  } catch (error) {
    console.error("エラー:", error);
  }
}

getData();


👉 同期処理っぽく順番に書ける ので直感的。
👉 try/catch でエラー処理できるのも大きなメリット。

📌 まとめ
コールバック → 古いけど今でも一部で残ってる
Promise → ES6 で導入、ネストが解消された
async/await → ES2017 で導入、さらにシンプルで読みやすい



✅ 明示的 vs 暗黙的：違いの本質
種類	定義方法	                    使う場面	                                初心者向けのイメージ
明示的	new Promise(...) を自分で書く	自作の非同期処理を作るとき	                自分で料理を一から作る
暗黙的	Promiseを返すAPIを使う	        fetch() や axios() などの既存APIを使うとき	レストランで料理を注文する

✅ 明示的なPromiseの例
javascript
function wait(ms) {
  return new Promise((resolve, reject) => {
    if (ms < 0) {
      reject("時間は正の値である必要があります");
    } else {
      setTimeout(() => {
        resolve(`✅ ${ms}ミリ秒待ちました`);
      }, ms);
    }
  });
}

wait(1000)
  .then(result => console.log(result))
  .catch(error => console.error("エラー:", error));

🔧 ポイント：
new Promise(...) を使って、自分で resolve（成功）と reject（失敗）を定義。
非同期処理の中身（ここでは setTimeout）も自分で書く。

✅ 暗黙的なPromiseの例
javascript
fetch("https://example.com/data.json")
  .then(response => response.json())
  .then(data => console.log("取得成功:", data))
  .catch(error => console.error("エラー:", error));

🔧 ポイント：
fetch() は内部的に Promise を返す。
開発者は new Promise を書かなくても .then() や .catch() で結果を扱える。

🧠 設計思想の違い
観点	    明示的Promise	                    暗黙的Promise
制御性	    成功・失敗の条件を自分で定義できる	APIの設計に従う
抽象度	    低い（細かく制御できる）	       高い（簡潔に使える）
透明性	    高い（内部ロジックが明示される）	抽象化されている（裏側は見えない）
再利用性	高い（汎用的な非同期関数を作れる）	限定的（APIの用途に依存）
明示的なPromiseは、非同期処理の設計そのものを自分で定義できるため、戦略的なシステム設計に向いています。



❓ APIにPromiseが含まれているかどうかは、どうしたらわかりますか？
APIにPromiseが含まれているかどうかを見極めるには、いくつかの方法があります。

🔍 1. .then() や .catch() が使えるかどうか
最も簡単な方法は、そのAPIの戻り値に .then() や .catch() が使えるかを試すことです。

javascript
const result = someAPI();

console.log(typeof result.then); // "function" なら Promise
✅ 使える → Promiseオブジェクト ❌ 使えない → Promiseではない（コールバック型や同期処理など）

📘 2. 公式ドキュメントを確認する
APIの仕様書や公式リファレンスには、Promiseを返すかどうかが明記されています。

例：
fetch() → 「Returns a Promise that resolves to a Response object」

setTimeout() → Promiseは返さない（コールバック型）

🔎 キーワードで探すと良い語句：
“Returns a Promise”
“Asynchronous function”
“Promise-based API”

🧪 3. 実際に instanceof Promise で確認する
javascript
const result = someAPI();

console.log(result instanceof Promise); // true なら Promise
ただし、これは ネイティブの Promise である場合に限るので、ライブラリによっては別の型になることもあります（例：RxJSのObservableなど）。

🧠 補足：設計の観点から
Promiseを返すAPIは、非同期処理の抽象化と制御性を高める設計思想に基づいています。 
そのため、PromiseベースのAPIは以下のような特徴を持ちます：

特徴	                      意味
チェーン可能	           .then() や .catch() で処理を連結できる
エラーハンドリングが明示的	try/catch や .catch() で失敗を扱える
構造が予測可能	           成功・失敗の分岐が明確で、テストしやすい

❓ Promiseを返さないAPIの具体例について
Promiseを返さないAPIは、主に古典的なコールバック型の非同期処理や同期的な処理に分類されます。

🧵 Promiseを返さないAPIの代表例
1. setTimeout() / setInterval()

javascript
setTimeout(() => {
  console.log("1秒後に実行");
}, 1000);
✅ 非同期処理だが、Promiseは返さない
❌ .then() や .catch() は使えない
🔧 コールバック関数で処理を渡す必要がある

2. Node.js の fs.readFile()（非Promise版）
javascript
const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error("読み込みエラー:", err);
  } else {
    console.log("ファイル内容:", data);
  }
});
✅ 非同期処理だが、コールバック型
❌ Promiseは返さない（ただし fs.promises.readFile() はPromise対応）

3. DOM操作系（同期処理）
javascript
const element = document.getElementById("myDiv");
element.style.color = "red";
✅ 即時に結果が得られる同期処理
❌ 非同期ではないので、Promiseの必要がない

4. イベントリスナー（非同期だがPromiseではない）
javascript
document.addEventListener("click", () => {
  console.log("クリックされました");
});
✅ 非同期的に動作するが、イベント駆動型
❌ Promiseは返さない（イベントが発生するまで待つ構造）

🧠 補足：Promise非対応APIの設計的意味
Promiseを返さないAPIは、制御構造が分散しやすく、エラーハンドリングが一貫しないという課題があります。
そのため、現代の設計では以下のような流れが一般的です：

状況	            推奨される設計
コールバック型API	Promiseでラップする（例：util.promisify()）
同期処理	       そのままでOK（非同期化する必要がない）
イベント型	        Promise + EventTarget を組み合わせることで制御性を高めることも可能

❗ 今後の課題
Promise非対応APIをPromise化するテクニック（ラッパー関数や async/await との統合）の深堀