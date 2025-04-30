React useEffect(Hooks) 20250430

コンポーネントのライフサイクルに基づいて副作用を処理するために使われます。
Reactの副作用はレンダリングではなく、レンダリングの結果として生じる外部の状態変更を指します。
Reactでは、副作用を適切に管理することで、バグを防ぎ、パフォーマンスの最適化が可能になります。

Reactで副作用に分類されるもの：
APIリクエスト（データ取得） → 外部サーバーとの通信

DOMの直接操作 → document.title の変更や querySelector

イベントリスナーの登録 → window.addEventListener

タイマー処理 → setTimeout や setInterval

ローカルストレージの操作 → localStorage.getItem() や setItem()

WebSocketの通信 → リアルタイムデータの取得

これらの処理は、コンポーネントのレンダリングとは無関係に実行されるべきですが、useEffect を使って適切に管理することで、不要な再実行を防ぐことができます。


副作用を適切に管理しないとどうなる？：
副作用を適切に管理しないと、次のような問題が発生することがあります：

無限ループ: 副作用の中でステートを更新すると、レンダリングが繰り返される。

メモリリーク: window.addEventListener などを解除しないと、コンポーネントが削除されてもイベントが残る。

不要なAPIリクエスト: 依存配列を適切に管理しないと、毎回リクエストを送ってしまう。


簡単なコード例（レンダリング vs 副作用）
javascript
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // **レンダリング**
  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>増やす</button>
    </div>
  );

  // **副作用**
  <!-- useEffect の 第二引数（依存配列） に何を指定するかによって、コンポーネントの 再レンダリングのタイミングが変わる-->
  useEffect(() => {
    document.title = `カウント: ${count}`; // 外部の状態変更 (document.title)
  }, [count]); // countが変更されたときのみ実行
}
<!-- このように、副作用（document.titleの変更）を適切にuseEffectの中に閉じ込めることで、コンポーネントのレンダリングロジックと副作用を分離できます。 -->


依存配列(第二引数)の使い方
1. 空配列 [] の場合：
初回マウント時（コンポーネントが画面に追加されたとき）の 一度だけ 実行される。
その後、コンポーネントの再レンダリングが起きても useEffect 内の処理は呼ばれない。

2. 変数を依存配列に指定した場合

指定した変数が 変更されるたび に useEffect が再実行される。
例えば、count という useState 変数を監視すると、その値が変わるたびに useEffect 内の処理が走る。
jsx
const [count, setCount] = useState(0);

useEffect(() => {
    console.log(`countが変更された: ${count}`);
}, [count]);


3. 依存配列なし（省略）

コンポーネントが再レンダリングされるたびに毎回実行 される。
設定によっては 不要な処理が繰り返される ため、パフォーマンスの低下につながることも。
jsx
useEffect(() => {
    console.log("毎回実行される！");
});

まとめポイント
[] → 初回のみ 実行

[変数] → その変数が変更されたとき に実行

（なし）→ 毎回 実行


コンポーネントのライフサイクル;
ソフトウェア開発においてコンポーネント（特にフロントエンドのUIコンポーネントなど）が,
どのように作成され、更新され、破棄されるかの一連のプロセスのこと。

ライフサイクルの主要なフェーズ
マウント（Mount）
コンポーネントが作成され、画面に追加されるタイミング。
componentDidMount()（クラスコンポーネント）や useEffect(..., [])（関数コンポーネント）などを使用して、初期設定を行う。

更新（Update）
コンポーネントの状態（state）やプロパティ（props）が変更されるタイミング。
componentDidUpdate() や useEffect(..., [state]) を利用して、変更に応じた処理を行う。

アンマウント（Unmount）
コンポーネントが画面から削除されるタイミング。
componentWillUnmount() や useEffect のクリーンアップ処理を利用して、リソースの解放を行う。
この時に適切にリソースの解放が行われない 場合､メモリリークが発生することがあるのでクリーンアップ処理を徹底するj必要がある。

メモリリークの具体例
イベントリスナーの未解除
useEffect で登録したイベントリスナーを removeEventListener せずにコンポーネントがアンマウントすると、不要なイベントが残り続けてしまう。

非同期処理（APIコールなど）の未完了
fetch() などの非同期処理が完了する前にコンポーネントがアンマウントすると、レスポンスを処理する部分が不要になってもメモリに残る。

タイマーやインターバルの未解除
setTimeout や setInterval を clearTimeout や clearInterval せずに放置すると、コンポーネントが削除されてもタイマーが実行され続ける。


ｰｰｰuseEffectの用途・具体例ｰｰｰ
データ取得（APIコール）
コンポーネントの初回レンダリング時にAPIを叩き、データを取得する。
依存配列を指定することで、特定の状態の変更に応じてAPIリクエストを送る。
初期化処理
初回レンダリング時に一度だけ実行したい処理（イベントリスナーの設定、外部ライブラリの初期化など）。
監視処理（状態の変化を追跡）
特定の状態やプロップの変更に応じて処理を実行（データの同期、DOMの更新など）。

