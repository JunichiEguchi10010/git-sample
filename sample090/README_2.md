JavaScript React filter()関数 20250604

JavaScriptのfilter()メソッドは、配列の要素を条件で絞り込んで新しい配列を作るメソッドです。

🧠 基本構文
javascript
const 新しい配列 = 元の配列.filter((要素, インデックス, 配列) => {
  return 条件; // trueを返すとその要素が残る
});

✅ 簡単な例
javascript
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]
この例では、偶数だけを抽出しています。

🧪 Reactでのfilter()使用例
クイズの選択肢を条件でフィルターしたいときなど、以下のように使えます。

🎯 例：特定の選択肢だけ表示する
jsx
{quizData[quizIndex]?.options
  .filter(option => option !== '無効な選択肢') // 条件に合うものだけ残す
  .map((option, index) => (
    <Button key={`option-${index}`} onClick={() => handleClick(index)}>
      {option}
    </Button>
  ))
}
この例では、「無効な選択肢」だけを除いて表示しています。

💡 よくある使い方
ユーザーのリストから「退会済み」を除外

商品の一覧から「在庫なし」を非表示

タグ付き記事をタグで絞り込む

クイズで正解の選択肢だけ抽出

🚫 よくある間違い
filter()の戻り値は元の配列を変更しない → 常に新しい配列を返す

filter()の中でsetState()をしない（必要ならuseEffect内で行う）

✨補足：filter + useEffect
たとえば、カテゴリで選択肢を絞り込む場合：

jsx
useEffect(() => {
  const filtered = quizData[quizIndex].options.filter(
    option => option.category === selectedCategory
  );
  setFilteredOptions(filtered);
}, [quizIndex, selectedCategory]);



🟨Reactでのfilter()メソッド使用例

export default function QuizPage() {
  const handleClick = (clickedIndex) => {
    setAnswerLogs((prev) => [...prev, false]);

    setQuizIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (answerLogs.length === MAX_QUIZ_LEN) {
      const correctNum = answerLogs.filter((answer) => {
        return answer === true;
      });

      navigation(ROUTES.RESULT, {
        state: {
          maxQuizLen: MAX_QUIZ_LEN,
          correctNum: correctNum
        }
      });
    }
  }, [answerLogs]);
}


🧩 擬似コード・技術マッピング・実コード対応表

