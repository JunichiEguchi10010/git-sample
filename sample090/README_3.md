JavaScript React　三項演算子を使った条件付きレンダリング　20250604

return (
  <>
    {quizData[quizIndex] && <Display>{`Q1. ${quizData[quizIndex].question}`}</Display>}
    {quizData[quizIndex].options.map((option, index) => {
      return (
        <Button key={`option-${index}`} onClick={() => handleClick(index)}>
          {option}
        </Button>
      );
    })}
  </>
);


✅ 上記のコードがしていること
1. quizData[quizIndex] && ... の意味
jsx
{quizData[quizIndex] && <Display>...</Display>}
これは「quizData[quizIndex] が存在するなら表示する」という条件付きレンダリングです。
quizData[quizIndex] が null や undefined なら、false になるので何も表示されません。
存在していれば <Display> コンポーネントを描画します。

✅ 安全にアクセスするためのガード（防御）です。

2. .map()のところ
jsx
{quizData[quizIndex].options.map(...)}
この行は quizData[quizIndex] が 存在する前提で .options を使っているので、もし quizData[quizIndex] が undefined だったらエラーになります。

🔧 改善した安全な書き方
jsx
return (
  <>
    {quizData[quizIndex] ? (
      <>
        <Display>{`Q1. ${quizData[quizIndex].question}`}</Display>
        {quizData[quizIndex].options.map((option, index) => (
          <Button key={`option-${index}`} onClick={() => handleClick(index)}>
            {option}
          </Button>
        ))}
      </>
    ) : (
      <p>読み込み中、またはデータが存在しません</p>
    )}
  </>
);
このようにすれば：
データがあるとき → 質問と選択肢を表示
データがないとき → 代わりの文言を表示

🧠 なぜ条件付きレンダリングが重要か？
Reactでは 非同期処理でデータを取得するケースが多いため、描画時にデータが存在しない場合に備える必要があるからです。

jsx
useEffect(() => {
  fetchData().then(data => setQuizData(data));
}, []);
こんな感じでデータを取得する場合、quizData[quizIndex] がまだ undefined の状態で画面がレンダリングされるので、そのままアクセスするとエラーが出てしまいます。

🪛 まとめ
書き方	            説明
a && b	        a が true なら b を返す（false なら何も表示されない）
a ? b : c	    a が true なら b、false なら c を表示（明示的な2択）
データ取得前の状態に備える	条件付きレンダリングで「データなし」に対処



02:10:51 40.条件付きレンダリング
【2025年最新】世界一簡単なReact講座！JavaScript初心者・中級者は必見
https://www.youtube.com/watch?v=TgU-FT2WdS4