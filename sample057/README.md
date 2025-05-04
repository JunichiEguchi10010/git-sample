React useRef(Hooks) 20250504

DOM要素やミューテーションされる値への参照を保持するためのフックです.
useRef はただ「要素へのポインタを保持する」だけ。
実際に何かを「操作する」には、その ref.current を使って 明示的に JavaScript で命令を出す 必要があります。
「要素へのポインタを保持する」性質上、値が変わっても再レンダリングされないという特徴を利用し再レンダリングなしで値を保持する（状態のように）事からも副次的に利用される。


✅ useRefは「準備」、操作は「別」
用語	                  内容
useRef	              DOMノードを「保持」する箱（参照を作る）
ref={xxx}	            そのDOMと「関連付ける」
ref.current.xxx()	    参照を使って実際に「操作する


典型的な useRef の使われ方
やりたいこと	                    使うDOMプロパティ	                        例
カーソルを当てる（フォーカス）	    focus()	                                inputRef.current.focus()
入力値を取得する	                 value                                   inputRef.current.value
スクロールさせる	                 scrollIntoView()	                       divRef.current.scrollIntoView()
高さや位置を調べる	               getBoundingClientRect()	               ref.current.getBoundingClientRect().top
動画を再生する	                   play()	                                 videoRef.current.play()
キャンバス描画	                   getContext()	                           canvasRef.current.getContext("2d")


1. DOM要素への参照を取得する（非制御コンポーネントなど）
Reactでは通常、状態はuseStateで管理しますが、DOMの直接操作が必要な場合（例：フォーカスを当てるなど）にはuseRefを使用する。
jsx
import { useRef } from "react";

function MyComponent() {
     <!-- useRef というReactのフックを使って、「参照（ref）」をs作成、初期値として null を渡しています、初期値として null を渡しています。useRef(null) → input要素を保持する準備 -->
  const inputRef = useRef(null);

  const focusInput = () => {
       <!-- コンポーネントが表示されたときにフォーカスを当てる  inputRef.current.focus() → 実際のDOM操作 
       inputRef.current は、実際の <input> のDOM要素　その .focus() を呼ぶことで、ブラウザ上でそのinputに自動的にカーソルが入るようになる -->
    inputRef.current.focus(); // DOM要素にアクセス
  };

  return (
    <>
         <!-- 実際のDOMノードを inputRef.current に結びつける -->
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>フォーカスする</button>
    </>
  );
}
🔍 よくある落とし穴
inputRef.current が null のまま focus() を呼んでしまうとエラーになる → だから useEffect 内で呼ぶのが安全です（描画後に呼ばれるから）。
表示・非表示を切り替えるモーダルなどでは、「表示されたタイミング」で再度フォーカスしたい場合がある → そのときは条件に応じてuseEffectを工夫します。


2. 再レンダリングなしで値を保持する（状態のように）
useRefは、変更しても再レンダリングされないという特徴があります。

開発の中で「この状態は更新するけど、表示には関係ないな…」と感じたら、useRefの出番です。
jsx
import { useRef, useEffect } from "react";

function Timer() {
  const count = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      count.current += 1;
      console.log("現在のカウント:", count.current);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p>カウントはコンソールに表示されます</p>;
}

🔁 useRef vs useState
比較項目	            useRef	                            useState
再レンダリング	        値が変わっても再レンダリングされない	値が変わると再レンダリングされる
用途	                DOM参照や値の一時保存	              UIに関わる値の管理

🧠 補足ポイント
useRef()を使うと、{ current: 初期値 }という形のオブジェクトが返されます。
そのオブジェクトは永続的に同じものが使われ続ける（毎回新しく作られない）ので、タイマーや前の値の保持にも使えます。


具体的なコード例
✅ 例1：フォームのinputに自動でフォーカスを当てる（DOM参照）
jsx
import React, { useRef, useEffect } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // コンポーネントが表示されたときにフォーカスを当てる
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <h2>名前を入力してください</h2>
      <input ref={inputRef} type="text" placeholder="名前" />
    </div>
  );
}

export default AutoFocusInput;
📌 この例では、inputRef.currentを通じて<input>のDOMにアクセスし、focus()を実行しています。

✅ 例2：useRefで再レンダリングなしに値をカウント（状態管理に似た使い方）
jsx
import React, { useRef, useEffect } from 'react';

