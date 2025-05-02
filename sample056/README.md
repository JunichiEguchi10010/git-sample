React useReducer(Hooks) 20250502

複雑な状態管理をシンプルに整理するために使われます。
useState は管理が難しい状態の更新ロジックを reducer 関数に集約できるので、大規模なアプリや関連するステートが多い場合に適しています。
<!-- 複数の状態変更ロジックを1つにまとめる＝reduce(集約、削減) -->

🌟 useReducer の特徴
useState よりも 状態変更のロジックを分離しやすい
dispatch を使って状態を 意図的に変更 できる
reducer に更新のロジックを集約することで、コードの 可読性が向上
useState では扱いにくい 複雑な状態変更 を適切に管理できる


🛠 useReducer の基本構造
javascript
const [state, dispatch] = useReducer(reducer, 初期状態);

state: 現在の状態を保持する変数。
<!-- dispatch は useReducer を使うとReactによって自動的に生成される関数。 -->
dispatch: state を変更するために reducer にアクションを送る関数。
reducer: 状態の更新ロジックを含む関数（switch-case などを使う）。
初期状態: useReducer の開始時の状態（{ count: 0 } など）。

🎯 具体例：カウンターアプリ
javascript
import React, { useReducer } from "react";

// ✅ 状態更新のための関数（reducer）
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {

  // ✅ useReducer で状態管理
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>カウント: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>増やす</button>
      <button onClick={() => dispatch({ type: "decrement" })}>減らす</button>
    </div>
  );
}

export default Counter;

✨ useState vs useReducer の使い分け
状態の複雑さ	                             適したフック
単純な状態（テキスト入力, クリックカウント）	useState
複雑な状態（複数のデータ管理, 条件付き更新）	useReducer
たとえば、ECサイトのショッピングカートでは、商品の追加・削除・価格計算などの状態管理が必要なため、useReducer が適しています。

useState vs useReducer の違い
特性	                useState	                                useReducer
状態の管理	        シンプルな値（数値・文字列）	            複雑なオブジェクトや状態変更
更新方法	        setState(newValue) で直接変更	          dispatch({ type }) でアクションを送信
状態変更ロジック	 コンポーネント内に分散しやすい	reducer     関数に集約できる
推奨シーン	        単純なUI（入力フォーム、カウンター）	    大規模なアプリ（ショッピングカート、ゲーム状態）


🔹 useReducerのreducer関数の基本構造
javascript
const [state, dispatch] = useReducer(reducer, 初期状態);
第一引数のreducer は、状態変更のルールを決める関数です。

🔹 reducer 関数の詳細
reducer 関数は、現在の state と action を受け取り、新しい state を返します。
javascript
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state; // 変更がない場合はそのまま返す
  }
}

🔹 useReducer の使い方
useReducer を使って state と dispatch を取得
dispatch を使って reducer に action を送る
reducer のロジックに従って状態が更新される

javascript
import React, { useReducer } from "react";

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>カウント: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>増やす</button>
      <button onClick={() => dispatch({ type: "decrement" })}>減らす</button>
    </div>
  );
}


dispatch は ユーザーの操作（ボタンのクリックなど）を reducer に伝える役割 を持つ。
dispatch は useReducer が生成する関数 であり、内部的に reducer(state, action) を呼び出す。
つまり、「dispatchはreducerを呼び出すための仕組み」である。
dispatch を実行すると、React の内部で useReducer が reducer(state, action) を動かすため、
dispatchが直接 reducer を呼び出しているように見えない。

✅ useReducer は dispatch を内部的に生成する
✅ dispatch を実行すると reducer(state, action) が呼び出される
✅ reducer は action.type に応じて新しい state を計算し、React に返す
✅ useState との違いは、直接 state を変更するか、ルールに基づいて変更するか

✅ 複雑な状態管理 に向いている
✅ 状態変更のロジックを外部に分離 できる
✅ useState よりも 可読性が向上 する

📌 まとめ
✔ useReducer は複雑な状態管理をシンプルにする 
✔ 状態変更のロジックを reducer に集約できる 
✔ dispatch で意図的なアクションを実行 
✔ useState よりも 大規模な状態管理に適している