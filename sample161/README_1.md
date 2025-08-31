JavaScript 非同期処理 async/await について 20250901

1.非同期処理とは？

JavaScript は「一度にひとつの処理」しかできません（シングルスレッド）。
でも実際の開発では、
サーバーからデータを取得する（API 呼び出し）
ファイルを読み込む
タイマー処理をする
といった「時間がかかる処理」があります。
これを 待たずに次の処理を進める 仕組みが「非同期処理」です。

2. Promise と async/await の関係

昔は「コールバック関数」で非同期処理を扱っていましたが、複雑になりやすいので Promise が登場しました。

fetch("https://example.com/data.json")
  .then(response => response.json())
  .then(data => {
    console.log("取得成功:", data);
  })
  .catch(error => {
    console.error("エラー:", error);
  });


Promise は便利ですが、.then().then().catch() とつなげる書き方がちょっと読みにくいんですよね。

そこで登場したのが async/await。
Promise を「同期処理っぽく」書けるようになります。

3. async/await の基本

async
関数の前に書くと、その関数は必ず Promise を返す関数になります。

await
Promise の結果が返ってくるまで「待つ」ことができます。
ただし await は async 関数の中でしか使えません。

例：Promise を async/await に書き換え
// Promise で書くとこうなる
fetch("https://example.com/data.json")
  .then(response => response.json())
  .then(data => {
    console.log("取得成功:", data);
  })
  .catch(error => {
    console.error("エラー:", error);
  });


// async/await だとこう書ける
async function getData() {
  try {
    const response = await fetch("https://example.com/data.json");
    const data = await response.json();
    console.log("取得成功:", data);
  } catch (error) {
    console.error("エラー:", error);
  }
}

getData();


👉 見た目は「順番に処理している」ように書ける ので、読みやすいです。

4. メリットまとめ

then チェーンより読みやすい

普通の同期処理っぽく書ける

try/catch でエラー処理ができる

5. 覚えるコツ

async = 「この関数の中では await が使えるよ」

await = 「Promise の結果が返るまで待つ」

つまりイメージすると、
📦 Promise を開けて中身を取り出すための魔法の言葉 が await です。