JavaScript 関数の使い方と活用法 20250922

1. 関数って何？
関数とは 「処理のまとまり」 です。
よく使う処理をまとめて「名前をつけて保存」しておけるイメージ。

例：
function sayHello() {
  console.log("こんにちは！");
}

function … 関数を作りますよ、という宣言
sayHello … 関数の名前（自分で好きにつけられる）
{ ... } … ここに実行したい処理を書く

呼び出し方：
sayHello(); // → コンソールに「こんにちは！」と出る

👉 一度作れば、何回でも呼び出せるのが関数の強みです。

2. 変数を使わないシンプルな関数
function greet() {
  console.log("おはよう！");
}
greet(); // 実行 → おはよう！

毎回同じ結果を返す「定型処理」なら、引数は不要。
ただし、同じメッセージしか出せないので柔軟性が低い。

3. 関数に変数を入れる（引数）
関数に 値を渡す仕組み が「引数（ひきすう、parameter）」です。
これを使うと「呼び出すときに違う値を渡して、同じ処理を応用できる」ようになります。

例：
function greet(name) {
  console.log("こんにちは " + name + " さん！");
}

greet("太郎");   // → こんにちは 太郎 さん！
greet("花子");   // → こんにちは 花子 さん！


👉 name は関数の中だけで使える「一時的な変数」になります。
呼び出すときに "太郎" や "花子" が代入されるイメージです。

4. 値を返す（return）
関数は「結果を返す」こともできます。
返した値は関数の外で使えます。

例：
function add(a, b) {
  return a + b;
}

let result = add(3, 5);  
console.log(result); // → 8

a, b … 呼び出すときに渡す数字
return a + b; … 計算結果を返す
result に返り値（ここでは 8）が入る

👉 「関数の外で使いたい結果があるときは return」を覚えておくとよいです。

5. 変数を関数に入れるときの勘所 ✨
処理が繰り返し出てくるなら、関数にまとめる
例: 「消費税を計算する処理」「文字を表示する処理」

毎回違う値を使いたいなら、引数を使う
例: 商品の値段が違う → calcTax(120) と calcTax(200)

結果を次の処理で使いたいなら、return で返す
例: 税込価格を計算 → その値を画面に表示する

6. 具体例：消費税計算
// 消費税率
const TAX = 1.1;

// 税込み価格を計算する関数
function calcTax(price) {
  return Math.floor(price * TAX); // 小数点切り捨て
}

// 関数を使う
console.log(calcTax(100)); // → 110
console.log(calcTax(250)); // → 275

👉 price に入れる値を変えるだけで、同じ処理を使い回せる！

7. HTMLと組み合わせると…
<div id="result"></div>
<script>
  const TAX = 1.1;

  function calcTax(price) {
    return Math.floor(price * TAX);
  }

  function showPrice(price) {
    const result = document.getElementById("result");
    result.textContent = price + "円の税込価格は " + calcTax(price) + "円です";
  }

  showPrice(300);
</script>

👉 Webページに「300円の税込価格は330円です」と表示される。

✅ まとめ
関数 = 処理のまとまり
引数 = 関数に渡す値 → 柔軟性が出る
return = 計算結果を外で使うための出口
勘所は「繰り返し」「変化する値」「結果を使う」場面で関数を設計すること

💡 頻出する「値段・数量」などの変数例
1. お金に関するもの
・price: 商品価格（例: 120, 980, 10000）
・taxRate: 消費税率（例: 0.1, 0.08, 0.05）
・discountRate: 割引率（例: 0.1 = 10%割引）
・shippingFee: 送料（例: 500, 0 = 送料無料）
・totalAmount: 合計金額

2. 商品や在庫
・quantity: 購入数（例: 1, 2, 5, 10）
・stock: 在庫数（例: 50, 120, 0 = 在庫切れ）
・itemName: 商品名（例: "リンゴ", "ノートPC"）
・category: 商品カテゴリー（例: "食品", "日用品", "家電")

3. 顧客・利用者
・userName: 名前（例: "田中太郎")
・age: 年齢（例: 25, 50）
・address: 住所（例: "東京都新宿区...")
・memberRank: 会員ランク（例: "silver", "gold", "platinum"）

4. 日付・時間
・orderDate: 注文日（例: "2025-09-22")
・deliveryDate: 配送予定日
・createdAt / updatedAt: 作成日・更新日（システムでよく使う）

5. 割引・キャンペーン
・couponCode: クーポンコード（例: "DISCOUNT10")
・salePrice: セール価格
・isCampaign: キャンペーン対象かどうか（例: true / false）
・
6. よく使う計算系
・subtotal: 小計
・taxAmount: 消費税額
・finalPrice: 最終的な支払額
・average: 平均値
・max / min: 最大値・最小値

✅ サンプルコード（商品購入計算）
const TAX_RATE = 0.1; // 10%

function calcTotal(price, quantity, shippingFee = 500) {
  const subtotal = price * quantity;
  const taxAmount = subtotal * TAX_RATE;
  const total = subtotal + taxAmount + shippingFee;
  return total;
}

console.log(calcTotal(120, 2));  // 120円の商品を2個 → 884円
console.log(calcTotal(980, 1, 0)); // 送料無料キャンペーン → 1078円

👉 price（価格）、quantity（数量）、shippingFee（送料）を変数として入れて、よくある買い物計算を再現できます。

🎯 ポイント
・頻出変数を想定しておくと、プログラムの「何を引数にするか」がすぐ決まる
・実社会では お金・数量・日付 が特に多い
・true/false（フラグ）もよく使う（例: 送料無料かどうか）


✅ 実務での関数例
🛒 1. 合計金額を計算する関数
/**
 * 商品の合計金額を計算する
 * @param {number} price - 商品の単価
 * @param {number} quantity - 商品の数量
 * @returns {number} 合計金額（単価 × 数量）
 */
