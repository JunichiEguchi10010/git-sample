JavaScript のイベントの伝播（バブリング／キャプチャ）を制御 20250628

✅ まず「イベントの伝播」とは？
HTMLの要素は入れ子構造（ツリー構造）になっています。
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