React カスタムフック 20250604

Reactの機能のひとつで、コンポーネント間で再利用可能なロジックを関数として切り出せるものです。

✅ なぜカスタムフックを使うの？
ロジックの再利用が可能になる
　→ 例えばカウント機能など、複数のコンポーネントで使い回せるようになる。 再利用性の向上

コンポーネントのコードがスッキリする
　→ UIに関係ない処理（ロジック部分）を外に出せるから、見通しがよくなる。可読性の向上


📁 一般的なファイル構成（例）

src/
├── components/
│   └── Counter.jsx
└── hooks/
    └── useCount.js

🧩 カスタムフックの作り方（例：useCount.js）
js
import { useState } from 'react';

export default function useCount() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return { count, increment, decrement };
}

📦 カスタムフックを使う（例：Counter.jsx）
jsx
import React from 'react';
import useCount from '../hooks/useCount';

export default function Counter() {
  const { count, increment, decrement } = useCount();

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={increment}>増やす</button>
      <button onClick={decrement}>減らす</button>
    </div>
  );
}

💡補足
フック名は必ず use から始めるルールがあります（Reactのルール）。
状態管理や副作用処理（例：useEffect）などもまとめて扱えます。
複雑な処理ほど、ロジックとUIを分けることでコードの可読性と保守性が高まります。


複数のフック（useState や useEffect、useReducer など）をコンポーネント内に直接並べて書くと、ロジックが複雑になって読みづらくなる・再利用しづらくなるといった問題が出てきます。
そこで、カスタムフックとして export default function useCount() のように**切り分ける（抽出する）**ことで、以下のようなメリットがあります。

✅ 例：ロジックをコンポーネント内に直接書いた場合
jsx
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  return <div>{count}</div>;
}

✅ カスタムフックに切り出した場合
jsx
// useCount.js
import { useState, useEffect } from 'react';

export default function useCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return count;
}

jsx
// Counter.js
import useCount from './useCount';

function Counter() {
  const count = useCount();
  return <div>{count}</div>;
}

「UIはUIに集中」、「ロジックは分離」という思想で、カスタムフックを活用することでReactの設計がよりクリーンで拡張性のあるものになります。




ロジックを再利用・分離可能にする「カスタムフック」について
https://www.youtube.com/watch?v=LFcC9cO-5Qk