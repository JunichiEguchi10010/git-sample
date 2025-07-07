JavaScript クラス インスタンス 20250707

✅ まとめ：
🟦 クラスは設計図、newでインスタンス化して初めて使える
🟦 constructor() は初期化処理を書く場所
🟦 this を使ってプロパティ（変数）やメソッドを定義する
🟦 static はインスタンス化不要で使える特別なメソッド
🟦 extends でクラスを継承でき、super() や super.method() を使う
super()：親クラスの constructor を呼んで使えるようになる
super.method()：親クラスのメソッドを呼んで使えるようになる


🔰 そもそも「クラス」ってなに？
プログラミングを勉強すると、どの言語でも出てくる「クラス」という考え方。
初めてだと「なにそれ？」「なんで必要なの？」と戸惑う人が多いです。

👨‍🏫 クラスは“設計図”
クラスとは：データと処理（変数と関数）をまとめて扱える「設計図」のようなもの。

クラスを作っただけでは動かず、**インスタンス化（実体化）**して初めて使えるようになる。

🧱 JavaScriptでのクラスの書き方
① クラスの定義
js
class Test {
  constructor() {
    console.log('constructor');
  }
}
class キーワードでクラスを定義。

constructor() は クラスが使われたとき最初に実行される特別な関数。(翻訳：構築子)

⚙ クラスの使い方（＝インスタンス化）
js
new Test();  // 実行結果：constructor

new を使ってクラスを インスタンス化（実体化）。

これにより constructor() の中の処理が実行される。

🎁 constructorに引数を渡すことも可能
js
class Test {
  constructor(value) {
    console.log(value);
  }
}

new Test(10); // 実行結果：10
constructor() に引数を渡せる。

インスタンスごとに異なる初期値を設定できる。

💡 クラス内の変数（プロパティ）
クラス内では this を使って、変数を定義する。

js
class Test {
  constructor(value) {
    this.author = '山田';
    this.value = value;
  }
}
this は「そのインスタンス自身」を表す。

this.author = '山田' は、そのインスタンスの author プロパティを設定している。

プロパティの取り出し方
js
const test = new Test(10);
console.log(test.author);  // 山田
console.log(test.value);   // 10

🛠 メソッドの定義と使用
クラス内に関数（メソッド）を定義できる。

js
class Test {
  constructor(value) {
    this.value = value;
  }

  hello() {
    console.log('Hello');
    return this.value;
  }
}

const t = new Test(10);
console.log(t.hello()); // Hello\n10
メソッドも関数のように使えるが、必ずインスタンスから呼び出す必要がある。

戻り値を返さないと undefined になる。

🧊 staticメソッド（インスタンス化不要）静的メソッド
js
class Test {
  static hello2() {
    console.log('static hello');
  }
}

Test.hello2(); // static hello
🟡 static をつけたメソッドは クラスから直接呼べる。

ただし、this を使ってインスタンスのプロパティにアクセスはできない。

🧬 クラスの継承（サブクラス）
js
class Test {
  constructor(value) {
    this.value = value;
  }

  hello() {
    console.log('Hello');
    return this.value;
  }
}

class CopyTest extends Test {
  constructor(value) {
    super(value); // 親クラスのconstructorを呼び出す
  }

  copyHello() {
    console.log(super.hello()); // 親クラスのメソッドを呼び出す
  }
}

const ct = new CopyTest(20);
ct.copyHello(); // Hello\n20

extends で クラスを継承（親クラスの機能を引き継ぐ）

super() は親クラスの constructor を呼ぶ

super.method() で親のメソッドを使える

🎯 thisの注意点（少し発展）
this は 今実行しているインスタンスを指す。

継承先で親クラスの this をそのまま使おうとすると、うまくいかないこともある。

コンソールで console.log(this) してみると、どのクラスのインスタンスか確認できる。

💼 実際の例：Dateクラス
js
const now = new Date();
console.log(now.getFullYear()); // 2023など
JavaScriptには Date クラスが用意されていて、new Date() でインスタンスを作るだけで便利なメソッドが使える。

✅ まとめ：
🟦 クラスは設計図、newでインスタンス化して初めて使える
🟦 constructor() は初期化処理を書く場所
🟦 this を使ってプロパティ（変数）やメソッドを定義する
🟦 static はインスタンス化不要で使える特別なメソッド
🟦 extends でクラスを継承でき、super() や super.method() を使う
super()：親クラスの constructor を呼んで使えるようになる
super.method()：親クラスのメソッドを呼んで使えるようになる



① クラスに constructor() を記述しなくても機能しますか？
✅ 答え：はい、記述しなくても動作します。
クラスに constructor() を明示的に書かなくても、JavaScriptは自動で空のconstructorを定義してくれます。

js
class Animal {
  // constructor() がなくてもOK
  speak() {
    console.log("鳴きます");
  }
}

const dog = new Animal();
dog.speak(); // 鳴きます
ただし、何か初期値を設定したい場合や、親クラスのconstructorを呼ぶ必要があるときには明示的に書く必要があります。

② super() の意味は？なぜ必要なのか？
✅ super() は親クラスのconstructorを呼び出す関数です。
🔷 なぜ必要？
継承したサブクラスで constructor を定義する場合は、必ず最初に super() を呼ばないとエラーになります。

js
class Parent {
  constructor(name) {
    this.name = name;
  }
}

class Child extends Parent {
  constructor(name) {
    // super()を呼ばずに this を使うとエラー！
    super(name); // これがないとエラーになる！
    this.age = 10;
  }
}
🔸 なぜエラーになるの？
JavaScriptでは、親クラスの初期化（＝constructor）より前に this を使うことが許されていないからです。
そのため、子クラスのconstructorでは、まず super() を呼び出して親の処理を実行しないと、自分の this にアクセスできない仕組みになっています。




無理なく理解するクラスとインスタンスだよ【JavaScript】
https://www.youtube.com/watch?v=l-IoqkyZxW8
