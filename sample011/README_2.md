Javascript Reacta thisの挙動 クラスコンポーネント と 関数コンポーネント 20250810

⚔️ クラスコンポーネント vs 関数コンポーネント
特徴	                クラスコンポーネント	                            関数コンポーネント（Hooks）
定義方法	           class MyComponent extends React.Component	      function MyComponent()
状態管理	           this.state + this.setState()	                       useState()
ライフサイクル管理	    componentDidMount, componentDidUpdate 等	        useEffect()
this の扱い	            必須。bind やアロー関数で制御が必要	                 不要。関数スコープで完結
可読性・簡潔さ	         冗長になりがち	                                     シンプルで読みやすい
ロジックの再利用	    HOC や render props など複雑な構造が必要	          Hooks による抽象化が可能
主な用途（現在）	    古いコードベース、特定のライブラリ依存	               新規開発、モダンな React 設計

🧠 React の設計思想：なぜ Hooks が生まれたのか？
🎯 背景
クラスコンポーネントは強力だが、複雑になりやすく、this の扱いが難しい。
ロジックの再利用が困難（HOC や render props はネストが深くなる）。
状態管理や副作用の扱いが分散し、コンポーネントが肥大化しやすい。

💡 解決策：Hooks の導入（React v16.8）
Hooks によって：
関数コンポーネントでも状態や副作用を扱えるようになった
ロジックを関数として抽出・再利用できるようになった
this の混乱を完全に排除できた

🔧 Hooks の基本一覧
Hook	          役割	                        例
useState	    状態管理	               const [count, setCount] = useState(0)
useEffect	    副作用（ライフサイクル）	useEffect(() => { ... }, [deps])
useRef	        DOM参照や値の保持	        const inputRef = useRef(null)
useContext	    グローバル状態の共有	    const theme = useContext(ThemeCtx)
useMemo	        計算結果のメモ化	        useMemo(() => expensiveFn(), [deps])
useCallback	    関数のメモ化	            useCallback(() => fn(), [deps])
useReducer	    複雑な状態管理（Redux風）	const [state, dispatch] = useReducer(...)

🧪 実例：クラス vs 関数コンポーネント
クラス版
jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return <button onClick={this.increment}>{this.state.count}</button>;
  }
}

関数版（Hooks）
jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
✅ より短く、読みやすく、this も不要！

🎯 結論：React の進化と設計思想
React は「UI を状態に応じて宣言的に描画する」ことを重視しています。 Hooks の登場によって：
状態管理が簡潔に
ロジックの再利用が柔軟に
this の混乱がなくなり、初心者にも優しく
つまり、関数コンポーネント + Hooks が現代の React の標準スタイルです。