JavaScript イベントループ 非同期API について 20250901

非同期APIとイベントループの関係は、JavaScriptやNode.jsの設計思想に深く関わる重要なテーマです。

🧠 なぜ「非同期API」が必要なのか？
現代のアプリケーションは、待ち時間がある処理（I/O、ネットワーク、タイマーなど）を大量に扱います。
もしこれらをすべて「同期的」に処理すると、1つの処理が終わるまで他の処理が止まってしまい、ユーザー体験が悪化します。

そこで登場するのが「非同期API」。これは、処理を依頼したらすぐに次の処理に進み、結果が返ってきたら後で通知するというスタイルです。まるで「仕事を頼んでおいて、返事が来るまで別の仕事をしている」ようなものです。

🔄 イベントループとは何か？
イベントループは、JavaScriptやNode.jsが非同期処理を管理する仕組みです。
以下のような流れで動いています：

🧩 イベントループの基本構造
項目	                            説明
Call Stack	                       同期処理が積まれる場所。関数が呼ばれるとここに積まれる。
Task Queue（マクロタスク）	        setTimeout や I/O などの非同期処理が完了したらここに入る。
Microtask Queue（マイクロタスク）	Promise.then() や queueMicrotask() などの細かい非同期処理がここに入る。

🔁 処理の流れ
Call Stack が空になるまで同期処理を実行

Microtask Queue をすべて実行

Task Queue から1つ取り出して実行

1〜3を繰り返す

このループが高速で回ることで、非同期処理が「順番に」「効率よく」実行されます。

🧪 実例で理解する
javascript
console.log('A');

setTimeout(() => {
  console.log('B');
}, 0);

Promise.resolve().then(() => {
  console.log('C');
});

console.log('D');
出力順：
コード
A
D
C
B
なぜこの順番？
AとDは同期処理 → すぐ実行

Promise.then() は Microtask → 同期の後すぐ実行

setTimeout(..., 0) は Task Queue → 1ループ後に実行

このように、Microtask（Promise）はTask（setTimeout）よりも優先されるのがイベントループの特徴です。

❓ 非同期APIはPromisベースですか？
はい、現在のJavaScriptにおける非同期APIの多くはPromiseベースで設計されています。
これは、非同期処理の結果を「将来」受け取ることを約束するオブジェクトであり、以前のコールバック方式に比べて、可読性・保守性・エラーハンドリングの面で大きな進化をもたらしました2。

🔧 Promiseベースの代表的な非同期API
API名	        説明
fetch()	        ネットワークリクエスト。Promiseを返す。
setTimeout()	厳密にはPromiseを返さないが、ラップ可能。
axios	        PromiseベースのHTTPクライアント。
navigator.geolocation.getCurrentPosition()	コールバック方式だが、Promise化可能。

🧪 Promiseの基本構文
javascript
const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("成功しました");
  } else {
    reject("失敗しました");
  }
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error));
このように、非同期処理の成功・失敗を明示的に扱えるのがPromiseの強みです。

🧘 async/awaitとの関係
Promiseはasync/awaitの基盤でもあります。awaitはPromiseの完了を待つ構文糖衣であり、非同期処理を同期的に書けるように見せることで、さらにコードの可読性を高めます。

javascript
async function getData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error("エラー:", error);
  }
}