React useCallback(hooks) 20250705

🔧 1. 背景：なぜ「関数のメモ化（キャッシュ）」が必要なの？
Reactでは、状態が更新されるとコンポーネントが再レンダリングされるという特徴があります。
その際に、関数も再定義されてしまうため、毎回新しい関数として扱われてしまうんですね。

✳️ 例
jsx
const doubleCount = () => count * 2;
この doubleCount 関数は、App コンポーネントが再レンダリングされるたびに「新しく定義される関数」になります。

それを子コンポーネントに渡すと、Reactは「新しいpropsが渡された」と見なして、子も再レンダリングされてしまいます。

🎯 2. 解決策：useCallback を使って関数を「メモ化」する
Reactの useCallback を使うと、**関数をキャッシュ（メモ化）**して、前回と同じ関数インスタンスを再利用できます。

✅ 書き方
jsx
const memoizedFunction = useCallback(() => {
  // 処理
}, [依存する変数]);
[] は依存配列（useEffectと同じ）で、その変数が変わらない限り、同じ関数を使いまわす。

🧪 3. 実験：普通の関数 vs useCallback の違い
❌ useCallbackなしの例
jsx
const doubleCount = () => count * 2;
<ChildComponent doubleCount={doubleCount} />
Appの中でカウントが変わると、関数も再定義される
→ propsが変わったと見なされて ChildComponent も再レンダリングされる

✅ useCallbackありの例
jsx
const doubleCount = useCallback(() => count * 2, [count]);
<ChildComponent doubleCount={doubleCount} />
count が変わった時だけ関数を再定義
変わらない時は、前回と同じ関数を使う
→ 子コンポーネントの再レンダリングが防げる（ただし、依存に count があるので今回はあまり意味がない）

⚠️ 4. 注意点：useCallback を使っても無駄になるケース
動画内でも触れていた大事なポイント：

「関数の中で count を使っていると、結局 count を依存配列に入れなきゃいけない。
そうすると count が変わるたびに関数も再定義される。」
つまり、意味のない useCallback になってしまうということです。

💡 5. 有効な使い方（依存がない関数）
例えば次のような関数なら、useCallback([])で初回だけ定義してずっと使えるので、再レンダリングを防げます。
jsx
const sayHello = useCallback(() => {
  return "Hello!";
}, []);
これを子コンポーネントに渡しても、親が再レンダリングされても関数は変わらないので、子も再レンダリングされない。

🧩 6. React.memo と組み合わせて最適化！
React.memo → コンポーネントをメモ化してpropsが変わらない限り再レンダリングを防ぐ
useCallback → propsとして渡す関数が毎回変わる問題を防ぐ
この2つをセットで使うのが、パフォーマンス最適化の定番パターンです。

🧭 まとめ
概要	        説明
なぜ必要？	    関数が毎回新しく生成されると、子コンポーネントが再レンダリングされてしまうから
使い方	        const func = useCallback(() => {...}, [依存変数]);
注意点	        関数内で依存する変数があると、結局再定義されてしまう
有効な場面	    外部に依存せず、毎回同じ処理をする関数を子に渡したいとき
おすすめセット	useCallback + React.memo

📘 補足
useCallback は 関数版の useMemo と覚えておくとよいです。
実務でパフォーマンスが気になる場合に、必要な箇所だけピンポイントで使うのがコツです。