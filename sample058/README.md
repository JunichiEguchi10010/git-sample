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



そもそもReactのuseMemoフックを使わないように作るに越したことない
https://www.youtube.com/watch?v=Ypgtox7fbWk

ReactのuseMemoを使うときの注意点
https://www.youtube.com/watch?v=2dPR5lsDGQE

レンダリングを最適化してWebパフォーマンスを向上させてみよう【React.memo/useMemo/useCallback入門】
https://www.youtube.com/watch?v=GvPBr43lJk0