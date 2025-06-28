Web API（DOM API） EventTarget.addEventListener() メソッドについて 20250628

✅ addEventListener は Web API の一部
JavaScriptのコア仕様（ECMAScript）ではなく、ブラウザが提供する Web API（DOM API）に含まれます。
正式には EventTarget.addEventListener() メソッド と呼ばれます。
Element, Document, Window などのオブジェクトが EventTarget を継承しており、イベントリスナーを登録するための標準的な方法です。

🧩 基本構文
js
target.addEventListener(type, listener [, options]);
引数	                内容
type	           イベントの種類（例："click"、"scroll"、"keydown"）
listener	       イベントが発生したときに呼び出す関数
options（省略可）	capture, once, passive などの設定オブジェクト

🧠 例：クリックイベントを登録
js
const button = document.querySelector("button");

button.addEventListener("click", function(event) {
  console.log("クリックされました", event);
});
button は HTMLElement → Element → EventTarget を継承

だから .addEventListener() を使える

🔍 EventTarget とは？
EventTarget は イベントを発行・監視できるオブジェクトの共通インターフェース
DOM要素だけでなく、window, document, XMLHttpRequest, WebSocket なども EventTarget を継承しています

✅ なぜ重要なのか？
addEventListener() を使うことで、HTMLとJavaScriptの責務を分離できる（HTMLに onclick を書かなくてよい）
複数のイベントリスナーを同じ要素に登録可能
イベントの伝播（バブリング／キャプチャ）を制御できる


✅ onclick と addEventListener() の違い
方法	                            書き方	                                            問題点 or 特徴
HTMLに直接書く方法	        <button onclick="doSomething()">Click</button>	- HTMLとJSが混ざる- 再利用・保守がしにくい
JavaScriptで分離する方法	button.addEventListener("click", doSomething);	- HTMLは構造だけ- JSは振る舞いだけ- 保守性・再利用性が高い

🧠 なぜ分離が大事なのか？
HTMLは「何があるか」だけを記述する（構造）
JavaScriptは「どう動くか」だけを記述する（振る舞い）
これにより、役割が明確になり、コードが読みやすく・変更しやすくなる

💡 例：スクロール連動ナビでも同じ：
js
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      // スムーススクロールなどの処理
    });
  });
});
このように HTMLにはイベント処理を一切書かず、JavaScript側でまとめて管理することで、構造と振る舞いがきれいに分かれています。

✅ 結論
> addEventListener() を使うことで、HTMLは「見た目と構造」だけに集中でき、JavaScriptは「動きとロジック」に集中できる。 
> これが「責務の分離」であり、保守性・再利用性・可読性を高める基本原則です。


✅ イベントの伝播（バブリング／キャプチャ）を制御できる
まず「イベントの伝播」とは？
HTMLの要素は入れ子構造（ツリー構造）になっていますよね。 たとえば：

html
<div id="outer">
  <button id="inner">クリック</button>
</div>
このとき、#inner ボタンをクリックすると、イベントは次の順で伝わります：
キャプチャフェーズ（外側 → 内側）
ターゲットフェーズ（クリックされた要素）
バブリングフェーズ（内側 → 外側）

🔁 イベントの流れ図
[document]
   ↓（キャプチャ）
[html]
   ↓
[body]
   ↓
[div#outer]
   ↓
[button#inner] ← クリック発生（ターゲット）
   ↑
[div#outer]
   ↑（バブリング）
[body]
   ↑
[html]
   ↑
[document]

🧠 addEventListener() で制御できること
1. キャプチャフェーズで処理するか？
js
element.addEventListener("click", handler, { capture: true });
通常は false（バブリングフェーズで処理）

true にすると、外側から内側に向かう途中で処理

2. バブリングを止めるか？
js
event.stopPropagation();
これを使うと、それ以上親要素にイベントが伝わらなくなる

3. 一度だけ処理するか？
js
element.addEventListener("click", handler, { once: true });
一度だけ実行して自動で解除される

💡 例：バブリングを止める
js
document.getElementById("outer").addEventListener("click", () => {
  console.log("outerがクリックされた");
});

document.getElementById("inner").addEventListener("click", (e) => {
  e.stopPropagation(); // ← これで outer には伝わらない
  console.log("innerがクリックされた");
});
✅ まとめ
用語	                  意味	                制御方法
キャプチャ	         外から内へ伝わる	        { capture: true }
バブリング	         内から外へ伝わる	        デフォルトの挙動
stopPropagation()	伝播を止める	            イベントハンドラ内で呼び出す



❓❓❓疑問
なぜ JavaScript の標準仕様（ECMAScript）に含まれていない addEventListener() のような Web API が、JavaScript内で普通に使えるのか？

✅ 結論：JavaScript は「言語」＋「実行環境（ブラウザ）」で動いているから
JavaScript そのもの（＝ECMAScript仕様）には addEventListener() は含まれていません。 
でも、ブラウザという実行環境が JavaScript に「Web API」という便利な機能を追加してくれているのです。

🧠 たとえるなら…
JavaScript（ECMAScript）は「言語」＝鉛筆
Web API は「ブラウザが用意した道具箱」＝定規・コンパス・消しゴム
ブラウザ上でコードを書くと、鉛筆（言語）＋道具箱（API）が一緒に使える

🔍 技術的にはこうなっている
ブラウザ（Chrome, Firefox, Safariなど）は JavaScriptエンジン（例：V8）を内蔵
そのエンジンに対して、DOM API や EventTarget などのオブジェクトをグローバルに提供
だから document.addEventListener() のようなコードが「JavaScript内で」書ける

✅ まとめ
項目	                        内容
addEventListener() は？	    JavaScriptのコア仕様ではなく、ブラウザが提供する Web API
なぜ使える？	             ブラウザが JavaScript 実行時に EventTarget などを自動で提供しているから
どこで使える？	             ブラウザ環境（Node.js では使えない）