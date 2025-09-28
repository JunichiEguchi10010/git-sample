react react-router-dom next.js PagesRouter AppRouter 違い 20250926

🧪 バージョンと移行の注意点
バージョン	    状態
v12以前	    Pages Routerのみ
v13.0〜13.3	App Routerは試験的（experimental）
v13.4以降	  App Routerが正式安定版として利用可能
v14以降	    App Routerが推奨構成（Pages Routerも併用可能）

🧭 Pages Router vs App Router vs React 単体
項目	                  Pages Router（Next.js）	          App Router（Next.js）	                          React 単体
導入バージョン	      v1〜v12（v13でも利用可）	            v13.4〜（正式安定）	                        常に自由（React自体はルーティングを持たない）
ディレクトリ構成	    pages/	                             app/（+ layout.tsx）	                      src/ や自由な構成
ルーティング方式	    ファイルベース（自動）	              ファイルベース（自動＋柔軟）	                手動定義（react-router-domなど）
ルートページ	        pages/index.tsx → /	                app/page.tsx → /	                          <Route path="/" element={<Home />} />
レイアウト管理	      各ページで共通レイアウトを手動設定	   layout.tsx によるネスト可能な共通レイアウト	  <Layout> を自作して各ページにラップ
データフェッチ	      getStaticProps, getServerSideProps	fetch + async（RSC対応）	                  クライアント側で useEffect + fetch
クライアント/サーバー分離	すべてクライアント	               use client で明示（デフォルトはサーバー）    すべてクライアント（SSRなし）
ページ遷移	          自動的に <Link> で最適化	            同上＋loading.tsx などで遷移演出	          <Link> で手動制御（SPA）
SEO対応	             SSR/SSGで対応可能	                  SSR/SSG＋RSCで柔軟対応	                    基本的に非対応（SPAのみ）
サーバー機能	        API Routes（pages/api）	            app/api + RSC + Edge対応	                  なし（別途Expressなどが必要）
状態管理	            Reactと同様（自由）	                 Reactと同様（自由）	                        Reactと同様（自由）
ファイルとURLの関係	  明確（pages/about.tsx → /about）	   明確かつ柔軟（app/about/page.tsx → /about）	無関係（URLはコードで定義）
初心者への教育適性	  シンプルで直感的	                    構造的でテンプレート化しやすい	              自由度が高く構造理解が必要


ディレクトリ構造の違い
✅ React + react-router-dom の典型的なディレクトリ構造
src/
├── App.tsx               // ルーティング定義（<Routes>）
├── index.tsx             // エントリーポイント（ReactDOM.render）
├── pages/                // ページコンポーネント群（URLに対応）
│   ├── Home.tsx          // → /
│   ├── About.tsx         // → /about
│   └── BlogPost.tsx      // → /blog/:slug
├── components/           // 再利用可能な部品
│   └── Header.tsx
│   └── Footer.tsx

対応するルーティング定義（App.tsx）
tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}


✅next Pages Router（従来型）
コード
pages/
├── index.tsx       → /
├── about.tsx       → /about
├── blog/[slug].tsx → /blog/xxx

🧭 Next.js Pages Router の対応ルーティング定義（擬似コード）
tsx
// pages/index.tsx
// → URL: /
export default function Home() {
  return <h1>ホームページ</h1>;
}

// pages/about.tsx
// → URL: /about
export default function About() {
  return <h1>アバウトページ</h1>;
}

// pages/blog/[slug].tsx
// → URL: /blog/任意のslug（例: /blog/hello-world）
import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  return <h1>ブログ記事: {slug}</h1>;
}
🔍 ポイント
pages/ 配下のファイル名がそのまま URL にマッピングされる。
[slug].tsx のような 角括弧構文で動的ルートを定義できる。
useRouter() を使って URL パラメータ（例: slug）を取得する。

🧠 補足
React 単体では <Route path="/about" element={<About />} /> のように 手動定義が必要。
Pages Routerでは ファイル名がルートになるため、構造が直感的。
App Routerでは page.tsx がルート定義になるが、layout.tsx との組み合わせで責務分離が進む。