擬似コードの内容	                            技術マッピング	                          
関数 QuizPage を定義する	                ✅ Reactコンポーネント（Function Component）	
export default function QuizPage() {

ユーザーがクリックしたときの処理を定義する	 　✅ イベントハンドラ関数の定義（JavaScript）
const handleClick = (clickedIndex) => {

回答ログに「不正解（false）」を追加する	      ✅ useState のステート更新（スプレッド構文）	
setAnswerLogs((prev) => [...prev, false]);

現在のクイズ番号を1つ進める	            　　　✅ useState のステート更新（数値インクリメント）	
setQuizIndex((prev) => prev + 1);

回答ログが全問分に達したら処理を行う	　　　 ✅ useEffect フック（副作用処理の設定）	
useEffect(() => {
if (answerLogs.length === MAX_QUIZ_LEN) {
🟥「ユーザーがすべてのクイズに答え終わったかどうかを監視し、終わったら結果画面へ遷移させる」ための処理


正解（true）だけを取り出して数える	　　　　　✅ 配列の filter メソッドによる条件抽出
const correctNum = answerLogs.filter((answer) => answer === true);

結果ページに遷移してデータを渡す	　　　　　✅ navigation 関数で画面遷移（React Routerなど）	

navigation(ROUTES.RESULT, {
  state: {
    maxQuizLen: MAX_QUIZ_LEN,
    correctNum: correctNum
  }
});
この副作用は、回答ログが変更された時にだけ実行される	✅ useEffect の依存配列（再実行条件の設定）	
}, [answerLogs]);



📦 全体の目的
この QuizPage 関数コンポーネントは、クイズの問題に答えていくページを作成するものです。

主な役割は以下の通り：
🟨ユーザーのクリックに反応し、回答を記録して次の問題へ進める。

🟨全問答え終わったら、自動的に結果ページへ遷移して正解数を渡す。

🧩 1. コンポーネントの宣言
js
export default function QuizPage() {
QuizPage は React の 関数コンポーネント（Function Component）です。
export default により、他のファイルからインポートして使えます。

🧠 2. クリック時の処理（イベントハンドラ）
js
const handleClick = (clickedIndex) => {
  setAnswerLogs((prev) => [...prev, false]);
  setQuizIndex((prev) => prev + 1);
};
解説：
handleClick：
ボタンがクリックされたときに呼ばれる関数です。引数 clickedIndex はどの選択肢が押されたかなどの情報（ここではまだ使われていない）。

setAnswerLogs((prev) => [...prev, false]);
これまでの回答ログ prev に「false（不正解）」を追加します。
今は仮にすべて不正解で記録している状態です。

setQuizIndex((prev) => prev + 1);
現在のクイズ番号を次に進めます（1つ増やす）。

💡 useState で定義された setAnswerLogs, setQuizIndex は省略されているので、上のコードの前に以下のような定義があるはずです：
js
const [answerLogs, setAnswerLogs] = useState([]);
const [quizIndex, setQuizIndex] = useState(0);

🔁 3. 全問回答後の処理（useEffect）
js
useEffect(() => {
  if (answerLogs.length === MAX_QUIZ_LEN) {
    const correctNum = answerLogs.filter((answer) => {
      return answer === true;
    });

    navigation(ROUTES.RESULT, {
      state: {
        maxQuizLen: MAX_QUIZ_LEN,
        correctNum: correctNum
      }
    });
  }
}, [answerLogs]);

解説：
useEffect(() => { ... }, [answerLogs]);
Reactの副作用フックです。

answerLogs が変わったとき（回答が追加されたとき）に実行されます。

if (answerLogs.length === MAX_QUIZ_LEN)
クイズの回答数がすべて終わったか確認。

例：全10問なら、answerLogs の長さが10になったときだけ実行。

const correctNum = answerLogs.filter(...)
true（正解）だけを取り出す。

結果として、正解の数が correctNum.length になります。

navigation(ROUTES.RESULT, { state: { ... } })
結果ページ（ROUTES.RESULT）に画面遷移します。

その際、stateとして以下のデータを渡します：

maxQuizLen（問題数）

correctNum（正解数）

💡 この navigation は React Router v6 以降の useNavigate() 関数から来ています。

📝 まとめ表
処理内容	                     技術	                                    説明
コンポーネント定義	            React Function Component	    QuizPage関数としてページを定義
ユーザークリック時の処理	    イベントハンドラ	              handleClickで回答を記録し、次の問題へ
回答ログ更新	                useState + スプレッド構文	     回答（false）を配列に追加
クイズ番号更新	                useState + 数値インクリメント	 quizIndex を1増やす
全問終了判定	                useEffect + 条件分岐	        回答数と最大数を比較してチェック
正解数の集計	                配列の filter メソッド	         true（正解）だけを抽出
結果画面へ遷移	                useNavigate() + state渡し	    クイズ結果を結果画面に引き継いで移動



「filter()」関数と「useEffect」はReactで一緒に使うことが多く相性が良い。
具体的には、状態（state）のデータを「filter()」で絞り込みたいときに、その絞り込み処理を「useEffect」の中に書くことが多いです。
例えば、
jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [items, setItems] = useState([
    { id: 1, category: 'fruit', name: 'Apple' },
    { id: 2, category: 'vegetable', name: 'Carrot' },
    { id: 3, category: 'fruit', name: 'Banana' },
  ]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [category, setCategory] = useState('fruit');

  useEffect(() => {
    const result = items.filter(item => item.category === category);
    setFilteredItems(result);
  }, [items, category]);

  return (
    <div>
      <h1>Filtered Items</h1>
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={() => setCategory('vegetable')}>Vegetables</button>
      <button onClick={() => setCategory('fruit')}>Fruits</button>
    </div>
  );
}
この例では、items と category のどちらかが変わるたびに「filter()」で絞り込んだ結果を「filteredItems」にセットしています。
「filter()」は配列のデータを条件で絞り込むのに便利。
「useEffect」は依存する値が変わったタイミングで処理を実行できるので、絞り込み処理の自動更新に使いやすい。
この組み合わせで、UIの表示が最新の状態に保たれます。























02:08:19～ 39.「.filter()」で正解数だけをカウントする
【2025年最新】世界一簡単なReact講座！JavaScript初心者・中級者は必見
https://www.youtube.com/watch?v=TgU-FT2WdS4