function calculateTotal(price, quantity) {
  return price * quantity;
}

// 使用例: 単価500円の商品を3個購入
console.log(calculateTotal(500, 3)); // 出力: 1500

💸 2. 割引価格を計算する関数
/**
 * 割引を適用した価格を計算する
 * @param {number} price - 元の価格
 * @param {number} discountRate - 割引率（例: 20 → 20%）
 * @returns {number} 割引後の価格
 */
function applyDiscount(price, discountRate) {
  const discount = price * (discountRate / 100); // 割引額を計算
  return price - discount; // 元の価格から割引額を引いた値を返す
}

// 使用例: 10,000円の商品に20%割引
console.log(applyDiscount(10000, 20)); // 出力: 8000

📦 3. 税込み金額を計算する関数
/**
 * 税込み金額を計算する
 * @param {number} price - 税抜き価格
 * @param {number} [taxRate=10] - 税率（デフォルト10%）
 * @returns {number} 税込み金額（小数点以下は切り捨て）
 */
function addTax(price, taxRate = 10) {
  return Math.floor(price * (1 + taxRate / 100)); 
}

// 使用例: 8,000円に消費税10%を加算
console.log(addTax(8000)); // 出力: 8800

🏬 4. 在庫チェックをする関数
/**
 * 注文数量に対して在庫が足りているかを判定する
 * @param {number} stock - 現在の在庫数
 * @param {number} quantity - 注文数量
 * @returns {string} "注文可能" または "在庫不足"
 */
function checkStock(stock, quantity) {
  return stock >= quantity ? "注文可能" : "在庫不足";
}

// 使用例: 在庫10個に対して注文12個
console.log(checkStock(10, 12)); // 出力: "在庫不足"

📊 5. 複数商品の合計金額を計算する関数
/**
 * カート内の全商品の合計金額を計算する
 * @param {Array} cartItems - 商品リスト（オブジェクト配列）
 *  各商品オブジェクトの形式: { name: string, price: number, quantity: number }
 * @returns {number} カート内の合計金額
 */
function calculateCartTotal(cartItems) {
  return cartItems.reduce((total, item) => {
    return total + item.price * item.quantity; // 各商品の小計を足していく
  }, 0);
}

// 使用例: カートに3種類の商品が入っている場合
const cart = [
  { name: "Tシャツ", price: 2000, quantity: 2 },
  { name: "パンツ", price: 3500, quantity: 1 },
  { name: "帽子", price: 1500, quantity: 3 }
];
console.log(calculateCartTotal(cart)); // 出力: 12000

🔎 @param の意味
・関数の引数（パラメータ）の説明 を書くときに使います。
・型（number, string, Array など）と、引数の名前、説明を書くのが基本。

例
 @param {number} stock
 引数の説明を明示 { 型 } 変数名

/**
 * 商品の合計金額を計算する
 * @param {number} price - 商品の単価
 * @param {number} quantity - 商品の数量
 * @returns {number} 合計金額
 */
function calculateTotal(price, quantity) {
  return price * quantity;
}

🛠️ エディタでの効果
たとえば VS Code などのエディタでこの関数を使おうとすると…
calculateTotal(   // ← 引数を入力すると補完候補が出る

このとき、JSDocに書いた @param {number} price - 商品の単価 が ツールチップで表示されます。
つまり、自分や他人がコードを使うときに「何を入れればいいのか」が一目でわかるようになります。

📌 よく使うタグ
@param … 引数の説明
@returns … 関数の戻り値の説明
@example … 使用例を書く
@deprecated … 廃止予定の関数に注意を出す

💡 まとめ
・@param = 関数の「入力（引数）」を説明するルール
・型・引数名・説明 を書く
・VS Code などで入力補助やエラー防止に役立つ

❌ 定義ではない理由
JSDocのコメント（@param）は コードそのものを定義するものではありません。
あくまで 人間やツールに「説明」しているだけです。


JavaScriptで関数（function）を使う方法と活用方法を紹介！実際の例を見ながら関数について理解しましょう
 https://www.youtube.com/watch?v=GDXsuwsyaBU

動画の要約
 HTML と JavaScript の連携
・script src="script.js" を使って外部ファイルを読み込む。
・開発では console.log で処理結果を確認しながら進める。

消費税計算を例に関数を学習
・消費税率（例: 1.1 や 1.2）を変数で定義。
・税込価格を計算する関数を作成して活用する。

関数の定義と呼び出し
・定義: function 関数名() { 処理 }
・呼び出し: 関数名()
・関数を呼ばないと処理は実行されない。

値を返す関数
・return を使うと、処理結果を関数の外で使える。
・例: return tax; → 呼び出した場所に計算結果が返る。

引数の活用
・function calc(price) { return price * tax; }
・呼び出し時に calc(120) のように値を渡すと、その値を元に計算できる。
・どんな価格でも柔軟に計算可能。

HTML への出力
・document.getElementById("result").textContent = "表示内容";
・関数を使って任意の div や要素に税込価格を表示できる。

関数の組み合わせ
・insertText(element, price) のように複数の引数を受け取り、
・どの要素に出力するか
・どの価格を計算するかを自由に指定できる。
・result1, result2 など複数の領域にそれぞれ別の価格計算を表示可能。

スコープ（有効範囲）
・関数の中で定義した変数や関数は、その外側では使えない。
・よく使う処理は外側に、限定的に使う処理は内側に書くと整理しやすい。

まとめ
・関数を使うと 繰り返しの処理をまとめて簡潔に書ける。
・引数や return を使うと 再利用性が高まり、柔軟なコードが書ける。
・HTML と組み合わせれば、シンプルなアプリケーションの基礎も作れる。