✅next 14～ App Router（新構成）
コード
app/
├── layout.tsx      → 全体レイアウト
├── page.tsx        → /
├── about/
│   ├── layout.tsx  → /about 用レイアウト
│   └── page.tsx    → /about
├── blog/
│   └── [slug]/
│       └── page.tsx → /blog/xxx

❓ app/page.tsxがルート (/) ページと決まっているのですか？
はい、Next.js の App Router構成（app/ ディレクトリを使う構成）では、app/page.tsx が ルート (/) ページとして自動的に扱われます。
これは Next.js の仕様で、特別な設定をしなくても以下のようにマッピングされます：

✅ デフォルトのルーティングルール（App Router）
ファイルパス	                URLパス
app/page.tsx	            /（ルート）
app/about/page.tsx	        /about
app/blog/page.tsx	        /blog
app/blog/[slug]/page.tsx	/blog/任意のslug（動的ルート）

✅ なぜ app/page.tsx が / になるのか？
Next.js の App Router は、app/ ディレクトリ内の構造をそのまま URL にマッピングします。 
そのため、app/page.tsx は app ディレクトリ直下にある「ページファイル」であり、URL ルート / に対応します。

✅ よくある誤解との違い
pages/index.tsx → /（Pages Router構成）
app/page.tsx → /（App Router構成）
つまり、Pages Routerでは pages/index.tsx がルート、 App Routerでは app/page.tsx がルートです。

App Routerでは、ファイル構造がそのままルーティングに反映されるため、React単体やPages Routerと違って、コード内で <Route> を書く必要はありません。
ただし、初心者教育では「どのファイルがどのURLに対応するか」を明示することが重要です。

🧭 App Router 対応ルーティング定義（擬似コード）
tsx
// app/page.tsx
// → URL: /
export default function HomePage() {
  return <h1>ホームページ</h1>;
}

// app/about/page.tsx
// → URL: /about
export default function AboutPage() {
  return <h1>アバウトページ</h1>;
}

// app/blog/[slug]/page.tsx
// → URL: /blog/任意のslug（例: /blog/hello-world）
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // 例：データ取得（RSC対応）
  const post = await fetch(`https://example.com/api/posts/${slug}`).then(res => res.json());

  if (!post) return notFound();

  return <h1>{post.title}</h1>;
}

🧩 layout.tsx の役割（責務分離）
tsx
// app/layout.tsx
// → 全ページ共通レイアウト（例：ヘッダー、フッター）
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
tsx
// app/about/layout.tsx
// → /about 専用レイアウト（例：サイドバー付きなど）
export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="about-layout">
      <Sidebar />
      <main>{children}</main>
    </section>
  );
}
🧠ポイント
App Routerでは params を使って動的ルートを扱い、layout.tsx で責務分離を明示できるため、構造的な教育テンプレート設計に最適です。
notFound() や loading.tsx などの補助ファイルも、UXと構造理解を深めるポイントになります。


✅ Next.js（App Router）と React単体 の違い
比較項目	        Next.js（App Router）	                    React 単体
ルーティング	    ファイルベース（app/page.tsx → /）	        自分でルーティング設定（react-router-domなど）
ページ定義	        app/about/page.tsx → /about	              <Route path="/about" element={<About />} /> のように手動定義
ディレクトリ構造	app/ 配下の構造がそのまま URL に反映される	 src/ や components/ に自由に配置、URLとは無関係
自動ルート生成	    あり（ファイル名で決まる）	                 なし（コードで定義）
サーバー機能	    SSR, API routes などが統合	                React 単体では持たない（別途構築が必要）

🔍 具体例で比較
Next.js（App Router）
tsx
// app/page.tsx
export default function Home() {
  return <h1>トップページ</h1>;
}
// → URL: https://example.com/
React（react-router-dom）
tsx
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

🧠 補足
React 単体では「ルートの定義はコードで行う」ため、初心者には「URLとファイル構造が一致しない」ことが混乱の元になります。
Next.js（App Router）は「ファイル構造＝URL構造」なので、直感的です。
「Reactは自由度が高いが構造が見えにくい」「Next.jsは構造が制約されるが直感的」と考えると理解が深まります。

✅ Next.js App Router と Pages Router の違い

