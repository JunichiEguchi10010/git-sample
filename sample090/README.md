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