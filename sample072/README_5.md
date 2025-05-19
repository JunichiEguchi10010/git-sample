React Props（プロパティ）とスプレッド構文について 20250519

Props（プロパティ）は、Reactコンポーネントにデータを渡すための仕組みです。
親コンポーネントから子コンポーネントに情報を渡し、動的に表示できるようになります。


Reactでは、親コンポーネントがキー（プロパティ）を使ってバリュー（値）を子コンポーネントに渡す という仕組みになっています。
この考え方は、Reactの 「単方向データフロー」 に基づいており、親から子へデータを渡すのが基本です。

🔹 Reactの Props（キーとバリュー）の関係

子コンポーネント（propsを受け取って表示）
const ChildComponent = ({ name }) => {
  return <h1>Hello, {name}!</h1>; 
};

親コンポーネント（子コンポーネントにpropsを渡す）
const ParentComponent = () => {
  return <ChildComponent name="Junichi" />;
};

✅ キー (name) → name="Junichi" の "name" は プロパティ（キー）
✅ バリュー ("Junichi") → name="Junichi" の "Junichi" は 値（バリュー）
✅ParentComponent は ChildComponent を呼び出し ます。
✅ChildComponent は name="Junichi" のデータを受け取ります。
✅ 子コンポーネントが { name } を使って値を受け取り"Junichi" を表示します。


🔹 Propsの基本構文
親コンポーネントからデータを渡す
子コンポーネントが受け取って表示する

javascript
import React from "react";

// ✅ 子コンポーネント（Propsを受け取る側のコード）
const Greeting = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

// ✅ 親コンポーネント（Propsを渡す側のコード）
const App = () => {
  return <Greeting name="Junichi" />;
};

export default App;

🔹 Propsのポイント
✅ name というプロパティを親コンポーネントから渡している
✅ 子コンポーネント Greeting は { name } を使って値を取得
✅ Greeting name="Junichi" のように記述すれば、動的に変更可能

🔹 複数のPropsを渡す
javascript
const UserCard = ({ name, age }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>年齢: {age}歳</p>
    </div>
  );
};

const App = () => {
  return <UserCard name="Junichi" age={30} />;
};

export default App;

✅ 複数の値を渡す場合は、name や age などのPropsを設定するだけ！

🔹 Propsのデフォルト値を設定
javascript
const Greeting = ({ name = "Guest" }) => {
  return <h1>Hello, {name}!</h1>;
};

const App = () => {
  return (
    <>
      <Greeting name="Junichi" />
      <Greeting /> {/* デフォルト値 "Guest" が適用される */}
    </>
  );
};

export default App;

✅ Propsが渡されない場合、デフォルト値 "Guest" を適用！

🚀 Propsを使うメリット
再利用性の向上 → 1つのコンポーネントを異なるデータで使える
動的なレンダリング → 変数を渡して動的なUIを作成可能
コンポーネントの分割が容易 → シンプルなコード構成で管理しやすい


🔹 拡張した例(useState)
javascript
<!-- 子コンポーネント -->
import { useState } from "react";

const ChildComponent = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

<!-- 親コンポーネント -->
const ParentComponent = () => {
  const [username, setUsername] = useState("Junichi");

  return <ChildComponent name={username} />;
};

export default ParentComponent;

✅ useState を使うことで、親コンポーネントの状態に応じて子の表示を変えられる。




🔹🔹🔹Reactで useState を使い､配列・オブジェクトをPropsとして渡すケース🔹🔹🔹


🔹 ① 配列（Array）を useState で管理
配列のデータを useState で管理し、ボタンを押してアイテムを追加できるようにします。

javascript
import { useState } from "react";

const ItemList = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

const App = () => {
  const [fruits, setFruits] = useState(["Apple", "Banana", "Cherry"]);

  const addFruit = () => {
    setFruits([...fruits, "Orange"]); // 配列を更新
  };

  return (
    <>
      <ItemList items={fruits} />
      <button onClick={addFruit}>フルーツを追加</button>
    </>
  );
};

export default App;

✅ useState で配列を管理し、状態を変更できるように！
✅ ボタンをクリックすると Orange が追加される！

🔹 ② オブジェクト（Object）を useState で管理
オブジェクトのデータを useState で管理し、ボタンを押して情報を更新できるようにします。

javascript
import { useState } from "react";

const UserProfile = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>年齢: {user.age}歳</p>
      <p>住んでいる場所: {user.location}</p>
    </div>
  );
};

