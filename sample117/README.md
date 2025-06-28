関数に引数を「準備するかどうか」の判断基準 20250627

🟨 関数の引数は2種類あり
自動引数:	実行環境（ブラウザやAPI）が関数に自動で渡す引数
明示的引数（手動引数）:	開発者が関数を呼び出すときに自分で渡す引数


🍳 関数は「料理のレシピ」、引数は「食材」
たとえば、こんな関数があるとします：
js
function makeSandwich(bread, filling) {
  return bread + "に" + filling + "をはさんだサンドイッチ！";
}
このとき：
makeSandwich は「サンドイッチを作るレシピ（＝関数）」
bread や filling は「使う食材（＝引数）」
このように、「何を使って・どう調理するか」を柔軟に変えたいから、引数が必要になるんです。

💡 なぜ引数を入れるの？
考え方	たとえると...	プログラムでの意味
食材を変えたい	「今日はチーズじゃなくてハムにしよう」	関数を色んな状況で使い回したい
分量を調整したい	「パンは2枚、具は多め」	処理の内容を柔軟に変える
他の人にも使ってもらいたい	「ママのレシピを友達に教える」	他のコードから呼び出せるように

🔒 最初から引数が決まっている場合もあるよね？
はい、それは「この関数にはこれが必要！」というルール付きのレシピだと思ってください。

たとえば：
js
function onClick(event) {
  console.log("クリックされました", event);
}
この event 引数は、ブラウザやアプリが自動的に渡してくる情報です。開発者はそれを前提に関数を書くので、「引数が最初から決まっている」感じになります。

🔍 じゃあ、引数を付けないのはどういうとき？
たとえばこういう関数：
js
function sayHello() {
  console.log("こんにちは！");
}

決まったあいさつしかしない
どんな状況でも同じ動作でOK
こんなときは、引数はいらないんです。まるで「レトルト食品」みたいに、温めるだけで使える状態！

✅ 設計のとき考えること（かんたん版）
💬 「この関数、毎回ちがうデータで使いたい？」→ YES → 引数をつけよう！
🧍‍♂️ 「いつも同じ内容でしか動かさない？」→ YES → 引数いらないかも！
📦 「外から値を入れてあげたほうが便利？」→ YES → 引数つけるべき！



🔁 自動引数 vs 明示的引数（手動引数）
種類	                              説明	                                  例
✅ 自動引数	             実行環境（ブラウザやAPI）が関数に自動で渡す	  event, timestamp, response, error など

✅ 明示的引数（手動引数）	開発者が関数を呼び出すときに自分で渡す	       makeSandwich("食パン", "ハム") の "食パン" や "ハム"

💡 用語の候補
表現	                                    ニュアンス
明示的引数 (explicit argument)	     自分で指定する引数。最も一般的な表現
手動引数 (manual argument)	         自分の手で渡すという意味でわかりやすい
ユーザー定義引数	                    開発者が任意に決めて渡す引数という意味で使われることも
呼び出し時引数 (call-time argument)	  関数を呼び出すときに渡す引数という視点
🧠 例で比較
js
// 自動引数の例
button.addEventListener("click", function(event) {
  console.log(event.target); // ← 自動で渡される
});

// 明示的引数の例
function greet(name) {
  console.log("こんにちは、" + name + "さん！");
}
greet("Junichi"); // ← "Junichi" は明示的に渡している


🧠 ポイント
🔵イベント系（クリック、スクロールなど）では event オブジェクトが渡される
🔵コールバック系（配列操作、非同期処理）では、文脈に応じた情報が自動で渡される
🔵自分で引数を指定しなくても、関数の仕様に応じて値が入ってくるのが特徴
  →🟥だから関数を作るときに引数の設定が必要ということ

🧠 自動で渡される主な引数一覧
関数の用途	                                      自動引数	                           内容
addEventListener	                                event（event.target event.key）イベントの詳細（クリック、キー入力など）
setTimeout(callback) / setInterval(callback)	    なし（ただしクロージャで渡せる）	通常は引数なしで呼ばれる
requestAnimationFrame(callback)	                timestamp	                       描画タイミングの高精度な時刻（ms）
Array.prototype.map() など	                    element, index, array	           各要素、インデックス、元の配列
Promise.then() / catch()	                      response / error	             　非同期処理の結果やエラー
IntersectionObserver(callback)	                entries, observer	               交差状態の情報と監視インスタンス
MutationObserver(callback)	                    mutations, observer	             DOMの変更情報と監視インスタンス
WebSocket.onmessage	                              messageEvent	                 サーバーからのメッセージ情報
fetch().then()	                                  Response オブジェクト	          サーバーからのレスポンス

🔍 例：requestAnimationFrame
js
requestAnimationFrame(function(timestamp) {
  console.log("描画タイミング:", timestamp);
});
この timestamp はブラウザが自動で渡してくれる「高精度な現在時刻」です。

🧪 例：map() のコールバック
js
[10, 20, 30].map((value, index, array) => {
  console.log(value, index, array);
});
value: 各要素の値
index: その要素のインデックス
array: 元の配列
これらも JavaScriptエンジンが自動で渡してくれる引数です。

✅ まとめ：自動引数が使われる場面
イベントハンドラ（event）
非同期処理（response, error）
配列操作（value, index, array）
ブラウザAPI（timestamp, entries, observer）


🟥ホームページ制作（特にスクロール連動ナビやインタラクティブなUI）を行う場合の特に重要な自動引数

✅ 特に重要な自動引数
自動引数	                なぜ重要か	                                                        使用例
event	              ユーザーの操作（クリック、スクロール、入力など）に反応するため	       addEventListener('click', event => { ... })
entries（+ entry）	セクションが画面に入ったかどうかを検出し、ナビゲーションを更新するため	new IntersectionObserver(entries => { ... })