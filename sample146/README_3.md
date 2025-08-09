Javascript アロー関数（arrow function）とthisの関係 20250810

✨ アロー関数とは？
アロー関数は、JavaScriptで関数を短く・シンプルに書くための新しい記法です。
名前の通り「⇒（矢印）」を使って関数を定義します。

🧾 基本の書き方
javascript
const sayHello = () => {
  console.log("こんにちは！");
};
これは、次のような普通の関数と同じ意味です：

javascript
function sayHello() {
  console.log("こんにちは！");
}
🍱 引数ありの例
javascript
const add = (a, b) => {
  return a + b;
};
さらに、処理が1行だけなら return を省略できます：

javascript
const add = (a, b) => a + b;
🧒 引数が1つだけならカッコも省略できる
javascript
const square = x => x * x;
🧠 アロー関数の特徴
特徴	                                説明
✅ 短く書ける	                   コードがスッキリする
✅ thisが外側のスコープを引き継ぐ	イベントやコールバックで便利
❌ thisを持たない	               クラスのメソッドやコンストラクタには不向き
❌ argumentsが使えない	           レストパラメータ（...args）を使う必要あり

🎯 どんなときに使う？
コールバック関数（例：map, filter, forEach）
短い処理の関数
thisの扱いが面倒なとき（イベントや非同期処理）

🧪 例：配列の処理
javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8]

🚫 注意点
アロー関数は以下のような場面では使わない方がいいです：
クラスのメソッド
コンストラクタ関数（newで使う関数）


🧠 アロー関数の目的とは？
アロー関数はES6（ECMAScript 2015）で導入された構文で、主な目的は以下の通りです：
関数定義を簡潔に書けるようにする
コールバック関数などで可読性を高める
thisの束縛をレキシカル（静的）にする

🔍 通常の関数 vs アロー関数のthisの違い
特徴	                     通常の関数 (function)	        アロー関数 (=>)
thisの参照	               呼び出し元によって動的に決まる	定義されたスコープのthisを継承する（レキシカル）
newでインスタンス化	        可能	                       不可能（コンストラクタではない）
argumentsオブジェクト	    利用可能	                   利用不可（代わりにレストパラメータを使う）

💡 アロー関数を使うとなぜthisの扱いが楽になるの？
JavaScriptでは、関数の中でthisが意図しないオブジェクトを指すことがよくあります。
特にコールバックやイベントハンドラで。

javascript
function Timer() {
  this.seconds = 0;
  setInterval(function () {
    this.seconds++; // ← ここでのthisはTimerではなく、グローバルオブジェクト
  }, 1000);
}
これをアロー関数で書くと：

javascript
function Timer() {
  this.seconds = 0;
  setInterval(() => {
    this.seconds++; // ← thisはTimerのインスタンスを指す
  }, 1000);
}
このように、アロー関数は外側のthisをそのまま使うので、意図したオブジェクトを参照しやすくなります。

✅ まとめ
アロー関数は「thisの制御のために作られた」わけではないが、thisの扱いが自然で便利になるという副次的なメリットがある。
主な目的は簡潔な関数定義とレキシカルなスコープの導入。