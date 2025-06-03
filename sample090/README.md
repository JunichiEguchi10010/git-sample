React useStateなどの関数型更新 20250603

✅関数型更新とは？
js
setState((prev) => 新しい値);
このように、**「前の状態 (prev) を引数として受け取り、それを使って新しい状態を返す」**更新方法です。

🧠 なぜ使うのか？
Reactでは setState を連続で呼んだり、非同期的に状態が変わることがあります。
このとき 古い状態を参照してしまうと、意図した更新が行われないことがあります。

❌ 悪い例：同期っぽく書いてバグになる
js
setQuizIndex(quizIndex + 1);
setQuizIndex(quizIndex + 1);
2回加算したいのに、quizIndex が同じ値として使われ、1回分しか増えないことがあります。

✅ 良い例：関数型更新なら確実に積み上がる
js
setQuizIndex((prev) => prev + 1);
setQuizIndex((prev) => prev + 1);
この書き方なら、最新の状態 prev を毎回受け取るので、確実に2回分加算されます。

🧪 使いどころの具体例
① カウントアップやインクリメント
js
setCount((prev) => prev + 1);

② 状態を複数箇所から変更するとき
例えば、WebSocket で受け取るたびにメッセージを追加：

js
setMessages((prev) => [...prev, newMessage]);

③ 非同期処理の中で更新するとき
js
fetch('/api/items').then(() => {
  setItems((prev) => [...prev, newItem]);
});

④ 同じ setState を連続して呼ぶとき
js
setScore((prev) => prev + 1);
setScore((prev) => prev + 1); // これもOK！

🧩 まとめ
項目	                    内容
✅ 何か？	        前の状態 prev を受け取って、それをもとに新しい状態を返す書き方
✅ 使う理由	        状態が古くなる問題を防げる（非同期や複数更新に強い）
✅ よく使う場面	   　カウンター、配列の追加、連続更新、非同期処理の中

💬 補足：状態がオブジェクトや配列でもOK
js
setUser((prev) => ({ ...prev, name: 'Junichi' }));
setTodos((prev) => [...prev, newTodo]);



✅疑似useState
function useState(initialValue) {
  let currentValue = initialValue;

  function setState(newValueOrUpdater) {
    if (typeof newValueOrUpdater === 'function') {
      // ✅ ここがポイント！
      const newValue = newValueOrUpdater(currentValue);
      currentValue = newValue;
    } else {
      currentValue = newValueOrUpdater;
    }

    // 再レンダーの処理...
  }

  return [currentValue, setState];
}

function useState(initialValue) {
React の useState を模した関数を定義しています。
引数 initialValue は状態の初期値です。

  let currentValue = initialValue;
currentValue は状態を保持するための変数です。
最初は初期値がそのまま入っています。

  function setState(newValueOrUpdater) {
状態を更新するための関数 setState を定義しています。
引数には「新しい値」または「現在の値を使って新しい値を返す関数」が入ってきます。

    if (typeof newValueOrUpdater === 'function') {
渡された引数が「関数かどうか」を判定しています。
() => 値 のような 関数型更新のケースに対応します。

    ✅ ここがポイント！
関数型更新を理解する上で重要な部分です。
      const newValue = newValueOrUpdater(currentValue);
今の値 currentValue を引数として渡し、**関数の返り値（＝新しい状態）**を newValue に代入します。
これが「関数型更新」の正体です！

      currentValue = newValue;
さきほど得た newValue を状態として保持します（更新）。

    } else {
      currentValue = newValueOrUpdater;
    }
関数ではない場合は、単にそのまま新しい値として currentValue を更新します。

    // 再レンダーの処理...
実際の React ではこのあとにコンポーネントの再描画が走ります。
ここでは省略されていますが、React の核です。

  }
setState 関数の終わりです。

  return [currentValue, setState];
useState のお決まりの形：状態と更新関数の「ペア」を配列で返します。

React コンポーネントでよくある const [count, setCount] = useState(0); に繋がります。

}
useState 関数の終了。

✅ 補足：このコードが教えてくれること
setState((prev) => prev + 1) の「prev」は、React がこのように 現在の状態を関数に渡してくれているから使える。
useState は「状態」と「状態を更新する関数」をペアにして提供してくれる。
関数型更新は 非同期かつバッチ処理される React の挙動でも安全に使える設計。


✅非同期でバッチ処理されるとは？

🔧 結論
✅ React の setState は「すぐに実行されるとは限らない」
setState() を呼ぶと「今すぐ状態が変わる」わけではありません。
React は「あとでまとめて（＝バッチで）状態を反映」します。
これは、性能を上げるための賢い仕組みです。

🥪 たとえば「注文票」を集めるイメージ
js
setCount(count + 1);
setName('Jun');
setQuizIndex((prev) => prev + 1);
🧠 Reactの考え方
すぐに料理しない！（= すぐに再描画しない）

まず「注文票だけを集めて」、あとでまとめてキッチンに渡す（= バッチ処理）

📦 バッチ処理（batch processing）とは？
✅ バラバラに処理するのではなく…
js
setX(1); // すぐ処理 → 再描画
setY(2); // すぐ処理 → 再描画

🚀 まとめて処理する
js
setX(1);
setY(2);
// ここでまとめて再描画 → 1回で済む！
🧠 「再描画の回数」を減らして、アプリを速く・軽くする工夫なんです！

🕓 非同期（Async）とは？
非同期というのは「すぐに処理されるとは限らない」ということ。

たとえば：
js
console.log(count);
setCount(count + 1);
console.log(count); // ← まだ更新されていない！

⛔ これに引っかかる人が多い！
React は setCount を呼んでも、すぐには count を更新しません
だから count はそのままの値でログに出力されます。 
React に特有の仕様で、バニラJavaScript（Reactなし）では、当然すべて即時に処理されます。

✅ ではどうすれば最新の状態を使えるのか？
関数型更新を使うのがベスト！

js
setCount((prev) => prev + 1);
こうすれば、「今の値（prev）」を React が保証してくれます。

🎓 まとめ
用語	                    意味
非同期	                setState() は即座に反映されず、後で処理される
バッチ処理	            状態の変更をまとめて処理して、1回の再描画で済ませる
利点	                パフォーマンス向上・不具合回避
関数型更新	            非同期でも正しい状態を扱える安全な書き方 (setX(prev => prev + 1))


🟥引数にについて
setCount((prev) => prev + 1); の prev は任意の変数名でOK
✅「ここで初めて引数を定義している」とは？
このようなコード：

setCount((prev) => prev + 1);
は、**「関数を setCount に渡している」**という形になっていて、
その関数の中で 初めて prev（＝引数）を定義しているんです。

つまり：

(prev) => prev + 1
この (prev) の部分が その関数の引数の定義です。
Reactが setCount を呼び出したとき、Reactの内部で prev に現在の状態を入れて呼んでくれます。

🔍 詳しく言うと…
setCount に渡しているのは関数（コールバック）です：

function updater(prev) {
  return prev + 1;
}
setCount(updater);
この関数が呼ばれるとき、Reactが現在の状態（たとえば 3）を prev に入れて実行してくれます：

updater(3); // => 4
🧠 イメージ図

// 現在 count === 3 だとする

setCount((prev) => {
  // React が prev = 3 を入れてくれる！
  return prev + 1; // => 4 が新しい状態になる
});