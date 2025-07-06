React useMemo(Hooks) 20250505

パフォーマンス最適化のためのフックです。主に**高コストな計算をメモ化（キャッシュ）**することで、不要な再計算を防ぐ目的で使われます。

 useMemoの基本構文
jsx
const memoizedValue = useMemo(() => {
  return heavyComputation(a, b);
}, [a, b]);

useMemo(関数、依存配列)
第1引数：関数（計算処理）
第2引数：依存配列 → 値が変わらない限り、前回の計算結果を再利用

基本構文の解説
useMemo は React のフックの一つで、**「再計算を避けたい値」をキャッシュ（記憶）**するために使います。
useMemo(...) の返り値が memoizedValue に代入されます。memoizedValue は「重い計算の結果（キャッシュされた値）」になります。
**const memoizedValue = useMemo(() => {**

useMemo に渡された関数（第1引数）の中で、heavyComputation(a, b) を実行しています。
この部分は「実際に計算を行う場所」で、**コストの高い処理（例：ループやAPI、フィルター処理など）**が入ることを想定しています。
a と b を引数として処理し、その戻り値がキャッシュされる形になります。第1引数：関数（計算処理）にあたる。
**return heavyComputation(a, b);**

useMemo の第2引数は「依存配列」と呼ばれます。
この [a, b] の中にある値が変わったときだけ、heavyComputation(a, b) を再実行します。
a や b が同じままであれば、**以前に計算した結果（キャッシュ）**がそのまま返されます。
第2引数：依存配列 → 値が変わらない限り、前回の計算結果を再利用にあたる。
**}, [a, b]);**

全体のロジック
初回レンダリング時：
a と b がまだ未定、あるいは新しい値 → heavyComputation(a, b) を実行して、その結果を記憶（キャッシュ）

次のレンダリング時：
a や b に変更がなければ再計算はせず、以前の結果をそのまま使う

イメージ図（擬似的に）
js
// 一度だけ実行される：
if (a または b が変わった) {
  memoizedValue = heavyComputation(a, b); // 再計算
} else {
  memoizedValue = 前の結果; // キャッシュ再利用
}


**実践的な useMemo の例**
例えば、大量のデータをフィルターするような場面で useMemo はとても役立ちます。
jsx
import { useState, useMemo } from 'react';

const users = [
  { id: 1, name: 'Taro' },
  { id: 2, name: 'Hanako' },
  { id: 3, name: 'Jiro' },
  // ... 数百・数千のデータがあると想定
];

