javascript  Reactでのthisの扱い方 20250810

⚛️ React での this の扱い方：クラスコンポーネント編
① クラスコンポーネントでは this が頻繁に登場します
jsx
class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "Taro" };
  }

  greet() {
    console.log(`Hello, ${this.state.name}`);
  }

  render() {
    return <button onClick={this.greet}>Greet</button>;
  }
}
👆 このコード、実は エラーになります。 なぜなら this.greet をイベントハンドラに渡すと、this の参照が切れるからです。

② 解決策：bind で this を固定する
jsx
<button onClick={this.greet.bind(this)}>Greet</button>
または、コンストラクタで一度だけ bind するのが一般的：

jsx
constructor(props) {
  super(props);
  this.state = { name: "Taro" };
  this.greet = this.greet.bind(this); // ✅ this を固定
}
③ さらに簡単にする方法：アロー関数でメソッド定義
jsx
class Hello extends React.Component {
  state = { name: "Taro" };

  greet = () => {
    console.log(`Hello, ${this.state.name}`);
  };

  render() {
    return <button onClick={this.greet}>Greet</button>;
  }
}
アロー関数は 外側の this（＝クラスインスタンス）を継承するので、bind 不要。

これが最近の React クラスコンポーネントでの主流スタイル。

✅ React Hooks（関数コンポーネント）では this は登場しない！
jsx
function Hello() {
  const [name, setName] = useState("Taro");

  const greet = () => {
    console.log(`Hello, ${name}`);
  };

  return <button onClick={greet}>Greet</button>;
}
関数コンポーネントでは this を使わず、状態や関数を変数として扱う。

useState や useEffect などの Hooks によって、this の混乱がなくなった。

🎯 結論：React での this の扱い
スタイル	this の扱い方	対応策
クラスコンポーネント	this が必要	bind() or アロー関数で固定
関数コンポーネント	this 不使用	Hooks で状態管理
💡 補足：なぜ関数コンポーネントが主流になったのか？
this の混乱を避けられる

よりシンプルで読みやすい

Hooks によってロジックの再利用がしやすくなった