副作用を適切に管理しないとどうなる？
無限ループ: 副作用の中でステートを更新すると,レンダリングが繰り返される。
メモリリーク: window.addEventListener などを解除しないと,コンポーネントが削除されてもイベントが残る。
不要なAPIリクエスト: 依存配列を適切に管理しないと,毎回リクエストを送ってしまう。


基本的な使い方
useEffectは以下の形で使用します：
javascript
import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  // コンポーネントのマウント時に一度だけ実行
  useEffect(() => {
    console.log("コンポーネントがマウントされました");
  }, []);

  // countが変更されるたびに実行
  useEffect(() => {
    console.log(`カウントが変更されました: ${count}`);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>増やす</button>
    </div>
  );
}

export default App;

ｰｰｰuseEffectでAPIリクエストを実行ｰｰｰ
APIデータを取得する典型的な例：
javascript
import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    }

    fetchData();
  }, []); // 初回マウント時のみ実行

  return (
    <div>
      <h1>ユーザーリスト</h1>
      <ul>
        {users.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
}

export default Users;

ｰｰｰuseEffectのクリーンアップｰｰｰ
副作用の中には、コンポーネントのアンマウント時に処理を解除しなければならないものがあります。例えば、イベントリスナーの削除：
javascript
useEffect(() => {
  function handleResize() {
    console.log(`ウィンドウサイズが変更されました: ${window.innerWidth}`);
  }

  window.addEventListener('resize', handleResize);

  // クリーンアップ処理
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

注意点
useEffect内でデータ取得を行う際は、React Query や SWR のようなライブラリを使う方がベスト。
依存配列を適切に管理しないと、不要な再レンダリングが発生することがある。
useEffectの中でステートを頻繁に変更すると無限ループになる可能性があるため注意。


メモリリーク対策について：
プログラムが動作中に適切にメモリを解放せず、不要になったメモリ領域を占有し続けてしまう問題のことです。
これが続くと、使用可能なメモリが減少し、最終的にはシステムの動作が遅くなったり、クラッシュしたりする原因となります。

主な原因：
メモリ確保後に適切に解放しない
循環参照による解放不能
不要になったオブジェクトがガベージコレクションに回収されない

影響：
システムのパフォーマンス低下
メモリ不足によるクラッシュ
長時間動作するアプリの不安定化

プログラムを適切に設計し、定期的なメモリ管理の見直しを行うことで、メモリリークを防ぐことができます。
コードの静的解析ツールやプロファイラーを使用すると、メモリリークの検出が容易になる。

具体例：
イベントリスナーの未解除
useEffect で登録したイベントリスナーを removeEventListener せずにコンポーネントがアンマウントすると、不要なイベントが残り続けてしまう。

非同期処理（APIコールなど）の未完了
fetch() などの非同期処理が完了する前にコンポーネントがアンマウントすると、レスポンスを処理する部分が不要になってもメモリに残る。

タイマーやインターバルの未解除
setTimeout や setInterval を clearTimeout や clearInterval せずに放置すると、コンポーネントが削除されてもタイマーが実行され続ける。

対策：
クリーンアップ処理を徹底する useEffect のクリーンアップ関数を活用して、アンマウント時に不要なリソースを解放する。
jsx
useEffect(() => {
    const handleResize = () => console.log(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []);

非同期処理のキャンセル AbortController を使って不要な API コールをキャンセルする。
jsx
useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.example.com/data", { signal: controller.signal });

    return () => {
        controller.abort();
    };

useState による副作用の主な問題：
1. レンダリングの発生
useState による状態変更はコンポーネントの再レンダリングを引き起こす。
無駄なレンダリングが増えると、アプリのパフォーマンスが低下。

2. 非同期処理との絡み
状態の変更が非同期処理と組み合わさると、レースコンディション（古いデータを使って更新する問題）が発生することがある。

3. 副作用の管理が必要
例えば、useEffect を利用せずに useState で直接データ取得を行うと、再レンダリングのたびにAPIリクエストが送られる問題が起こり得る。

副作用のコントロール方法
適切な依存関係を設定

javascript
useEffect(() => {
  console.log(`カウントが変更されました: ${count}`);
}, [count]); // count の変更時のみ実行
→ 無駄な再レンダリングを防ぐ

非同期処理の管理

javascript
useEffect(() => {
  async function fetchData() {
    const response = await fetch("https://example.com/api");
    const data = await response.json();
    setData(data);
  }

  fetchData();
}, []); // 初回のみ実行
→ 毎回APIを叩かずに済む

クリーンアップ処理

javascript
useEffect(() => {
  const interval = setInterval(() => {
    console.log("毎秒実行");
  }, 1000);

  return () => clearInterval(interval); // クリーンアップ
}, []);
→ 不要な処理を削除し、メモリリークを防ぐ

結論
useStateによる状態管理は副作用を引き起こす可能性があり、それを useEffect などで適切にコントロールすることが大切です。
Reactは「副作用を明示的に管理できる」という特徴を持っているため、より予測可能なコードが書けます。