🧭 App Router vs Pages Router：概要比較
項目	                    Pages Router	App Router
導入バージョン	            Next.js v1〜v12（v13でも使える）	      Next.js v13 以降（正式安定は v13.4）
ディレクトリ	            pages/	                                 app/
ルーティング方式	        ファイルベース（pages/index.tsx → /）	  同じくファイルベース（app/page.tsx → /）だが、より柔軟
レイアウト管理	            各ページで共通レイアウトを手動で設定	    layout.tsx によるネスト可能なレイアウト構造
データフェッチ	            getStaticProps, getServerSideProps	    fetch + async 関数（React Server Components）
クライアント/サーバー分離	明示的にすべてクライアント	                use client ディレクティブで制御可能（デフォルトはサーバー）
特徴	                   シンプルで慣れ親しんだ構造	              柔軟・モダン・RSC対応・レイアウト再利用が容易

🧩 ディレクトリ構造の違い
Pages Router（従来型）
コード
pages/
├── index.tsx       → /
├── about.tsx       → /about
├── blog/[slug].tsx → /blog/xxx

App Router（新構成）
コード
app/
├── layout.tsx      → 全体レイアウト
├── page.tsx        → /
├── about/
│   ├── layout.tsx  → /about 用レイアウト
│   └── page.tsx    → /about
├── blog/
│   └── [slug]/
│       └── page.tsx → /blog/xxx

🧠 ポイント
Pages Router は「React に近い」感覚で、初心者にはわかりやすいが、レイアウトの再利用やサーバー処理が複雑。
App Router は「構造が明示的」で、教育テンプレート化しやすい。
特に layout.tsx による共通構造の分離は理想的。

補足
App Routerは「構造と責務の分離」がしやすく（例：layout.tsx にナビゲーション、page.tsx に機能）設計するのに最適。
use client によるクライアントコンポーネントの明示は、デジタル安全性やパフォーマンス設計にも応用可能。
Pages Routerは「Reactの延長」として理解しやすいが、構造の再利用やスケーラビリティに限界がある。


🔀 混同が起きやすい理由
① 同じ「React」なのに構成が違う
React 単体 → 自由すぎて構造が見えない
Next.js Pages Router → Reactに近いが、ルートが自動生成される
Next.js App Router → 構造が厳密で、責務分離が進んでいる
初心者は「Reactで作ってるんでしょ？」と思いがちですが、Next.jsはReactの上に構造とルールを追加したフレームワークです。

② ファイル名とURLの関係が違う
構成	        /about に対応するファイル
React 単体	    <Route path="/about" element={<About />} />（手動）
Pages Router	pages/about.tsx（自動）
App Router	    app/about/page.tsx（自動＋レイアウト分離）
初心者は「ファイル名がURLになるの？」と驚きます。
React単体ではならないので、Next.jsとの違いが混乱の元です。

③ 「page.tsx」が何を意味するかが変わる
React単体では「page.tsx」はただのコンポーネント
App Routerでは「page.tsx」はURLに対応するページ定義
Pages Routerでは「index.tsx」がルートページ
この違いは、最も重要な混同ポイントです。

🧠 ポイント
初心者にはまず「React単体 → Pages Router → App Router」の順で構造を見せると理解が進みます。
「Reactは自由、Pages Routerは自動、App Routerは構造的」と3段階で整理すると、混乱が減ります。
「page.tsx は Next.js App Router だけの特別な意味を持つ」と明示すると、誤解を防げます。

✅　見分ける確認手順
「これはReact単体？Pages Router？App Router？」と迷ったときに、構成を見分けるための確認手順を以下に整理しました。

✅ React / Pages Router / App Router を見分ける確認手順

🔍 ステップ①：ディレクトリ構造を確認する
見つけたディレクトリ	                        判定
src/ のみで pages/ や app/ がない	        React 単体
pages/ がある（index.tsx, about.tsx など）	Pages Router
app/ がある（page.tsx, layout.tsx など）	App Router
💡補足：app/ と pages/ が両方ある場合 → Next.js のハイブリッド構成（App Router優先）

