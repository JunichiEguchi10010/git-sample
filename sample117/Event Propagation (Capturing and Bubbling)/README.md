JavaScript のイベントの伝播（バブリング／キャプチャ）を制御 20250628

✅ まず「イベントの伝播」とは？
HTMLやJavaScriptの世界では、ユーザーがボタンをクリックするなどの操作をしたときに「イベント」が発生します。
このイベントがどの順番で要素に届くかという仕組みを「イベントの伝播（event propagation）」と呼びます。
そして、イベントが伝わる順番には キャプチャ（捕捉） と バブリング（泡上がり） の2つのフェーズがあります。

🌊 バブリングフェーズ（Bubbling Phase）
イベントは 一番内側の要素から外側へ向かって伝わります。
例えば、<button>の中にある<div>をクリックすると、まず<button>でイベントが発火し、それから親要素である<div>、さらにその親...と外側に伝わっていきます。
JavaScriptでは、基本的にバブリングがデフォルトの伝播方法です。

🎯 キャプチャフェーズ（Capturing Phase）
イベントは 一番外側の要素から内側へ向かって伝わります。
通常のイベントリスナーではこのフェーズは無視されますが、特別にオプションを設定することでこの段階でも処理ができます。

javascript
element.addEventListener('click', handler, true); // true でキャプチャフェーズを有効に
⚖️ どっちを使う？
通常はバブリングで十分なことが多いです。
ただし、他の要素でイベントが処理される前に止めたい場合などはキャプチャが便利です。


🟨HTMLの要素は入れ子構造（ツリー構造）になっています。
 たとえば：

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
用語	                意味	        制御方法
キャプチャ	        外から内へ伝わる	{ capture: true }
バブリング	        内から外へ伝わる	デフォルトの挙動
stopPropagation()  伝播を止める	       イベントハンドラ内で呼び出す


🟨 イベント伝播まわりでよく使われる stopPropagation() や イベントデリゲーション（event delegation） 

🛑 event.stopPropagation()（伝播の停止）
このメソッドを使うと、そのイベントが それ以上親要素へ伝わらないようにできます。
つまり、バブリング中であれば、それ以降の親要素のイベントリスナーには届きません。

例：
javascript
document.getElementById('child').addEventListener('click', function (e) {
  e.stopPropagation(); // これ以降、親要素には届かない
  console.log('Child clicked');
});
✅ ユーザーの操作に対し、「特定の要素だけで処理したい」ときに便利。


🧬 イベントデリゲーション（Event Delegation）
親要素にイベントリスナーをつけておき、子要素で発生したイベントをまとめて処理するテクニックです。
DOMの動的な変化（追加・削除）に強く、パフォーマンスも向上。

例：
javascript
document.getElementById('list').addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    console.log('Item clicked:', e.target.textContent);
  }
});

✅ 大量の要素にそれぞれリスナーを付けずに済むので、効率的！

🤝 stopPropagation() × Delegation の注意点
デリゲーションを使っているときに 子要素側で stopPropagation() を使うと、親のリスナーに届かなくなるので、
使い所には注意が必要です。