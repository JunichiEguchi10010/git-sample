React 「ラッパーコンポーネント」や「レイアウト枠」 20250609
「ラッパーコンポーネント」や「レイアウト枠」は、共通の見た目や構造を再利用するためのテクニックです。

✅ ラッパーコンポーネント（Wrapper Component）とは？
他のコンポーネントや要素を包む（ラップする）ためのコンポーネントのことです。
主に「レイアウト共通化」や「スタイル統一」「ロジック共有」を目的に使われます。

🔧 定義まとめ：
ラッパーコンポーネントとは：
子要素（children）を受け取り、
それを特定の構造・スタイル・機能でラップして、
再利用可能な形で抽象化したコンポーネントです。

🧱 具体例①：カードのラッパー
//子コンポーネント
jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

//親子コンポーネント
function App() {
  return (
    <Card>
      <h2>プロフィール</h2>
      <p>こんにちは、Reactを学んでいます！</p>
    </Card>
  );
}

🔍 解説
Card が ラッパーコンポーネントです。
<Component>と</Component> の間に書かれた内容を指す、特別なプロパティ名です。
この場合はCard
children を div.card の中に包み込むことで、どんな中身でもカード風に表示できます。
💡 メリット：中身を自由に差し替えつつ、共通のスタイルで表示できる。



🧱 具体例②：ページ全体のレイアウト枠
jsx
//親コンポーネント
Layoutは「全体の枠（レイアウト）」を定義する親コンポーネントです。
header、main、footerの3つのセクションを用意しています。
mainの中にある{children}が、子コンポーネントの中身が入る場所です。

function Layout({ children }) {
  return (
    <div className="layout">
      <header>ヘッダー</header>
      <main>{children}</main>
      <footer>フッター</footer>
    </div>
  );
}

// 子コンポーネント
HomePageは個別ページの中身（子コンポーネント）です。
<Layout>で囲んでおり、この中身（<h1>と<p>）が親のchildrenとして渡されます。

function HomePage() {
  return (
    <Layout>
      <h1>トップページ</h1>
      <p>ようこそReactの世界へ！</p>
    </Layout>
  );
}

🔍 解説
Layout は レイアウト枠のコンポーネントです。
children を <main> に入れて、ヘッダーとフッターを共通表示します。
💡 メリット：ページごとに中身を変えても、枠（レイアウト）は共通に保てる！

🧱 具体例③：モーダルのラッパー
jsx
function Modal({ children }) {
  return (
    <div className="modal-background">
      <div className="modal-content">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Modal>
      <h2>確認</h2>
      <p>本当に削除してもよろしいですか？</p>
      <button>はい</button>
    </Modal>
  );
}
🔍 解説
Modal コンポーネントが ラッパーであり、ポップアップ表示の枠です。
中身（children）はどんな内容でもOKです。

💡 メリット：モーダルの中身だけを自由に変えられる！

📌「ラッパーコンポーネント」「レイアウト枠」のまとめ
用語	                                説明
ラッパーコンポーネント	        children を受け取り、見た目の共通スタイルで囲むコンポーネント
レイアウト枠	               ページ全体の構造（ヘッダー・フッター・メイン領域など）を整えるラッパー

✅ どう使い分ける？
✔ 共通スタイルを与えたいとき → ラッパーコンポーネント（例：Card, Panel, Box）
✔ 共通構造を与えたいとき → レイアウト枠（例：Layout, PageTemplate）
