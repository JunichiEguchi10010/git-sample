Javascript 関数の作り方 20250810

// 割引率を受け取り、それに応じた割引関数を返す高階関数（関数を返す関数）
function createDiscount(rate) {
  // 実際の価格を受け取り、割引後の価格を計算する関数を返す
  return function (price) {
    return price * (1 - rate); // 割引率を適用して価格を計算
  };
}

// 10%割引する関数を生成（rate = 0.1） クロージャ rate を記憶
const tenPercentOff = createDiscount(0.1);

// 1000円の商品に10%割引を適用 → 結果は900円
console.log(tenPercentOff(1000)); // 900

💡補足ポイント
createDiscount は 高階関数（関数を返す関数）です。
tenPercentOff は クロージャになっていて、rate を記憶しています。
このような設計にすると、再利用性が高く、柔軟な割引ロジックが作れます。

🎯 期待された機能（目的）
✅ 「割引率に応じて、価格を割引する関数を作りたい」
つまり：
ある割引率（例：10%）を指定すると、
その割引率を使って価格を計算する関数が手に入る。
その関数に価格を渡すと、割引後の価格が返ってくる。

🧠 なぜこの形にしたのか？
この設計には意図的なメリットがあります：

意図	                    説明
🎛 柔軟性	            割引率ごとに関数を生成できる（10%、20%、50%など）
🔁 再利用性	           一度作った割引関数を何度でも使える
🧠 クロージャ活用	   rate を記憶した関数を返すことで、状態を保持できる
🧼 シンプルな呼び出し	tenPercentOff(価格) のように直感的に使える
🧩 まとめると…
この関数は「割引率を指定して、価格を割引する関数を生成する」という目的で作られています。 
その結果、高階関数＋クロージャという構造になり、柔軟で再利用可能な割引ロジックが実現されています。


❓クロージャ(状態保存として元の値を設定)を引数として高階関数（計算ロジック）で呼び込み、期待された機能を成立させている認識で合っていますか？
→はい、かなり本質を捉えています！👏 あなたの認識はほぼ正確で、あと少し整理すれば完璧です。
以下でわかりやすく整理してみましょう。

✅ あなたの認識のポイント
クロージャ（状態保存として元の値を設定）を引数として 高階関数（計算ロジック）で呼び込み、期待された機能を成立させている

この認識は、以下のように分解できます：

要素                    	解釈	                            正確性
クロージャ	           割引率（rate）を記憶して状態を保持する	✅ 正しい
高階関数	           関数を返すことでロジックを生成する	    ✅ 正しい
引数として呼び込む	    rate を渡して関数を生成する	            ✅ 正しい
期待された機能	       割引計算を柔軟に行う	                   ✅ 正しい

🔍 より正確に言い換えると…
「割引率という状態（クロージャ）を保持した関数を、高階関数によって生成し、その関数が価格に対して割引計算を行う」

つまり：
クロージャ：rate を記憶して、後から使えるようにする
高階関数：関数を返すことで、割引ロジックを動的に作る
期待された機能：価格に対して、指定した割引率で計算する関数を得る

🧠 図でイメージすると…
text
createDiscount(rate) ──▶ 割引関数(price) ──▶ 割引後の価格
        ↑
     クロージャで rate を記憶

✅ 結論
あなたの認識は非常に的確です！ 少し言葉を整理すると、より明確に「クロージャによって状態を保持し、高階関数によってロジックを生成している」という構造が見えてきます。

「クロージャ＋高階関数」の考え方は、柔軟で再利用可能なロジックを作るための超強力なパターンです。 

📝 1. ログ出力関数（ログレベルを記憶）
javascript
function createLogger(level) {
  return function (message) {
    console.log(`[${level.toUpperCase()}] ${message}`);
  };
}

const infoLog = createLogger("info");
const errorLog = createLogger("error");

infoLog("処理が正常に完了しました"); // [INFO] 処理が正常に完了しました
errorLog("エラーが発生しました");     // [ERROR] エラーが発生しました

✅ コード説明
// 🔧 ログ出力関数を生成する関数（ログレベルを記憶する）関数を返す関数（高階関数）
function createLogger(level) {
  // 内部関数を返す：この関数がログメッセージを出力する：level は クロージャとして記憶される ので、返された関数内で使える
  return function (message) {
    // ログレベルを大文字にして、メッセージと一緒に表示
    console.log(`[${level.toUpperCase()}] ${message}`);
  };
}