const App = () => {
  const [userInfo, setUserInfo] = useState({ name: "Junichi", age: 30, location: "Tokyo" });

  const updateLocation = () => {
    setUserInfo({ ...userInfo, location: "Osaka" }); // オブジェクトの一部を更新
  };

  return (
    <>
      <UserProfile user={userInfo} />
      <button onClick={updateLocation}>住んでいる場所を変更</button>
    </>
  );
};

export default App;

✅ useState でオブジェクトを管理し、情報の更新が可能！
✅ ボタンをクリックすると "Tokyo" → "Osaka" に変更される！

🔹 ③ 配列＋オブジェクトの組み合わせ
オブジェクトを含む配列を useState で管理し、新しい商品を追加できるようにします。

javascript
import { useState } from "react";

const ProductList = ({ products }) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} - {product.price}円
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [productData, setProductData] = useState([
    { id: 1, name: "ノートPC", price: 120000 },
    { id: 2, name: "スマートフォン", price: 80000 },
    { id: 3, name: "タブレット", price: 60000 },
  ]);

  const addProduct = () => {
    setProductData([...productData, { id: productData.length + 1, name: "ヘッドフォン", price: 15000 }]);
  };

  return (
    <>
      <ProductList products={productData} />
      <button onClick={addProduct}>商品を追加</button>
    </>
  );
};

export default App;

✅ useState で オブジェクトの配列 を管理し、商品を追加可能！
✅ ボタンをクリックすると "ヘッドフォン" が追加される！

🚀 まとめ
✅ データを動的に更新したい → useState を使うのが一般的！
✅ 配列なら setState([...配列, 新しい要素]) で追加
✅ オブジェクトなら setState({ ...オブジェクト, 更新プロパティ }) で更新


🔹スプレッド構文 ...について
setFruits([...fruits, "Orange"]); // 配列を更新
setUserInfo({ ...userInfo, location: "Osaka" }); // オブジェクトの一部を更新
setProductData([...productData, { id: productData.length + 1, name: "ヘッドフォン", price: 15000 }]);

スプレッド構文 ... を使うことで、既存のデータをコピーしつつ、新しいデータを追加・更新できるようになります。
 これは、Reactの useState では元の状態を直接変更せず、新しい状態を作成して更新するという原則に基づいています。

 
 🔹 配列の更新（setFruits([...fruits, "Orange"])）
javascript
setFruits([...fruits, "Orange"]);
✅ ...fruits → 既存の配列をコピー
✅ "Orange" → 新しい要素を追加
✅ setFruits → 新しい配列を状態に適用

ポイント: Reactでは状態を直接変更すると正しく再レンダリングされないため、 新しい配列を作って setFruits で更新する必要があります！

📌 直接変更NG ❌
javascript
fruits.push("Orange");  // 状態が変更されてもReactが検知できない

📌 正しい方法 ✅
javascript
setFruits([...fruits, "Orange"]); // 新しい配列を作成して更新！

🔹 オブジェクトの更新（setUserInfo({ ...userInfo, location: "Osaka" })）
javascript
setUserInfo({ ...userInfo, location: "Osaka" });
✅ ...userInfo → 既存のオブジェクトをコピー
✅ location: "Osaka" → プロパティを上書き
✅ setUserInfo → 新しいオブジェクトを状態に適用

📌 直接変更NG ❌
javascript
userInfo.location = "Osaka"; // 直接変更すると状態が更新されない！

📌 正しい方法 ✅
javascript
setUserInfo({ ...userInfo, location: "Osaka" }); // 新しいオブジェクトとして更新！

🔹 配列＋オブジェクトの更新
javascript
setProductData([...productData, { id: productData.length + 1, name: "ヘッドフォン", price: 15000 }]);
✅ ...productData → 既存の配列をコピー
✅ { id: ..., name: "ヘッドフォン", price: 15000 } → 新しいオブジェクトを追加
✅ setProductData → 新しい配列を状態に適用

📌 直接変更NG ❌
javascript
productData.push({ id: ..., name: "ヘッドフォン", price: 15000 }); // 直接変更はNG！

📌 正しい方法 ✅
javascript
setProductData([...productData, { id: ..., name: "ヘッドフォン", price: 15000 }]); // 新しい配列として更新！

💡 スプレッド構文 (...) を使う理由
元のデータを変更せずに新しいデータを作成できる
Reactのレンダリングが正しく動作する
不変性を保ちつつ、新しい状態を適用できる

Reactでは状態の変更を検知して再描画するため、 新しい配列・オブジェクトを作成し、状態を更新する必要があります！



【React入門】完全初心者OK！１から簡単なTodoアプリを作ってReactの１歩を踏み出してみよう ~Reactチュートリアル~
https://www.youtube.com/watch?v=nRCNL9T3J98
