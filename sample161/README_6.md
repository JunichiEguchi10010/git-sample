Javscript コールバック関数 コールバック処理 20250902

🟥 まとめ
コールバック関数 = 「あとで呼ぶために渡す関数」
同期処理でも非同期処理でも使える
非同期処理（setTimeout, イベント, 通信…）でコールバック処理を使うことが多いから「コールバック＝非同期」と思われがち

使いどころ：
イベントが起きたら呼ぶ（クリック・入力・アニメーション終了）
時間がかかる処理が終わったら呼ぶ（Ajax / Fetch / ファイル読み込み）
繰り返し処理の1ステップごとに呼ぶ（配列の map, forEach など）

🟥 コールバック関数 ＝ 非同期処理 ではない
コールバック関数 は「あとで呼ばれる関数」のこと。
→ 同期処理の中でも普通に使えます。

🟥 なぜ「コールバック＝非同期」っぽく見えるのか？
JavaScriptでよく出てくるコールバックの代表例が 非同期処理（setTimeout, Ajax, イベント処理など） だからです。
非同期処理を扱うときに 「処理が終わったら呼ぶ関数」 としてコールバックが登場する
そのせいで「コールバック＝非同期」と混同しやすい

❓ コールバック関数とは？
「関数に“あとで実行してね”と渡しておく関数」がコールバックです。
プログラムに「この作業が終わったらこの関数を呼んでね」と**“電話で折り返し”**を頼むイメージ。

まずは最短の例
function hello(name) {
  console.log(`こんにちは、${name}さん！`);
}

function greetLater(callback) {        // ← 関数を受け取る
  setTimeout(() => {                   // 1秒後に……
    callback("江口");                  // ← 渡された関数を呼ぶ（コールバック）
  }, 1000);
}

greetLater(hello); // 1秒後: こんにちは、江口さん！


greetLater は 関数を引数として受け取る。

その関数を、**適切なタイミング（あとで）**で実行する → これがコールバック。

どこで使うの？

イベント処理

button.addEventListener("click", () => {
  console.log("クリックされた！");
});


クリック“されたとき”に呼ばれる関数がコールバック。

非同期処理（時間のかかる処理の結果を受け取る）

setTimeout(() => {
  console.log("3秒後に実行");
}, 3000);


配列メソッド

const nums = [1, 2, 3];
// map / filter / forEach もコールバックを使う
const doubled = nums.map(n => n * 2);   // [2, 4, 6]

“自分で”コールバック対応の関数を作る
function doTask(data, onDone) {        // onDone がコールバック
  // 何か処理…
  const result = data.toUpperCase();
  onDone(result);                      // 結果を渡して呼び出す
}

doTask("hello", (res) => {
  console.log(res); // "HELLO"
});

エラーも返したい場合（Node.js流 “エラーファースト”）
function readConfig(path, callback) {
  if (!path.endsWith(".json")) {
    callback(new Error("JSON以外は読み込めません")); // ①エラーを先頭で渡す
    return;
  }
  // 正常時
  const config = { theme: "light" };
  callback(null, config); // ②エラーは null、結果を第2引数で
}

readConfig("site.json", (err, cfg) => {
  if (err) { console.error(err.message); return; }
  console.log(cfg.theme); // "light"
});

実行順序のコツ（なぜ“あとで”なの？）

JavaScript は基本1本の道（シングルスレッド）。
時間がかかる処理（通信・タイマー・ファイル読み込みなど）はいったん預けて、
終わったらコールバックで知らせてもらう仕組みです（イベントループ）。

同期処理：上から順にすぐ実行

非同期 + コールバック：今は飛ばして、終わったタイミングで“折り返し”

console.log("A");
setTimeout(() => console.log("B(1秒後)"), 1000);
console.log("C");
// 実行順: A → C → （1秒後）B

よくあるつまずき＆回避法

ネスト地獄（Callback Hell）

// 悪い例（深いピラミッド）
step1((a) => {
  step2(a, (b) => {
    step3(b, (c) => {
      // …
    });
  });
});


回避法

関数を分けて名前を付ける

Promise / async/await を使う（後述）

コールバックの二重呼び出し

function fn(cb) {
  if (Math.random() > 0.5) cb("once");
  // うっかりもう一回
  cb("twice"); // バグの元！
}


対策：

早期 return を徹底

フラグでガードする

そもそも Promise に寄せる

this の文脈を失う

const obj = {
  name: "Taro",
  hi() { console.log(this.name); }
};

setTimeout(obj.hi, 0); // undefined になることがある
// 対策:
setTimeout(() => obj.hi(), 0);      // or
setTimeout(obj.hi.bind(obj), 0);


例外が握りつぶされる

コールバック内のエラーは、元の try/catch では捕まらないことがあるので注意。

可能なら Promise/async に置き換え、try/catch で包むほうが安全。

Promise / async/await との関係（ざっくり）

コールバックは元祖。

Promise は「**状態管理（成功/失敗）**がしやすい」器。

async/await は Promise を“同期っぽく書ける”糖衣構文。

同じ処理の比較

コールバック版
getUser(id, (err, user) => {
  if (err) return console.error(err);
  getPosts(user.id, (err, posts) => {
    if (err) return console.error(err);
    console.log(posts);
  });
});

async/await 版（読みやすい）
async function main() {
  try {
    const user  = await getUser(id);    // Promise を返す関数前提
    const posts = await getPosts(user.id);
    console.log(posts);
  } catch (e) {
    console.error(e);
  }
}
main();


結論：
ライブラリや古いAPIではコールバックが残っています → 読める・書ける必要あり。
自作や新規なら Promise/async を基本にし、どうしてもならコールバック。

使いどころの目安
イベント（クリック・スクロール・入力）→ コールバックでOK
新規の非同期ロジック（通信・待ち）→ Promise/async を推奨
既存の“コールバックAPI”を使う → ラップして Promise 化が快適

// 一度だけ、コールバックAPIをPromiseに包む“promisify”
function promisify(fn) {
  return (...args) => new Promise((resolve, reject) => {
    fn(...args, (err, result) => err ? reject(err) : resolve(result));
  });
}

チートシート（覚えておくポイント）
コールバック = 関数を引数に渡し、あとで実行してもらう仕組み
イベント／タイマー／配列メソッドで多用される
非同期の実行順序に注意（A→C→B みたいな順になり得る）
二重呼び出ししない・エラーを最初に返す・thisに注意
新規実装は Promise/async を優先、既存のコールバックAPIは promisify で扱いやすく