React useCallback(Hooks) 20250507

関数をメモ化（再生成しないようにキャッシュ）するためのフックで、主にパフォーマンス最適化が目的です。

基本構文
const memoizedCallback = useCallback(() => {
  // 実行したい処理
}, [依存配列]);

memoizedCallback はメモ化された関数。
依存配列にある値が変わらない限り、同じ関数オブジェクトが再利用されます。

なぜ使うのか？
React では、コンポーネントが再レンダリングされるたびに関数も毎回新しく作り直されます。
そのため、子コンポーネントに関数を渡している場合、毎回「別の関数」と見なされてしまい、不要な再レンダリングが起きる可能性があります。

例：
jsx
const handleClick = () => {
  console.log("Clicked");
};
<MyButton onClick={handleClick} />
↑この handleClick は毎回新しく作られます。

jsx
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);

<MyButton onClick={handleClick} />
↑useCallbackで囲うと再生成されず、子コンポーネントが無駄に再レンダリングされません。


よくある注意点
依存配列を正しく設定しないとバグになります。（useEffectと同じく）
常に使えばいいというわけではありません。 最適化のしすぎは逆にパフォーマンスを落とします。(メモリ消費が増加の可能性あり)
本当に再生成コストが問題になっているときだけ使うべきです。

まとめ
特徴	                    内容
目的	                    関数の再生成を防ぐ（不要な再レンダリング防止）
タイミング	                子コンポーネントにコールバックを渡すときなど
類似フック	                useMemo（値のメモ化）


🔧 基本の組み合わせパターン
✅ 親コンポーネント（関数を useCallback でメモ化）
jsx
import React, { useCallback, useState } from "react";
import Child from "./Child";

function Parent() {
  const [count, setCount] = useState(0);

  // useCallbackで関数をメモ化
  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </div>
  );
}

export default Parent;

✅ 子コンポーネント（React.memoでメモ化）
jsx
import React from "react";

function Child({ onClick }) {
  console.log("Child rendered");
  return <button onClick={onClick}>Click Me</button>;
}

// React.memoで再レンダリングを防ぐ
export default React.memo(Child);

💡 結果どうなる？
Parent が再レンダリング（例:count の変更）しても…
useCallback により onClick 関数は同一のまま
React.memo により Child は再レンダリングされない

🔍 よくあるミス
jsx
const handleClick = () => { console.log("Clicked!"); };
↑こう書いてしまうと、毎回新しい関数になり、Child は毎回再レンダリングされます。

📝 ポイントまとめ
フック	                目的
useCallback	           関数の再生成を防ぐ（propsが毎回変わらないように）
React.memo	           propsが同じなら再レンダリングしないようにする



✅ よくある実例：リスト＋子コンポーネント＋クリック処理
👨‍👩‍👧‍👦 親コンポーネント（リストを表示し、各アイテムにクリック関数を渡す）
jsx
import React, { useCallback, useState } from "react";
import Item from "./Item";

const itemsData = [
  { id: 1, name: "りんご" },
  { id: 2, name: "みかん" },
  { id: 3, name: "バナナ" },
];

function ItemList() {
  const [selectedId, setSelectedId] = useState(null);

  // メモ化されたクリック関数（idを引数で受け取る）
  const handleSelect = useCallback((id) => {
    console.log("選択されたID:", id);
    setSelectedId(id);
  }, []);

  return (
    <div>
      <h2>フルーツ一覧</h2>
      {itemsData.map((item) => (
        <Item
          key={item.id}
          item={item}
          isSelected={item.id === selectedId}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}

export default ItemList;

🍎 子コンポーネント（React.memoで再レンダリングを防ぐ）
jsx
import React from "react";

function Item({ item, isSelected, onSelect }) {
  console.log(`Item rendered: ${item.name}`);

  return (
    <div
      style={{
        padding: "8px",
        margin: "4px",
        backgroundColor: isSelected ? "#def" : "#eee",
        cursor: "pointer",
      }}
      onClick={() => onSelect(item.id)}
    >
      {item.name}
    </div>
  );
}
// item, isSelected, onSelect が変わらなければ再レンダリングされない
export default React.memo(Item);

💡 このパターンのポイント
要素	                    解説
useCallback	            handleSelect を毎回作り直さないため
React.memo	            子 Item コンポーネントを不要に再レンダリングしない
props に注意	        item, isSelected, onSelect のいずれかが変わると再レンダリングされます

✅ 期待される挙動
ItemList が状態更新されても（別のアイテムが選ばれても）、
クリックされてないアイテムは再レンダリングされない
→ パフォーマンス改善につながる。

実際の開発では、これに useMemo や Context, Redux などを組み合わせて使うことも多いです。


レンダリングを最適化してWebパフォーマンスを向上させてみよう【React.memo/useMemo/useCallback入門】
https://www.youtube.com/watch?v=GvPBr43lJk0