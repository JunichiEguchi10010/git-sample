React useTransition(Hooks) 20250509

UIの状態更新を「優先度」に応じて分離・遅延させるために使います。
主に「重たい処理や描画が、ユーザー操作（例えばボタンクリック）によって即時にブロックされるのを避ける」ために利用されます。

🔧 主な用途
**ユーザー操作に対する即時の反応（ボタンのクリックなど）**はすぐに反映させる。

**時間がかかる更新（リストの再レンダリングやデータの切り替えなど）**を非同期的に遅らせ、UIのスムーズさを保つ。

🧪 書き方（例）
jsx
import { useTransition, useState } from 'react';

function MyComponent() {
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // 重たい処理（例：検索フィルタ）を遅延させる
    startTransition(() => {
      const filtered = heavyFilter(value); // 時間のかかる処理
      setFilteredList(filtered);
    });
  };

  return (
    <div>
      <input value={inputValue} onChange={handleChange} />
      {isPending && <p>読み込み中...</p>}
      <ul>
        {filteredList.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}
🧠 重要なポイント
startTransition(fn) の中の処理は低優先度として扱われ、React は「他の重要なUI更新が終わってから」それを実行します。

isPending を使えば、「まだ遅延処理が終わってない」状態をUIに表示できます（スピナーなど）。

ユーザー体験を滑らかにするために、入力フィールドや小さなUI反応はすぐ反映させたいが、データ更新は少し遅れてもいい、というときに活躍します。

🧭 使うべきシーン
大量の要素のフィルタリング・並び替え

状態に応じた重たいコンポーネントの再レンダリング

サスペンス（<Suspense>）を使った非同期読み込み時の優先度管理


 よくある具体例①：大量リストのフィルタリング
🔍 問題点
検索ボックスに文字を入力すると毎回リスト全体をフィルタリングするので、文字入力のたびに動作が重くなってしまう。

💡 解決法：useTransitionでフィルタを遅延実行
jsx
コピーする
編集する
import { useState, useTransition } from 'react';

function SearchList({ items }) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // 重たいフィルタリングを遅延実行
    startTransition(() => {
      const result = items.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(result);
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} placeholder="検索..." />
      {isPending && <p>検索中...</p>}
      <ul>
        {filtered.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </>
  );
}
✅ よくある具体例②：タブ切り替えで重たい画面を遅らせる
🔍 問題点
タブを切り替えると即座に重たいコンポーネントを描画しようとしてカクつく。

💡 解決法：切り替え自体はすぐに、描画は useTransition で
jsx
function TabComponent() {
  const [tab, setTab] = useState('home');
  const [currentTab, setCurrentTab] = useState('home');
  const [isPending, startTransition] = useTransition();

  const handleTabClick = (newTab) => {
    setTab(newTab); // UI上のタブ表示は即時変更

    // 中身の表示は遅延させる（重たい可能性）
    startTransition(() => {
      setCurrentTab(newTab);
    });
  };
  return (
    <>
      <nav>
        <button onClick={() => handleTabClick('home')}>ホーム</button>
        <button onClick={() => handleTabClick('profile')}>プロフィール</button>
      </nav>

      {isPending && <p>読み込み中...</p>}
      {currentTab === 'home' && <HomeContent />}
      {currentTab === 'profile' && <ProfileContent />}
    </>
  );
}

✅ よくある具体例③：ルーティング or 検索でAPIを呼ぶ（＋Suspense）
startTransition は React の <Suspense> とも相性がよく、データフェッチやルーティングに応用できます。

jsx
import { useState, useTransition, Suspense } from 'react';

function App() {
  const [page, setPage] = useState('home');
  const [isPending, startTransition] = useTransition();

  const handleNavigation = (newPage) => {
    startTransition(() => {
      setPage(newPage); // Suspenseでローディングを見せる
    });
  };
  return (
    <>
      <button onClick={() => handleNavigation('home')}>ホーム</button>
      <button onClick={() => handleNavigation('about')}>会社概要</button>
      {isPending && <p>ページ遷移中...</p>}
      <!-- Suspenseでローディングを見せる -->
      <Suspense fallback={<p>読み込み中...</p>}>
        <Page page={page} />
      </Suspense>
    </>
  );
};

🎯 ポイントまとめ
useTransition は **「入力やボタンクリックなどは即時反映、重たい処理は遅らせる」**のが目的。

入力に対する検索処理、タブやページ切り替えなどで体感速度の改善に大きな効果を発揮。

isPending でローディングUIを出すことで、処理中かどうかもわかりやすくできる。


 <Suspense> とは？
<「データ取得」や「遅延読み込みのコンポーネント」などが終わるまでの間に、ローディング画面を表示してくれるReactの仕組みです。

🔧 使い方の基本構文 <Suspense> で囲む
jsx
import React, { Suspense } from 'react';

const MyComponent = React.lazy(() => import('./MyComponent'));

function App() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <MyComponent />
    </Suspense>
  );
}
React.lazy() は **コンポーネントを遅延読み込み（コード分割）**します。

<Suspense fallback={...}> に渡した内容が、読み込み完了まで表示されるローディングUIです。

🔄 よく使うケース
ケース                                      	説明
🎯 遅延読み込み（React.lazy）	                ページを分割して必要なときだけ読み込む（SPAの高速化）
🔍 データフェッチ（React 18以降）	            use() や useSuspenseQuery()と組み合わせて使う
📦 SSR（Next.jsなど）	                       サーバー側でもクライアント側でも一貫したローディング表示

🔍 例：ページ切り替え時にローディング表示
jsx
import { Suspense, useState, useTransition } from 'react';

const HomePage = React.lazy(() => import('./HomePage'));
const AboutPage = React.lazy(() => import('./AboutPage'));

function App() {
  const [page, setPage] = useState('home');
  const [isPending, startTransition] = useTransition();

  const PageComponent = page === 'home' ? HomePage : AboutPage;

  return (
    <>
      <button onClick={() => startTransition(() => setPage('home'))}>ホーム</button>
      <button onClick={() => startTransition(() => setPage('about'))}>会社概要</button>
      {isPending && <p>ページ遷移中...</p>}

      <Suspense fallback={<p>読み込み中...</p>}>
        <PageComponent />
      </Suspense>
    </>
  );
}
✅ ポイントまとめ
<Suspense> は「読み込み中の代わりのUI（スピナーやテキストなど）」を表示する仕組み。

React.lazyと組み合わせて、**コード分割（lazy load）**ができる。

React 18以降ではデータの遅延フェッチにも使える（将来的には標準化が進む領域）。