🔍 ステップ②：ルーティングの定義方法を確認する
ファイルベースで自動ルーティングされているか？
pages/index.tsx → / に対応 → Pages Router
app/page.tsx → / に対応 → App Router
react-router-dom を使って <Route path="..." /> がある → React 単体

🔍 ステップ③：レイアウトの管理方法を確認する
特徴的なファイル	    判定
layout.tsx がある → App Router（ネスト可能なレイアウト）
共通レイアウトが _app.tsx にある → Pages Router
<Layout> を自作して各ページにラップ → React 単体

🔍 ステップ④：データフェッチの方法を確認する
使用されている関数	                        判定
getStaticProps, getServerSideProps      → Pages Router
async + fetch（React Server Component） → App Router
useEffect + fetch                       → React 単体（クライアントのみ）

🔍 ステップ⑤：package.json の依存関係を確認する
ライブラリ	                    判定
next がある                 → Next.js（Pages or App Router）
react-router-dom がある     → React 単体
next かつ app/ 構成         → App Router（v13.4以降）

❓ 各versionの違いによる混同ポイントはありますか？
Next.js のバージョンごとの違いは非常に混乱しやすいポイントです。
特に、v12 → v13 → v14以降で構造や思想が大きく変化しており、同じ「Next.js」でもまったく別物に見えることがあります。

⚠️ バージョンによる混同ポイント一覧
バージョン	        主な特徴	                                                 混同ポイント
v12以前	        Pages Routerのみ。pages/構成。	                            「Next.jsはReactと同じ」と誤解されやすい。App Routerが存在しないため、後の構造と比較できない。

v13.0〜13.3	    App Routerが「試験的」導入。app/構成は unstable。	            app/を使っても動かないことがある。公式ドキュメントと挙動が一致しない。初心者が「壊れてる？」と混乱。

v13.4	        App Routerが正式安定版に。RSC（React Server Components）対応。  page.tsx や layout.tsx の意味が激変。Pages Routerとの違いが曖昧になりやすい。

v14以降	App Routerが推奨構成に。Pages Routerは後方互換。	                   両方使えるため「どっちを使えばいいの？」と迷う。プロジェクトによって構成が混在しやすい。

🔀 よくある混乱例
① pages/index.tsx と app/page.tsx の違いがわからない
→ 「どっちがルートページなの？」と混乱 → 「Pages Routerならindex.tsx」「App Routerならpage.tsx」と明示する必要あり

② getStaticProps が使えない（App Routerでは非対応）
→ 「公式のサンプル通りに書いたのにエラーになる！」 → App Routerでは getStaticProps は使えず、代わりに fetch + async を使う必要がある

③ use client の意味がわからない
→ App Routerではデフォルトがサーバーコンポーネント。
クライアント側で動かすには use client が必要 → 「ReactなのにuseEffectが動かない」と混乱

④ layout.tsx の責務が不明
→ Pages Routerでは _app.tsx が共通レイアウトだったが、App Routerでは layout.tsx が階層ごとに必要 → 「どこにナビゲーション書けばいいの？」と迷う

🧠 補足
「Next.js v13.4以降はApp Routerが主流」と明示し、Pages Routerは「後方互換」として扱うと構造が整理されます。
use client の有無、getStaticProps の使用可否、layout.tsx の階層構造などをテンプレート化すると、構成の違いが視覚的に理解できます。

まとめ
✅ Next.js バージョン別構成診断テンプレート
🧭 ステップ①：プロジェクト構造を確認
見つけたディレクトリ	判定	                  対応バージョン
pages/ のみ	Pages   Router	                   v1〜v12（v13でも可）
app/ のみ	        App Router	               v13.4〜（正式安定）
pages/ + app/       両方	ハイブリッド構成	v13〜v14（移行期）

🧭 ステップ②：ルーティング定義の違い
構成	        ファイル → URL	定義方法
Pages Router	pages/index.tsx → /	自動
App Router	    app/page.tsx → /	自動（layout分離）
React 単体	    src/pages/Home.tsx → / ではない	手動（<Route path="/" />）

🧭 ステップ③：レイアウトの責務分離
構成	        共通レイアウト	          ページごとのレイアウト
Pages Router	_app.tsx	           各ページで手動ラップ
App Router	    layout.tsx（階層ごと）	about/layout.tsx など
React 単体	    <Layout> を自作	        各ページでラップ

