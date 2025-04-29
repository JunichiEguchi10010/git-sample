React useState(Hooks) 20250429

useStateはReactの最も基本的なフックであり、コンポーネントの状態を管理するために使用されます。
このフックを使うことで、状態（State）を作成し、それを更新する関数を取得できます。そして状態が変更された際には、コンポーネントが再レンダリングされます。

主な特徴
初期値の設定: useStateを呼び出す際に、初期値を指定します。
初期値は数値、文字列、オブジェクト、配列などさまざまな型を指定可能です。

現在の状態と更新関数: useStateは2つの値を返します。

現在の状態（state）。

状態を更新するための関数（setState）。

使い方の例
入力フォームを使ってテキストを更新するアプリを作る場合の例:

javascript
import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('Hello World'); // 初期値を設定

  const handleChange = (event) => {
    setText(event.target.value); // 状態を更新
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <p>{text}</p>
    </div>
  );
}

export default App;

コードの説明
useState('Hello World')で、初期値が"Hello World"の状態を作成。

状態を更新するための関数setTextを取得。

inputのonChangeイベントを使って入力内容を更新。

状態が変わるたびに再レンダリングが行われ、<p>タグ内の内容が更新されます。

応用例
ECサイトのショッピングカート機能に利用されることもあります。
例えば、商品数量を変更するとカートの合計金額が更新される、といった動作を実現できます。

useStateは、シンプルな状態管理に非常に便利ですが、状態管理が複雑になった場合は、useReducerなど他のフックを検討すること。


【これ1本】12分でReact Hooks全20種を理解できる教科書
https://www.youtube.com/watch?v=rMRWkeXN29g&list=LL&index=13