javascript スクロールでフェイドイン IntersectionObserverAPI IntersectionObserver IntersectionObserverEntry isIntersecting 20250617 

// スクロールで.fade-inが表示されたらクラス追加
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
  
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  });

コード解説：
document.addEventListener('DOMContentLoaded', () => {
🌱ページのHTMLをすべて読み込んだ後に実行するように設定しています。
DOMContentLoaded は、画像などのリソースを待たずに「HTML構造の読み込み完了」を意味します。
無駄に早く動作してエラーが出ないように、この中にすべての処理を書きます。
  
const observer = new IntersectionObserver((entries) => {
🔍 IntersectionObserver を使って、要素が画面に入ってきたかどうかを監視するオブジェクトを作っています。  
observer という名前の変数に格納します。
entries は監視対象の要素の情報が入ったリストです（あとで forEach で1つずつチェック）。

entries.forEach(entry => {
📦 監視対象のそれぞれの要素（entry）について、繰り返し処理します。
→ entry は fade-in クラスのついた要素1つ1つを指します。

if (entry.isIntersecting) {
entry.target.classList.add('visible');
observer.unobserve(entry.target);

🔸 if (entry.isIntersecting)
　→ 画面に表示されているかどうかをチェック（trueなら見えている）

🔸 entry.target.classList.add('visible')
　→ .fade-in要素に .visible クラスを追加し、CSSアニメーションを発動させます。

🔸 observer.unobserve(entry.target)
　→ 一度表示された要素は、監視を解除します（何度も処理されないようにするため）

}
🔚 if文の終了です。
  
}, {
threshold: 0.1
});
🛠️ IntersectionObserver のオプション設定です。
threshold: 0.1 というのは「10%以上画面に入ったら表示されたとみなす」という意味。
  
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
🔍 .fade-in クラスのついたすべての要素を探して、それぞれを observer で監視対象に登録します。
forEach で1つ1つに observer.observe(el) を適用。
  
});
🔚 DOMContentLoaded の中の処理がここで終了します。
  

🧠 全体の流れを一言でまとめると：
「.fade-in クラスの要素がスクロールで画面に10%以上入ったら、.visible を追加してアニメーションを発動し、
以後は監視をやめる




✅ isIntersecting とは？

🔹 説明： IntersectionObserver API における重要なプロパティです。
isIntersecting は、対象の要素が 画面（または設定したビューポート）内に入っているかどうか を示す 真偽値（true または false） です。

🔸 つまり：
true → 対象の要素が一部でも画面に入っている

false → 対象の要素がまったく画面に入っていない

🧪 使い方の例（実際のコードから）
js
if (entry.isIntersecting) {
entry.target.classList.add('visible');
}
この条件は：
「要素が画面内に入った瞬間」に .visible クラスを追加する
という意味です。

🔍 どこで使われる？
IntersectionObserver を作ったとき、次のように監視結果が entries に入ってきます：

js
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
console.log(entry.isIntersecting); // true or false
});
});
📦 entry オブジェクトの中身（一部）
js
entry = {
target: 要素,
isIntersecting: true or false,
intersectionRatio: 交差している割合,
boundingClientRect: 要素の位置情報,
...
}
🧠 よくある誤解
誤解	                                                  実際
isIntersecting は 100% 表示された時だけ true	   ❌ 一部でも表示されていれば true（※threshold による）
一度 true になったらずっと true	❌                 画面から外れたら false に戻る


⚙️ 関連する設定：threshold
const observer = new IntersectionObserver(callback, {
threshold: 0.5
});
これだと 要素の 50% が画面内に入ったときに isIntersecting: true になります。

デフォルトは 0 → 1ピクセルでも表示されれば true

💡 まとめ：isIntersecting を使う理由
目的	                                                   方法
アニメーションや表示効果を 表示されたときだけ発動   if (entry.isIntersecting) で判定
パフォーマンスよくスクロール監視したい	           IntersectionObserver + isIntersecting の組み合わせが最適


✅ 1. IntersectionObserver オブジェクトのプロパティ・メソッド
名前	種類	説明
.observe(target)	メソッド	指定した要素の交差状態を監視開始する
.unobserve(target)	メソッド	指定した要素の監視を解除する
.disconnect()	    メソッド	すべての監視対象を解除する
.takeRecords()	    メソッド	保留中の交差記録（IntersectionObserverEntry）を手動で取得する
.root	            プロパティ	交差判定の基準となる親要素（nullの場合はビューポート）
.rootMargin	        プロパティ	交差判定に使う余白（CSSの margin と同じ形式）
.thresholds	        プロパティ	交差が検出される比率の配列（例：[0, 0.5, 1]）

✅ 2. IntersectionObserverEntry オブジェクトのプロパティ
これは、交差イベントが発生したときにコールバック関数に渡される entries 配列内の1つのオブジェクトです。

プロパティ名	説明
.boundingClientRect	  対象要素の境界ボックス情報（getBoundingClientRect()と同じ）
.intersectionRatio	  対象要素が交差領域内に入っている割合（0〜1）
.intersectionRect	　実際に交差している領域の矩形情報
.isIntersecting	    　対象が交差しているかどうか（true or false）
.rootBounds	    　    監視対象となる領域（rootの大きさ）
.target	            　監視対象の要素そのもの
.time	            　この交差状態が発生した時間（DOMHighResTimeStamp）

🧠 補足：もっともよく使うものトップ3
.observe(target) → 要素の監視を開始

.isIntersecting → 表示中かどうか判定

.intersectionRatio → どのくらい表示されているか（例：0.5なら半分見えている）