🧭 ステップ④：データフェッチの違い
構成	            方法	                            SSR/SSG対応
Pages Router	getStaticProps, getServerSideProps	    ✅
App Router	    async + fetch（RSC）	                ✅（より柔軟）
React 単体	    useEffect + fetch	                    ❌（CSRのみ）

🧭 ステップ⑤：混同ポイントと注意点
混同ポイント	                説明
page.tsx の意味	            App Routerのみの概念。Pages Routerには存在しない
getStaticProps が使えない	App Routerでは非対応。代わりに fetch を使う
use client の必要性	        App Routerではデフォルトがサーバー。クライアント動作には明示が必要
layout.tsx の階層構造   	App Routerではページごとに分離可能。Pages Routerにはない概念

🧠 補足
初心者には「Pages Router → App Router → React単体」の順で構造を見せると理解が進む。
「ファイル名がURLになるのはNext.jsだけ」「Reactはコードでルート定義」と明示する。
App Routerでは「構造・責務・感情」を分離できるため、教育テンプレート化に最適。


✅ Next.jsのpage Router App Routerの違い

🏗️ 1. 構造の違い：pages/ vs app/

項目	App Router導入前 (pages/)	App Router導入後 (app/)
ディレクトリ	                        pages/	                        app/
ルーティング	                ファイルベース（URL = ファイル名）	同じくファイルベースだが、レイアウトやテンプレートが階層的に管理可能
ページ定義	                  pages/index.tsx, pages/about.tsx	app/page.tsx, app/about/page.tsx
レイアウト	                  _app.tsx, _document.tsx に集約	  layout.tsx を各階層に定義可能（ネスト可能）
デフォルトのコンポーネント種別	クライアントコンポーネント	        サーバーコンポーネント

⚙️ 2. 機能の違い：状態管理・データ取得・最適化
機能	                          pages/	                                      app/
クライアント/サーバー分離	        すべてクライアント	                         明示的に "use client" を書かない限りサーバー
データ取得	                    getServerSideProps, getStaticProps など	    直接 fetch() や DBアクセスが可能（サーバーコンポーネント内）
レンダリング	                  クライアント中心	                            サーバー中心（Streaming SSR 対応）
状態管理	                      useState, useEffect など	                  クライアントコンポーネントでのみ使用可能
キャッシュ	                    明示的に revalidate などで制御	              自動キャッシュ + 柔軟な再検証が可能

🧠 3. 哲学の違い：責務の分離と最適化
App Router導入前（pages/）
・すべてがクライアント中心：状態管理もデータ取得もJSバンドルに含まれる
・SSRやISRは補助的：明示的に関数を書く必要がある
・構造がフラット：レイアウトやテンプレートの再利用が難しい

App Router導入後（app/）
・責務の分離が明確：
・UI描画 → サーバーコンポーネント
・ユーザー操作・状態管理 → クライアントコンポーネント
・Streaming SSRによる高速表示：部分的に読み込みながら描画可能
・再利用性の向上：layout.tsx や template.tsx による構造的な再利用
・設計思想の変化：React Server Components（RSC）を前提とした構成

📦 具体例：Todoアプリの構成比較

✅ pages/構成（旧）
tsx
// pages/index.tsx
import { useState, useEffect } from "react";
import { getTodos } from "../lib/api";

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return <TodoList todos={todos} />;
}

// pages/index.tsx

// ReactのuseStateとuseEffectをインポート
// useState: 状態（データ）を管理するためのフック
// useEffect: コンポーネントのライフサイクルに応じて処理を実行するためのフック
import { useState, useEffect } from "react";

// Todoデータを取得する関数をインポート（API呼び出し用）
import { getTodos } from "../lib/api";