function IntervalCounter() {
  const countRef = useRef(0); // カウント用のref

  useEffect(() => {
    const interval = setInterval(() => {
      countRef.current += 1;
      console.log(`現在のカウント: ${countRef.current}`);
    }, 1000);

    return () => clearInterval(interval); // クリーンアップ
  }, []);

  return (
    <div>
      <p>カウントはコンソールに出力されます（画面には表示されません）</p>
    </div>
  );
}

export default IntervalCounter;
📌 ここではcountRefの値を更新していますが、useRefは再レンダリングを引き起こさないので、画面上には変化がありません。
必要ならuseStateと併用することもあります。



✅ 実務での主なユースケース
1. setInterval や setTimeout の中で使うカウンターや状態
例：一定時間ごとに処理するが、毎回の状態変化で再レンダリングは不要なケース
jsx
// ページ離脱警告までのカウントダウンなど
const secondsElapsedRef = useRef(0);

useEffect(() => {
  const timer = setInterval(() => {
    secondsElapsedRef.current += 1;
    // 状態更新しないから再描画されない
  }, 1000);

  return () => clearInterval(timer);
}, []);

2. 前回の値の保持（前回のpropsやstate）
例：前の値と比較して変化を検出したいけど、それ自体で再描画はしたくない場合
jsx
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

3. コンポーネントのマウント状態の管理（アンマウント後のsetState防止）
例：非同期処理中にコンポーネントがアンマウントされたかチェック
jsx
const isMounted = useRef(false);

useEffect(() => {
  isMounted.current = true;

  return () => {
    isMounted.current = false;
  };
}, []);

const fetchData = async () => {
  const data = await fetch(...);
  if (isMounted.current) {
    setData(data); // アンマウント後のsetStateを防ぐ
  }
};
4. ドラッグ操作やスクロールなど、イベント中に状態を追跡
例：マウスの位置、スクロール量などをリアルタイムで追跡（画面には表示しない）

jsx
const lastMouseX = useRef(0);

const handleMouseMove = (e) => {
  lastMouseX.current = e.clientX;
  // setStateしないからスムーズ
};

🔍 ポイントまとめ
適しているケース	                                適していないケース
UIに関係ない内部的な値の保持	                  ユーザーに見せたい状態の管理
頻繁に変わるが再描画不要な値（パフォーマンス）	    表示内容に関わるステートの管理
DOM参照、前回値、イベント中の変化の追跡など	        フォーム入力、表示制御などの状態管理




参考：
useRef は React 専用の「参照用フック」で、バニラJSのDOM参照とは役割や使い方が異なります
🔸 バニラJavaScriptでのDOM参照（命令的）
通常のJavaScriptでは、document.getElementById() や querySelector() を使ってDOMにアクセスします。

html
<input id="myInput" type="text" />
<script>
  const input = document.getElementById('myInput');
  input.focus(); // ← フォーカスを当てる
</script>
これは**命令的（imperative）**なコードで、「このIDの要素を探して操作しろ」と命令しています。

🔹 ReactでのuseRef（宣言的UIと併用）
Reactでは基本的に document.getElementById() は使わず、useRef() を使って「この要素を参照したい」と宣言的に紐づけます。
jsx
import { useRef, useEffect } from 'react';

function MyComponent() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // ← ここでDOMを操作
  }, []);

  return <input ref={inputRef} type="text" />;
}
ここでは、Reactの仮想DOMと同期する形でDOMを扱っているため、より安全で再利用性の高い書き方になります。

✅ 違いのまとめ
比較項目	                           バニラJS	                            React (useRef)
参照の方法	                        getElementById など	                useRef()
DOM取得のタイミング	                いつでも可能                       	 コンポーネントのマウント後
仮想DOM対応	                       ❌ 仮想DOMなし　　                 	 ✅ 仮想DOMと同期
Reactの流儀との整合性	              ❌ ズレやすい　	                    ✅ 宣言的な設計と調和
再レンダリング時の影響	             必要に応じて再取得	                   再レンダリングしても .current は保持される

💡 つまり
バニラJSの getElementById：その場限りの「命令」
Reactの useRef：仮想DOMと連携した「参照の約束」
Reactでは「UIは状態の結果」とする思想なので、useRef はあくまで“どうしても必要なときにだけ使う”例外的な道具です。