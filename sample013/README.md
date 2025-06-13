Reactで最もよく使うuseStateの基本的な考え方と使い方


1. useStateとは？
useState は、Reactで状態（state）を管理するためのフックです。
状態とは、コンポーネント内で変化するデータのことを指します。例えば、ボタンをクリックした回数や入力フィールドの値などです。


2. useStateの基本的な使い方
useState は、Reactのフックの一つで、コンポーネント内で状態を管理するための関数です。    

javascriptファイル
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0); // 初期値を0に設定
;  [count, setCount] = useState(0)　[現在の状態（state）: count のような変数に格納, 状態を更新する関数: setCount のような関数として格納] = useState(2つの値配列を返します。初期値:0)

; count（引数に相当）: 現在の状態を保持する変数。
; 初期値として 0 が設定されています。
; setCount（関数名に相当）: 状態を更新する関数。呼び出すと状態が変化し、UIが再レンダリングされます。
; useState : Reactで状態を管理するための 関数 です。具体的には、Reactが提供する「フック」のひとつです。


  const handleClick = () => {
    setCount(count + 1); // ボタンをクリックするたびにcountを1増やす
  };

  return (
    <div>
      <p>{count} 回クリックされました。</p>
      <button onClick={handleClick}>クリック</button>
    </div>
  );
}

export default App;


useState(初期値):

状態の初期値を設定します。この例では、count の初期値を 0 にしています。
Reactでは、useState が配列を返し、第一要素が「状態」、第二要素が「状態更新関数」として格納されます。
この配列を分割代入して取り出すため、変数名は自由に指定できます

引数の名前選びのポイント

状態を表す名前:
状態（state）が何を表しているか、直感的に分かる名前を選ぶと良いです。
例えば、count や isLoggedIn などの具体的な名前。

関数の名前:
状態更新関数には、意味が分かりやすい名前をつけると良いです。例えば、setCount のように set から始まる命名が一般的です。


コード例
// 状態: カウント回数
const [clickCount, setClickCount] = useState(0);

// 状態: ログイン情報
const [isUserLoggedIn, toggleLoginStatus] = useState(false);

// 状態: テーマ設定
const [theme, updateTheme] = useState('light');

推奨される命名ルール
シンプルで明確: 長い名前よりも簡潔で分かりやすい名前を選びましょう。

一貫性: 状態の名前は名詞、更新関数は動詞＋名詞（例: setCount, toggleLoginStatus）の形にすると可読性が向上します。




分割代入:

useState は配列を返します。1つ目の要素が現在の状態（count）、2つ目の要素が状態を更新する関数（setCount）です。

状態の更新:

setCount を呼び出すことで、状態を更新します。Reactは状態が更新されると、自動的にコンポーネントを再レンダリングします。
画面全体が再レンダリングされるわけではなく､状態が変更された部分のみが更新されます。
仮想DOMを活用して効率的に更新がパフォーマンスが最適化されます。


3. 実際の動作
初期状態では、count の値は 0 です。

ボタンをクリックするたびに、setCount が呼び出され、count の値が1ずつ増加します。

更新された値は、<p> タグ内に表示されます。


4. 応用例
リセットボタン(クリック回数をリセットする機能)

javascriptファイル
const resetCount = () => {
  setCount(0); // countを0にリセット
};


5. useStateの利点
簡潔なコード: 状態管理がシンプルに記述できます。
リアクティブな更新: 状態が更新されると、自動的にUIが再レンダリングされます。
複数の状態管理: 必要に応じて複数のuseStateを使用できます。





Reactで最もよく使うuseStateの基本的な考え方と使い方を解説！
https://www.youtube.com/watch?v=FsSfndm7ZKk