export default function UserList() {
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {
    console.log('ユーザーリストをフィルター中...');
    return users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <div>
      <input
        type="text"
        placeholder="名前で検索"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
🔍 ポイント：

入力が変更されたときだけ filteredUsers を再計算する
大量データでパフォーマンスが落ちるのを防ぐ



🧠 例：重い計算の再実行を避けたい
jsx
import { useMemo, useState } from 'react';

function ExpensiveComponent({ number }) {
  const [count, setCount] = useState(0);

  const doubleNumber = useMemo(() => {
    console.log('重い計算...');
    return number * 2;
  }, [number]);

  return (
    <div>
      <div>倍の数: {doubleNumber}</div>
      <button onClick={() => setCount(count + 1)}>+1カウント: {count}</button>
    </div>
  );
}
✅ この例では number が変わらない限り number * 2 の計算は一度だけ行われます。
❌ useMemo を使わなければ、毎回レンダリングのたびに再計算されます。

📝 使いどころ
高コストな計算処理（フィルタリング、ソート、大量データ処理など）
レンダリングごとに関数やオブジェクトの再生成を避けたい場合（useCallbackと併用するケースも多い）

⚠️ 注意点
パフォーマンスを必ず改善するわけではありません！
軽い処理に使うと逆にオーバーヘッドになることもあるので、使いすぎ注意です。

✅ より実践的な useMemo の例
例えば、大量のデータをフィルターするような場面で useMemo はとても役立ちます。
jsx
import { useState, useMemo } from 'react';

const users = [
  { id: 1, name: 'Taro' },
  { id: 2, name: 'Hanako' },
  { id: 3, name: 'Jiro' },
  // ... 数百・数千のデータがあると想定
];

export default function UserList() {
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {
    console.log('ユーザーリストをフィルター中...');
    return users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <div>
      <input
        type="text"
        placeholder="名前で検索"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
🔍 ポイント：
入力が変更されたときだけ filteredUsers を再計算する
大量データでパフォーマンスが落ちるのを防ぐ


**🔁 useMemo vs useCallback の違い**
項目	                        useMemo	                            useCallback
目的	                    計算結果のメモ化            	        関数のインスタンス（参照）のメモ化
戻り値	                    値（オブジェクト・配列・数値など）  	　関数
よく使う場面	            重い計算処理 / ソート・フィルタなど      　useEffect や React.memo に渡す関数を安定化させたい時

🎯 useCallback の例（子コンポーネントに関数を渡すとき）
jsx
コピーする
編集する
import { useState, useCallback } from 'react';

function Child({ onClick }) {
  console.log('Child rendered');
  return <button onClick={onClick}>クリック</button>;
}

const MemoizedChild = React.memo(Child);

export default function Parent() {
  const [count, setCount] = useState(0);

  // 関数が毎回新しく生成されると React.memo でも再レンダリングされる
  const handleClick = useCallback(() => {
    console.log('クリックされました');
  }, []); // 依存関係がないので、初回のみ生成

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <MemoizedChild onClick={handleClick} />
    </div>
  );
}
✅ useCallback で関数の再生成を防ぎ、子コンポーネントの再レンダリングも防ぐ
❌ useMemo を使っても関数の参照自体は変わるので効果なし

🧠 useMemo vs useCallback の違いまとめ
状況	                                                            使うべきHook
重い処理の結果をキャッシュしたい	                                   useMemo
関数の参照を固定したい（再レンダリング抑制や useEffect の依存に使う） 　 useCallback


useMemo と React.memoの違い
はどちらも パフォーマンス最適化のためのメモ化（= 値や処理をキャッシュして無駄な再実行・再レンダリングを防ぐ）に使いますが、用途が異なります。

🔍 違いのまとめ
比較項目	                      useMemo	                                              React.memo
目的	                        値（計算結果）をメモ化する            	              コンポーネントの再レンダリングを抑制する
使い方の対象	                 関数の中の「重い処理」                               「値」など	Reactの「関数コンポーネント」
よく使う場面	                 高コストな配列計算・フィルター・並び替えなど	          親のstate更新で子が無駄に再レンダリングされるとき
構文の例	                     const result = useMemo(() => ..., [依存]);        	export default React.memo(MyComponent)

🔧 それぞれの具体例
✅ useMemo の例：重い計算のキャッシュ
jsx
const filteredList = useMemo(() => {
  return items.filter(item => item.active);
}, [items]); // items が変わったときだけ再計算
🔹 items が変わらなければ filter 処理を再実行しない。

✅ React.memo の例：子コンポーネントの無駄な再レンダリング防止
jsx
const Child = React.memo(({ value }) => {
  console.log('Child rendered');
  return <div>{value}</div>;
});
🔹 props.value が変わらない限り、Child は再描画されない。

🎯 使い分けのポイント
状況	使うもの
重い処理の結果をキャッシュしたい	        useMemo
コンポーネント自体の再描画を防ぎたい	    React.memo
親の更新が子に波及してしまうとき	        React.memo
子に渡す関数が毎回新しくなるとき	        useCallback（+ React.memo）


React.memo と useMemo を組み合わせて使う実践的な例
特に、親コンポーネントの再レンダリングで子コンポーネントが無駄に再描画されないようにするパターンです。

🎯 目的
React.memo を使って「子コンポーネントの再レンダリングを防止」

useMemo を使って「子に渡す props（計算済みの値）をメモ化」

✅ 実践例：商品リストをフィルターして表示
jsx
import React, { useState, useMemo } from 'react';

// 🔸 子コンポーネント（React.memo でラップ）
const ProductList = React.memo(({ filteredItems }) => {
  console.log('ProductList rendered');
  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [count, setCount] = useState(0); // unrelated state

  const items = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Grapes' },
  ];

  // 🔸 useMemo でフィルタリング結果をメモ化
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, items]);

  return (
    <div>
      <h1>Product Filter</h1>
      <input
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={() => setCount(count + 1)}>+1 Count ({count})</button>

      {/* 🔸 filteredItems が変わらない限り ProductList は再レンダリングされない */}
      <ProductList filteredItems={filteredItems} />
    </div>
  );
};

export default App;

🔍 解説
部分                                                	働き
React.memo(ProductList)	                            filteredItems が変わらない限り再レンダリングされない
useMemo(..., [keyword])	                            keyword が変わらない限りフィルター処理は再実行されない
count 更新ボタン	                                   ProductList に関係ない state だが、通常なら子も再描画される→ 今回はされない ✅

✅ 結果
無駄な ProductList の再描画が起こらず、高速・効率的。
特に大量データや頻繁な親更新がある場面で効果大。


関数 props の無駄な再生成による子コンポーネントの再レンダリングを防ぐ実践例

🎯 背景・目的
React では、親コンポーネント内で定義された関数は再レンダリングのたびに新しく作られるため、
それを props として子に渡すと、React.memo でも「新しい関数なので再レンダリングが起こる」ことがあります。
➡️ それを防ぐのが useCallback！

✅ 実践コード：カートに商品を追加する関数を子に渡すパターン
jsx
import React, { useState, useCallback } from 'react';

// 🔸 子コンポーネント（React.memo）
const AddToCartButton = React.memo(({ onAdd, product }) => {
  console.log('AddToCartButton rendered:', product.name);
  return (
    <button onClick={() => onAdd(product)}>Add {product.name} to cart</button>
  );
});

const App = () => {
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0); // 関係ないステート

  const product = { id: 1, name: 'Laptop' };

  // 🔸 useCallback で onAdd 関数をメモ化
  const handleAddToCart = useCallback((product) => {
    setCart(prev => [...prev, product]);
  }, []);

  return (
    <div>
      <h1>Cart Items: {cart.length}</h1>
      <button onClick={() => setCount(count + 1)}>+1 Count ({count})</button>

      {/* 🔸 onAdd 関数が再生成されないので、子が再レンダリングされない */}
      <AddToCartButton onAdd={handleAddToCart} product={product} />
    </div>
  );
};

export default App;

🔍 解説
テクニック	                                              効果
React.memo(AddToCartButton)	                            onAdd や product が変わらない限り、子コンポーネントは再描画されない
useCallback(...)	handleAddToCart                       関数が再生成されるのを防ぐ（依存がないため永続）
count の更新	                                          親は再描画されるが、子はされない ✅

💡補足
関数の中で cart を使うとき、useCallback の依存に cart を入れると意味が薄れます。
その場合は setCart(prev => [...prev, product]) のように関数形式で書くと良いです。

🔚 結論
React.memo：props（値や関数）が変わらなければ再描画されない。
useCallback：関数を「変わらない props」にするために使う。





そもそもReactのuseMemoフックを使わないように作るに越したことない
https://www.youtube.com/watch?v=Ypgtox7fbWk

ReactのuseMemoを使うときの注意点
https://www.youtube.com/watch?v=2dPR5lsDGQE

レンダリングを最適化してWebパフォーマンスを向上させてみよう【React.memo/useMemo/useCallback入門】
https://www.youtube.com/watch?v=GvPBr43lJk0

関数をメモ化（キャッシュ）できる「useCallback」解説！
https://www.youtube.com/watch?v=19HPA4sEWJY