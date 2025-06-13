React useEffectについて 0250408

useEffectとは
「副作用の処理をタイミング指定で実行する仕組み」です。

もう少しやさしく言うなら、
「描画の後にやりたいことをReactに伝える関数」とも言えます。

たとえば、

初回だけ何かしたい

状態が変わったときに何か反応させたい

外部データを取りに行きたい（API通信）

イベントリスナーの登録・解除 など…

こんな「副作用（＝レンダリング以外でやりたい処理）」をやるのが useEffect の役割です。


ポイント：
DOM操作を行う場合、useEffectを利用することで正確なタイミングで処理を行えます。

配列内に複数の値を設定することも可能で、それらの値のいずれかが変更されると処理が実行されます。


使うとき	    何が起きる？
[]  	    最初の1回だけ動く（画面が出たあと）
[何か]	    その「何か」が変わるたびに動 > この引数をusestateで管理
なし	    毎回動く（あまり使わない）

目的	                                useEffect 必要？
画面の数字を変えるだけ	               ❌ 不要（Reactが自動でやってくれる）
ブラウザのタイトル変更など副作用	    ✅ 必要（描画以外のことだから）



useEffectの使いどころ（よく使われる副作用）
① サーバーからデータを取ってくる（API通信）
jsx
コピーする
編集する
useEffect(() => {
  fetch("https://example.com/data")
    .then(res => res.json())
    .then(data => setData(data));
}, []);
初回だけデータを読みたいときによく使う。
React単体では通信できないので、副作用！

② イベントリスナーの登録・解除
jsx
コピーする
編集する
useEffect(() => {
  const handleResize = () => {
    console.log("画面サイズが変わった！");
  };

  window.addEventListener("resize", handleResize);

  return () => {
    // コンポーネントが消える時に解除！
    window.removeEventListener("resize", handleResize);
  };
}, []);
ウィンドウのリサイズやスクロール、キーボード操作などに反応したいとき。

③ ⏱setTimeout / setInterval の開始・終了
jsx
コピーする
編集する
useEffect(() => {
  const timer = setInterval(() => {
    console.log("1秒ごとに実行中…");
  }, 1000);

  return () => {
    clearInterval(timer); // コンポーネントが消えたとき止める
  };
}, []);
時間経過で何かしたいとき（時計、アニメーション、ゲームなど）

④ URLの変化を監視する（React Routerなどと組み合わせ）
jsx
コピーする
編集する
import { useLocation } from "react-router-dom";

const location = useLocation();

useEffect(() => {
  console.log("今いるページは", location.pathname);
}, [location]);
ページ移動に合わせて何かしたいときに便利！

⑤ クリーンアップ（片付け）処理
jsx
コピーする
編集する
useEffect(() => {
  console.log("マウントされた！");

  return () => {
    console.log("アンマウントされた、片付け中…");
  };
}, []);
コンポーネントが画面から消えるとき（例：モーダルを閉じる、ログアウトする など）に
何か片付ける処理を入れるのが「クリーンアップ関数」

まとめ：副作用ってどんなこと？
種類	                よくある例	                            備考
通信系	            fetch, axios でデータ取得	            初回ロードに多い
イベント系	         resize, scroll, keydownなど	        登録＋解除セット
タイマー系	         setTimeout, setInterval	            アニメ・カウントダウン
外部API	            Google Maps, Stripe, Firebase など      外部サービス連携時
クリーンアップ	     ログ出力, タイマー解除, イベント解除など	return で指定する


useEffectとasync/awaitとの比較

共通点
特徴	                                        useEffect	                    async/await
処理のタイミングをコントロールする	                ✅	                            ✅
非同期処理（サーバー通信など）に使える	            ✅                              	✅
複数の処理を順番に実行できる	                    ✅（中で使えば）	                ✅

❗ 違い（大事）
観点                                        	useEffect                                        async/await
いつ実行されるか決まってる？	        ✅「描画後」「状態が変わった時」など自動で実行される    ❌ 実行するタイミングは自分で呼び出す必要がある
Reactの再描画と連動している？       	✅ めちゃくちゃ密接に関係してる	                     ❌ 全く関係ない（ただのJSの機能）
副作用に特化してる？	                ✅ 「画面の外のこと」をするための仕組み	              ❌ 特化していない（汎用的）

「async/awaitは中身の制御」
「useEffectは“いつやるか”の制御」


マウントとレンダリングの違い
マウント時
初回のみ:コンポーネントが初めてDOMに追加されるタイミングを指します。

この時に初期化処理が行われます。

useEffectで依存配列を空にする ([]) と、初回の「マウント時」のみ実行されます。
(初回のデータフェッチやDOM操作など。)

例:
jsx
useEffect(() => {
  console.log("コンポーネントがマウントされました！");
}, []);
レンダリング時
再描画を含むすべての描画：コンポーネントが再レンダリングされるたびに処理が発生します（例えば、状態やプロパティが変更された場合）。

「初回のマウント」も「レンダリング」の一部に含まれますが、再描画（Update）とは異なります。

レンダリング時は必ずしもuseEffectがトリガーされるわけではありません。

マウントとレンダリングの違いをまとめると:
項目	                    マウント時	                            レンダリング時
発生タイミング	        初回のDOM生成時	                          初回の描画 + 状態/プロパティ変更時
useEffect適用例	        useEffect(() => {...}, [])              状態/プロパティ依存で変化を検知
主な用途	            初期化処理、データフェッチ、イベント登録	再描画を伴う処理の制御



usestateとuseEffectの活用例:
javascript
useEffect(() => {
  console.log(`カウントが${count}に変更されました。`);
}, [count]);
; 第2引数にuseStateの状態管理をする引数を入れる、この場合は[count]

目的:
ReactのuseEffectフックを使用して、countという変数が変更された際に処理を実行する仕組みを作っています。
コンソールにログを出力する例です。

動作:
useEffect内で実行されるコード (console.log) は、countの値が変更されるたびにトリガーされます。
第二引数として渡された[count]が監視対象です。この配列に記載された変数が変更されると、useEffectが再実行されます。

出力の内容:
実際にcountの値が変更されるたびに、コンソールに「カウントがXに変更されました。」という形でログが表示されます（Xはcountの現在値）。



Reactでよく使う機能、useEffectについて解説
https://www.youtube.com/watch?v=8tau_Wfo648