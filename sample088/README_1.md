JavaScripte e（イベントオブジェクト） 20250602

クリックやキーボード入力などのイベントの詳細情報が入っているオブジェクト。
React では SyntheticEvent（合成イベント）という独自のラッパーを使っています。






🟥「React イベントに引数を渡す方法」
Reactにおける「イベントに引数を渡す」とは、たとえばボタンをクリックしたときに「どの選択肢を選んだか」などの値を関数に渡すということです。

🔧 具体例（引数なしと引数ありの違い）
❌ 間違えやすい例（直接関数を渡してしまう）
jsx
<Button onClick={handleClick(index)} />
→ これは ボタンをクリックする前に実行されてしまう（＝すぐに呼ばれてしまう）
なぜなら handleClick(index) は「関数の実行」だからです。

これは 「関数を実行した結果」を渡している ことになります。
→ つまり、コンポーネントの描画時に即座に関数が実行される。


✅ 正しい書き方（引数を渡すために、無名関数を使う）
jsx
<Button onClick={() => handleClick(index)} />
→ これは クリックされたときに handleClick に index を渡して実行するという意味。

この ( ) => handleClick(index) は 無名関数（アロー関数）であり、
クリックされるまで何もしない という「ラッパー関数」として機能します。

これは「関数を定義しただけで、クリックされたときに実行する」という意味です。
→ イベントが発生した時にだけ実行されます。

🔁 応用：複数の引数を渡す
jsx
<Button onClick={() => handleClick(index, option.text)} />
関数の定義側も複数引数にしておきます：
js
const handleClick = (index, text) => {
  console.log(`選ばれたのは ${index}: ${text}`);
}
📌 よくある補足
() => handleClick(index) のように無名関数を使うのが基本
onClick={handleClick} のように書けるのは引数なしで使うときだけ

イベント引数（例: event）を同時に受け取るなら：
jsx
onClick={(e) => handleClick(e, index)}

✅ まとめ
書き方	                                    意味
onClick={handleClick}	                引数なしで実行
onClick={() => handleClick(index)}	    index をクリック時に渡して実行
onClick={handleClick(index)}	        すぐ実行されてしまう（NG）




















【2025年最新】世界一簡単なReact講座！JavaScript初心者・中級者は必見
https://www.youtube.com/watch?v=TgU-FT2WdS4&t=6122s