JavaScript thisについて 20250809

📌 this とは？
「関数が実行されるときに、自動的に渡される特別な値」 です。
関数の中で this と書くと、その関数を呼び出した「主体（呼び出し元オブジェクト）」 を指します。
これは変数のように見えますが、あくまで呼び出し時に決まる特別なキーワード で、普通のプロパティではありません。

💡 ポイント
🟦 どこで宣言されたかではなく、どう呼び出されたかで決まる

javascript
function show() { console.log(this); }

show(); // グローバル呼び出し → window（strictなら undefined）

const obj = { show };
obj.show(); // obj 呼び出し → obj

🟦 値は自分で設定するのではなく、JavaScript エンジンが自動的に入れる
・this は引数のように見えない引数です。
・call や bind で明示的に設定することはできます。

🟦 アロー関数は自分専用の this を持たない
・外側のスコープから this を引き継ぎます。

🟥 JavaScript の this は、「今この関数を呼び出している主体」を指し示す、呼び出し時に決まる特別なキーワード
属性でも変数でもなく、JavaScript エンジンが関数呼び出し時に自動的に割り当てます。


🟦  this の重要ポイント
1. 決まるタイミングは「関数の宣言時」ではなく「呼び出し時」
javascript
function show() {
  console.log(this);
}

const obj = { show };
obj.show(); // obj が呼び出し元 → this = obj
show();     // グローバル呼び出し → this = window (strictなら undefined)
✅ 「どこに書いてあるか」ではなく「どう呼び出されたか」がすべて。

🟦 よく混乱するケース
❌ 変数に代入したとき
javascript
const person = {
  name: "太郎",
  greet() { console.log(this.name); }
};

const greetFn = person.greet;
greetFn(); // this は global → undefined（strictなら）
対策 → .bind(person) で固定する

❌ コールバック関数での this
javascript
setTimeout(function() {
  console.log(this); // → window
}, 1000);
対策 → アロー関数にするか、.bind(this) を使う

❌ イベントハンドラー内のネスト関数
javascript
document.querySelector("#btn").addEventListener("click", function() {
  console.log(this); // → #btn
  setTimeout(function() {
    console.log(this); // → window
  }, 1000);
});
対策 → アロー関数にする（外側の this を使える）

🟦 アロー関数の最大の特徴
自分専用の this を持たない
書かれた場所の「外側のスコープ」の this をそのまま使う

javascript
const obj = {
  name: "花子",
  arrow: () => console.log(this.name), // → undefined
  regular: function() { console.log(this.name); } // → "花子"
};

🟦 明示的に this を指定する方法
javascript
function greet() { console.log(`Hello, ${this.name}`); }

const user = { name: "Taro" };
greet.call(user);  // Hello, Taro
greet.apply(user); // Hello, Taro
const bound = greet.bind(user);
bound();           // Hello, Taro

📝 まとめ表（完全版）
呼び出し方	                    this が指すもの
グローバル関数	               window / global（strictなら undefined）
オブジェクトのメソッド	        そのオブジェクト
コンストラクタ呼び出し（new）	新しく作られたオブジェクト
call / apply	              指定したオブジェクト
bind	                      指定したオブジェクト（以降固定）
アロー関数	                   親スコープの this


📌 図解：this の指す先は「呼び出し方」で決まる

function greet() {
    console.log(this.name);
}

---------------- 呼び出し時 ----------------

(1) グローバル呼び出し
    greet();
      ↓
    this = グローバルオブジェクト
    (ブラウザなら window, strict なら undefined)

(2) オブジェクトのメソッド呼び出し
    const user = { name: "太郎", greet: greet };
    user.greet();
      ↓
    this = user

(3) 明示的に this を指定
    greet.call({ name: "花子" });
      ↓
    this = { name: "花子" }

(4) アロー関数
    const arrow = () => console.log(this.name);
    arrow();
      ↓
    this = 外側スコープの this を継承（固定）

🖼 イメージ図（テキストベース）
pgsql
  呼び出し元オブジェクト   thisの指す先
────────────────────────────
  window.greet()          → window
  user.greet()             → user
  greet.call(admin)        → admin
  arrow関数()              → 外側の this
この表を見ると、「関数が誰の中から呼ばれたか」で this が変わるのが分かります。

💡 図解から分かること
this は 「呼び出し方」＝「関数の直前にあるもの」 で決まる

宣言場所は関係ない

アロー関数だけは例外で、自分の this を持たず、外側スコープを使う

call / apply / bind を使えば、呼び出し方に関係なく固定できる






 thisの深堀
 







