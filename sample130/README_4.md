JavaScript prototype プロトタイプチェーンのしくみ 20250708

🔗 prototypeチェーンのしくみ
JavaScript は「プロトタイプベース」のオブジェクト指向言語です。
クラスベースではなく、オブジェクトが別のオブジェクトを継承することで振る舞いを共有します。

✔️ 基本の流れ
各オブジェクトには [[Prototype]]（内部的なプロトタイプリンク）があり、__proto__ や Object.getPrototypeOf() を使ってアクセスできます。

あるプロパティを参照するとき、まずそのオブジェクト自身にプロパティがあるか確認し、なければプロトタイプ（親オブジェクト）に探しにいきます。

これを「prototypeチェーン」と呼び、親 → 祖先 → さらに上へと探索されます。

🧭 例
javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.sayHello = function() {
  console.log("こんにちは、" + this.name + "です！");
};

const neko = new Animal("タマ");
neko.sayHello(); // "こんにちは、タマです！"
このとき、neko には sayHello が存在しないけれど、Animal.prototype にあるので、チェーンを辿って見つけてくれます。

🆚 クラス構文 vs 関数コンストラクタの違い
JavaScript では class 構文と function コンストラクタのどちらもオブジェクトを定義できます。
ただし書き方やふるまいにいくつか違いがあります。

比較項目	            function (関数)コンストラクタ          class 構文
定義方法	            function Animal() {...}	            class Animal {...}
メソッドの定義	         Animal.prototype.method = ...	    class 内に直接書ける
new キーワード	        必須	                            必須
extends による継承	    Parent.call(this) + Object.create() を使用	extends Parent と super() を使用
振る舞い	            柔軟で低レベル	                    より宣言的でモダンな構文
typeof 結果	            "function"	                        "function"（実はどちらも関数）
✅ class は ES6 で導入された構文糖衣（syntax sugar）であり、内部的にはプロトタイプベースです。





✅ 「関数コンストラクタ」(基本使わない)
オブジェクトのひな型（テンプレート）を作るための関数のことです。
new キーワードと一緒に使うことで、同じ構造を持つオブジェクトを複数生成できます。
関数コンストラクタは通常の function を使って定義しますが、特別な使い方をすることでコンストラクタ関数として機能します。

✅ function (関数)コンストラクタは「古い」けれど「非推奨」ではない(基本使わない)
ES6（ECMAScript 2015）で class 構文が導入される以前は、関数コンストラクタとプロトタイプを使ってオブジェクト指向を実現していました。
class はよりモダンで書きやすい構文になりましたが、内部的にはプロトタイプベースの動作なので、本質的な仕組みは同じです。

✔️ いまでも function コンストラクタを使うケース
レガシーコードの保守や修正
動作の細かい制御が必要なとき（class より柔軟）
ES6に対応していない環境（今はほぼないですが）

🆕 じゃあ、いつ class を使うのがいいの？
モダンな開発ではほとんどのケースで class を使う方が可読性が高く、継承も楽です。
チーム開発でも class の方が理解しやすいですし、ツールやフレームワーク（Reactなど）との相性もいいです。

🔧 比較のひとことまとめ
function コンストラクタ：歴史が長くて柔軟。細かいことができるけど書き方が複雑。
class 構文：モダンでわかりやすく、ほとんどの状況でオススメ。

javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}
このような関数に対して new を使うと、新しい User オブジェクトが生成されます：

javascript
const taro = new User("太郎", 25);
console.log(taro.name); // "太郎"
✔️ この時の動作
新しい空のオブジェクト {} が作られる

this がその新しいオブジェクトを指すようになる

プロパティが this を通じて設定される

最終的にそのオブジェクトが返される

✨ prototypeと組み合わせることで拡張もできる！
javascript
User.prototype.greet = function() {
  console.log("こんにちは、" + this.name + "です！");
};

taro.greet(); // "こんにちは、太郎です！"
この greet メソッドは User.prototype に定義されているので、すべての User オブジェクトからアクセス可能になります。

🔄 他との違い
class 構文とは違って、メソッドは直接 prototype に書かないといけない
柔軟で低レベルな制御ができる
レガシーコードやフレームワークの内部処理で今でも使われていることもある


✅  new + 関数コンストラクタの舞台裏

🔸 ステップ1：箱（空っぽのオブジェクト）を用意する
javascript
const obj = {};
👉 まず最初に、JavaScriptは「何も入ってない空の箱」を用意します。
これがあなたの新しいオブジェクトの入れ物です。

🔸 ステップ2：箱に「設計図へのリンク」をつける
javascript
Object.setPrototypeOf(obj, ConstructorFunction.prototype);
👉 空っぽの箱に、「この箱の動き方はここに書いてあるよ！」という設計図（prototype）へのリンクをつけます。
これは「このオブジェクトは、こんな振る舞いができます」と教えてあげるステップです。

🔸 ステップ3：コンストラクタ関数が中身を入れる
javascript
ConstructorFunction.call(obj, ...args);
👉 箱の中に、名前や年齢などの情報を入れていきます。「new」したときに渡した情報が args です。 
このとき、コンストラクタ関数の中の this は、この箱（obj）を指しています。

🔸 ステップ4：箱を返す
関数の中で特に別のものを返していなければ、この箱（obj）がそのまま返ってきます。
これで、新しいオブジェクトが完成！

🎁 全体をまとめると…
javascript
function User(name) {
  this.name = name;
}

const taro = new User("太郎");
このコードは、

空の箱を作って、
「Userの設計図を使うよ」とリンクを張って、
name に "太郎" という情報を入れて、
完成した箱を返してる