// 🟢 infoレベルのログ関数を作成（ログレベル "info" を記憶）
const infoLog = createLogger("info");

// 🔴 errorレベルのログ関数を作成（ログレベル "error" を記憶）
const errorLog = createLogger("error");

// ✅ infoレベルのログを出力
infoLog("処理が正常に完了しました"); // [INFO] 処理が正常に完了しました

// ❌ errorレベルのログを出力
errorLog("エラーが発生しました");     // [ERROR] エラーが発生しました

✅ ポイント
level をクロージャで記憶
高階関数でログ出力関数を生成
ログの種類ごとに関数を使い分けられる


💰 2. 税率計算関数（税率を記憶）
javascript
function createTaxCalculator(taxRate) {
  return function (price) {
    return price * (1 + taxRate);
  };
}

const japanTax = createTaxCalculator(0.1); // 10% 消費税
const usTax = createTaxCalculator(0.07);   // 7% 税率

console.log(japanTax(1000)); // 1100
console.log(usTax(1000));    // 1070

✅ コード説明
// 💰 税率を受け取って、税込価格を計算する関数を返す高階関数
function createTaxCalculator(taxRate) {
  // 🧮 実際の価格を受け取り、税率を加算して税込価格を返す関数
  return function (price) {
    return price * (1 + taxRate); // 税率を加算して合計金額を計算
  };
}

// 🇯🇵 日本の消費税（10%）を適用する計算関数を作成
const japanTax = createTaxCalculator(0.1);

// 🇺🇸 アメリカの税率（7%）を適用する計算関数を作成
const usTax = createTaxCalculator(0.07);

// ✅ 日本の税込価格を計算（1000円 → 1100円）
console.log(japanTax(1000)); // 1100

// ✅ アメリカの税込価格を計算（1000ドル → 1070ドル）
console.log(usTax(1000));    // 1070

✅ ポイント
taxRate をクロージャで保持
高階関数で国ごとの税計算関数を生成
国や地域ごとの税率に対応可能


🖱️ 3. 条件付きイベントハンドラー（条件を記憶）
javascript
function createClickHandler(isEnabled) {
  return function () {
    if (isEnabled) {
      console.log("クリックされました！");
    } else {
      console.log("この操作は無効です。");
    }
  };
}

const activeHandler = createClickHandler(true);
const disabledHandler = createClickHandler(false);

activeHandler();   // クリックされました！
disabledHandler(); // この操作は無効です。


✅ コード説明
// 🖱️ 条件付きのクリックイベントハンドラーを作成する関数
function createClickHandler(isEnabled) {
  // 🧠 isEnabled（有効かどうか）を記憶した関数を返す
  return function () {
    // ✅ 有効な場合はクリックされたことを表示
    if (isEnabled) {
      console.log("クリックされました！");
    } else {
      // 🚫 無効な場合は操作できないことを表示
      console.log("この操作は無効です。");
    }
  };
}

// 🔓 有効なクリックハンドラー（true を渡す）
const activeHandler = createClickHandler(true);

// 🔒 無効なクリックハンドラー（false を渡す）
const disabledHandler = createClickHandler(false);

// 🖱️ 実行：有効なハンドラー → メッセージが表示される
activeHandler();   // クリックされました！

// 🖱️ 実行：無効なハンドラー → 無効メッセージが表示される
disabledHandler(); // この操作は無効です。

✅ ポイント
isEnabled をクロージャで記憶
高階関数で条件付きのイベント処理を生成
UIの状態に応じた動作を切り替えられる

🧩 共通構造まとめ
要素	    内容
クロージャ	状態（ログレベル、税率、条件など）を記憶
高階関数	状態に応じた処理ロジックを生成
目的	    柔軟・再利用・条件分岐・状態保持の実現

🚀 応用アイデア
🔹 認証状態に応じたAPI呼び出し関数

🔹 ユーザー権限に応じた表示制御関数

🔹 言語設定に応じた翻訳関数

🔹 関数の合成（compose / pipe）
複数の関数をつなげて処理を構築する

🔹 カリー化（currying）
引数を分割して関数を段階的に呼び出す

🔹 再帰関数
自分自身を呼び出す関数で、繰り返し処理を構築

🔹 非同期関数（async/await）
Promiseを使った非同期処理の関数設計

🔹 関数型プログラミングの考え方
副作用を避け、純粋関数でロジックを構築する