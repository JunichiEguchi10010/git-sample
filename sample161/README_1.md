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

Promiseベースのコード
fetch("https://example.com/data.json") // ① Promiseを返す関数
  .then(response => response.json())   // ② レスポンスをJSONに変換（これもPromise）
  .then(data => {                      // ③ JSONデータを受け取って処理
    console.log("取得成功:", data);
  })
  .catch(error => {                    // ④ どこかでエラーが起きたらここで処理
    console.error("エラー:", error);
  });

✅ コードに含まれている要素
要素	            含まれているか	    説明
Promise	            ✔️	            fetch() や .then() はすべて Promise を使った非同期処理
コールバック関数     ✔️              .then() や .catch() に渡されている関数はコールバック
つまり、Promiseベースのコードの中にコールバック関数が含まれているという構造です。

上記のようにPromise は便利ですが、.then().then().catch() とつなげる書き方がちょっと読みにくいんですよね。

そこで登場したのが async/await。
Promise を「同期処理っぽく」書けるようになります。

3. async/await の基本

🟧 async
関数の前に書くと、その関数は必ず Promise を返す関数になります。

🟧 await
Promise の結果が返ってくるまで非同期処理の結果（値）を「待つ」ことができます。
ただし await は async 関数の中でしか使えません。


async/awaitは糖衣構文（syntax）です。以下で詳しく整理してみましょう：

🧠 async/await の正体は？
用語	    種類	            説明
async	キーワード（構文）	関数を「非同期関数」にするための構文。戻り値は常に Promise になります。
await	キーワード（構文）	Promise の完了を待つための構文。async 関数の中でしか使えません。

async/await は JavaScriptの構文であり、関数でもオブジェクトでもメソッドでもありません。
Promise をより読みやすく扱うための 糖衣構文（syntactic sugar） です。
実際には await は Promise.then() を内部的に使って処理を待っています。

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
🟥 then チェーンより読みやすい
🟥 普通の同期処理っぽく書ける
🟥 try/catch でエラー処理ができる

5. 覚えるコツ
async = 「この関数の中では await が使えるよ」
await = 「Promise の結果が返るまで待つ」

つまりイメージすると、
📦 Promise を開けて中身を取り出すための魔法の言葉 が await です。


🟥 await が「待つ」ものとは？ 非同期処理の流れの中身

await は、Promise が「解決（fulfilled）」または「拒否（rejected）」されるまで、その場で処理を一時停止します。
つまり：

何を待つ？ → Promise が完了する（成功または失敗）こと。

いつまで待つ？ → Promise が状態を持つまで（pending → fulfilled or rejected）。それが数ミリ秒でも、数秒でも、理論上は永遠でも待ちます。

🔧 実際の流れ（内部的な動き）
js
async function example() {
  const result = await fetch('https://api.example.com/data');
  console.log(result);
}
このコードの裏側では、以下のようなことが起きています：

fetch(...) は Promise を返す。

await はその Promise を受け取り、その完了を待つ。

JavaScriptのイベントループは、他の処理を進めながら Promise の完了を監視。

Promise が fulfilled になると、await の次の行（console.log）が実行される。

内部的には、await は Promise.then(...) を使って、完了時にコールバックを登録しているようなものです。

🧵 非同期の「一時停止」と「再開」
await は 非同期関数の中でのみ使える。

関数の実行は一時停止されるが、スレッドがブロックされるわけではない。

他の処理は並行して進む（ノンブロッキング）。

💡補足：もし Promise がすでに完了していたら？
await は即座にその値を返します。つまり、待つ必要がない場合はすぐに次の処理に進みます。


❓ PORMISEが解決されたら、次の処理（.then）が動作するのか？
Promiseが解決（fulfilled）されたら、.then() に登録されたコールバック関数が実行されます。

✅ 正確な表現で言うと…
Promise が 解決（fulfilled） されたとき → .then() に渡した関数が 非同期的に呼び出される。

Promise が 拒否（rejected） されたとき → .catch() に渡した関数が呼び出される。

🔄 処理の流れ（簡単な例）
js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('完了！');
  }, 1000);
});

promise.then(result => {
  console.log(result); // → '完了！' が表示される
});
この場合：

promise は 1秒後に resolve される。

.then() に渡された関数が、resolve の値 '完了！' を受け取って実行される。

🧠 補足：同期っぽく見えるけど非同期
.then() のコールバックは、Promiseが解決された瞬間にすぐ実行されるわけではなく、イベントループの次のターンで非同期的に実行されます。
これは、JavaScriptの非同期モデル（マイクロタスクキュー）によるものです。