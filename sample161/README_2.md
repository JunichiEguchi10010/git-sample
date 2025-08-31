JavaScript 非同期処理 Promiseとは？

Promise は ES6（2015年）で正式導入
その後のバージョンで便利なメソッドが少しずつ増えている
async/await は ES2017（2017年）から

JavaScript で「非同期処理の結果を表す箱」のようなものです。
まだ結果がわからないけど「いずれ成功するか失敗するか」を約束（Promise）してくれます。

Promiseの状態（3つ）

Promise には必ず「状態（state）」があります。

pending（保留中）
　まだ処理が終わっていない状態

fulfilled（成功）
　処理が成功して値が返ってきた状態

rejected（失敗）
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
Promise = 将来の結果を入れておく箱
で、

成功したら .then() に値が渡る

失敗したら .catch() にエラーが渡る


✅ 同じ処理（API からデータを取得して表示する）を 「コールバック → Promise → async/await」 の順で比較

1. コールバック（昔の書き方）
// データ取得関数（コールバックを受け取る）
function getData(callback) {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(response => response.json())
    .then(data => callback(null, data))
    .catch(error => callback(error));
}

// 実行
getData((error, result) => {
  if (error) {
    console.error("エラー:", error);
  } else {
    console.log("成功:", result);
  }
});


👉 ネストが増えると「コールバック地獄」になりがち。

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