// Homeコンポーネント（トップページ）を定義
export default function Home() {
  // todosという状態変数を定義（初期値は空の配列）
  // setTodosはtodosを更新するための関数
  const [todos, setTodos] = useState([]);

  // コンポーネントが表示されたときに一度だけ実行される処理
  // useEffectの中でTodoデータを取得し、状態にセットする
  useEffect(() => {
    // 非同期でTodoデータを取得し、取得後にsetTodosで更新
    getTodos().then(setTodos);
  }, []); // 空の配列を渡すことで「初回のみ実行」になる

  // TodoListコンポーネントに取得したtodosを渡して表示
  return <TodoList todos={todos} />;
}

🧠 補足ポイント
useState([]) → 「最初は空っぽのTodoリスト」
useEffect(() => {...}, []) → 「ページが表示されたときに一度だけ実行」
getTodos().then(setTodos) → 「APIからデータを取ってきて、表示用に保存」


✅ app/構成（新）
tsx
// app/page.tsx（サーバーコンポーネント）
import { getTodos } from "../lib/api";
import TodoList from "./TodoList";

export default async function Home() {
  const todos = await getTodos(); // サーバーで直接取得
  return <TodoList todos={todos} />;
}

tsx
// app/TodoList.tsx（クライアントコンポーネント）
"use client";
import { useState } from "react";

export default function TodoList({ todos }) {
  const [list, setList] = useState(todos);
  return <ul>{list.map((todo) => <li>{todo.title}</li>)}</ul>;
}
🧩 app/page.tsx（サーバーコンポーネント）
tsx
// Todoデータ取得関数をインポート（APIやDBから取得する処理）
import { getTodos } from "../lib/api";

// クライアント側で表示するTodoListコンポーネントをインポート
import TodoList from "./TodoList";

// Homeページ（ルート / ）のサーバーコンポーネント
// App Routerでは、page.tsxがページ本体を表す
export default async function Home() {
  // サーバー側でTodoデータを非同期取得
  // クライアントに渡す前にデータを準備できる（SEOや表示速度に有利）
  const todos = await getTodos();

  // クライアントコンポーネントにデータを渡して表示
  return <TodoList todos={todos} />;
}

🧩 app/TodoList.tsx（クライアントコンポーネント）
tsx
// このコンポーネントはクライアント側で動作することを明示
// useStateなどのReactフックを使うには "use client" が必要
"use client";

// ReactのuseStateフックをインポート（状態管理に使用）
import { useState } from "react";

// TodoListコンポーネント（受け取ったtodosを表示する）
export default function TodoList({ todos }) {
  // 受け取ったtodosをlistという状態にセット
  // 状態にすることで、後から更新や操作が可能になる
  const [list, setList] = useState(todos);

  // listの中身を1つずつ<li>タグで表示
  return (
    <ul>
      {list.map((todo) => (
        <li key={todo.id}>{todo.title}</li> // keyはReactが要素を識別するために必要
      ))}
    </ul>
  );
}
🧠 補足ポイント
getTodos() はサーバーで実行 → クライアントに渡す前にデータ取得完了
"use client" がないと useState は使えない → クライアント専用の処理
useState(todos) → 初期値としてサーバーから受け取ったデータを使う
key={todo.id} → Reactがリストを効率的に描画・更新するための識別子


✅ pages/構成（旧）とapp/構成（新）の構成の根本的な違い
✅ 「すべてのコンポーネントがクライアントとして動く」から「サーバーとクライアントの責務を明示的に分ける」構成へと変わったこと。

pages/構成（旧）
・すべてのコンポーネントがクライアント扱い
・状態管理（useState）も副作用（useEffect）もどこでも使える
・データ取得はgetServerSidePropsなどの特殊関数で制御
・レイアウトは_app.tsxや_document.tsxで全体を一括管理
・責務が混在しやすく、構造がフラット

app/構成（新）
・コンポーネントはデフォルトでサーバー扱い
・クライアントで動かすには "use client" を明示
・データ取得はコンポーネント内で直接 fetch() やDBアクセスが可能
・レイアウトは階層ごとに layout.tsx で分離・再利用可能
・責務が明確に分離され、構造が階層的かつ再利用可能

構成要素	  pages/構成	    app/構成
状態管理	  どこでも可能	  "use client" が必要
データ取得	特殊関数で制御	コンポーネント内で直接取得
レイアウト	全体一括	      階層ごとに分離・再利用
責務分離	  混在しやすい	  明示的に分離されている