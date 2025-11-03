Next.jsでよくある誤解 5選 20250909 20251103

✅  1: なんでもかんでも use client をつけてしまう
✅  2: イベントハンドラ（onClickなど）で親ごとクライアント化してしまう
✅  3: fetch と ORM（Prisma / Drizzle）のキャッシュ挙動を混同する
✅  4: メタデータ設定の誤解
✅  5: Server Actions の理解と活用


✅ ミステーク 1: なんでもかんでも use client をつけてしまう
Next.js は デフォルトでサーバーコンポーネント。
useState や useEffect など クライアント専用フックを使うときだけ use client が必要。
親に use client をつけると、配下の子コンポーネントまで全部クライアント化 → 初期表示が遅くなる / SEO に悪影響。

👉 解決策: 必要最小限のコンポーネントだけクライアント化する。

✅ ミステーク 2: イベントハンドラ（onClickなど）で親ごとクライアント化してしまう
例えばボタンの onClick は ブラウザ側でしか動かない → クライアントコンポーネント必須。
だからといって ページ全体に use client をつけるのはNG。

👉 解決策: ボタンを別ファイルに切り出し → ボタンだけクライアント化、親はサーバーのまま。

✅ ミステーク 3: fetch と ORM（Prisma / Drizzle）のキャッシュ挙動を混同する

fetch の場合:
デフォルト = SSG（キャッシュあり）
cache: "no-store" = SSR（毎回取得）
next: { revalidate: 60 } = ISR（60秒ごとに更新）
ORM（Prismaなど）:
キャッシュは効かない
DB クエリは 毎リクエストごとに実行。

👉 ポイント: fetch はキャッシュ戦略を指定できるが、ORM は常にリアルタイム。

【追記】
🧠 キャッシュ挙動の違い：fetch vs ORM (Prisma / Drizzle)
✅ fetch のキャッシュ戦略（Next.js）
fetch() は キャッシュ戦略を明示的に指定可能（例：cache: 'force-cache', no-store など）
Next.js の fetch は 静的生成（SSG）やISR にも対応し、自動キャッシュが効く
unstable_cache() を使えば、任意の関数の結果をキャッシュできる（ただし実験的）

❌ ORM（Prisma / Drizzle）のキャッシュ挙動
ORMは 常にリアルタイムでDBにアクセス（SSR時に毎リクエストでクエリ実行）
Next.jsのキャッシュ戦略は ORMには効かない
ホットリロードや再実行のたびに 同じクエリが何度も実行される
ORM側でキャッシュするには、unstable_cache()などを使って手動でラップする必要があるが、やや煩雑

⚠️ 混同による問題点
fetch はキャッシュされるが、ORMはキャッシュされない → 同じように扱うと誤解が生じる
ORMを使ったコードが 毎回DBアクセスを発生させるため、パフォーマンス低下やコスト増加の原因に
特に開発中のホットリロードやSSR環境では、無駄なクエリが頻発

🛠️ 対処法とベストプラクティス
対処法	                         説明
unstable_cache()	        ORMクエリをラップしてキャッシュ可能。ただしNext.jsの実験的API
fetchのキャッシュ戦略を明示	  cache: 'force-cache' などで静的化を促進
DBアクセスを減らす構造設計	  必要なデータのみ取得、再利用可能な構造に
app ディレクトリでの server-only / client-only の明示	不要なSSRを避ける

💡まとめ
fetchとORMはキャッシュの仕組みが根本的に異なる
ORMは毎回リアルタイムでDBアクセスするため、キャッシュされな
パフォーマンスとコストを意識するなら、明示的なキャッシュ戦略の設計が必須
unstable_cache()などを使えば、ORMでもキャッシュ可能だが、慎重な設計が求められる


✅ ミステーク 4: メタデータ設定の誤解

1. 静的メタデータ
layout.tsx や page.tsx に直接 export const metadata を書くパターン。
固定ページ（静的） でタイトルや description が変わらない場合に使用。

2. 動的メタデータ
export async function generateMetadata() を使う。
params を受け取り、ブログ記事や詳細ページのようにページごとに異なるタイトル/description を設定できる。
この中で fetch() を使えば API から動的にデータを取得してメタデータを反映可能。

3. fetch の挙動
generateMetadata 内で fetch() を呼んだ場合、同じ API をコンポーネント内でも呼んでいても Next.js が自動でリクエストをまとめてくれる（メモ化）。
→ 重複リクエストは発生しない。

4. Prisma など ORM の場合
fetch と違って 自動的に重複排除はされない。
同じクエリを2回書けば、DB にも2回アクセスが飛ぶ。
回避策 → unstable_cache でキャッシュラップして使う。

5. 補足テクニック
メタデータ継承: layout の metadata を template 化し、%s | My Website のようにすると、子ページのタイトルを親のフォーマットに組み込める。

🎯 ポイントまとめ
静的ページ → metadata
動的ページ → generateMetadata（fetchで取得可能）
fetch は自動でリクエストまとめてくれるが、Prisma などはされない
ORM で使うなら unstable_cache を活用
テンプレート機能でメタデータ継承もできる

✅ ミステイク5（というよりおすすめ）: Server Actions の理解と活用 、Next.js 14～Server Actions正式導入済み

◆ 背景
従来：フォーム送信は onSubmit + イベントハンドラー を使う必要があった。
🟥 → そのためクライアントコンポーネント化 ("use client") が必須。
新方式：Server Actions を使うと、サーバーコンポーネントのままフォーム送信処理を書ける。

◆ Server Actions のメリット
パフォーマンス向上
クライアントから API 経由でフェッチする必要がなく、直接サーバー側で処理できる。
ユーザー作成やDB操作は本来サーバー側の処理なので効率的。
JavaScript が無効でも動く
action 属性を使うので、JS がロードされなくてもフォーム送信できる。
→ 「プログレッシブエンハンスメント」を満たす。
サーバーコンポーネントのままフォームを扱える
use client を書かずに済む。
コードがシンプルで管理しやすい。
フォームデータを直接取得可能
FormData.get("name") で値を取得できる。
useState や複雑な状態管理が不要になる。
バリデーションや状態管理との相性が良い
zod などを使ってサーバー側でバリデーション可能。
useActionState, useFormState, useFormStatus などの新フックでエラーメッセージや送信中状態を簡単に管理できる。

◆ 注意点（勘違いしやすいところ）
クライアントコンポーネントでは直接書けない
→ Server Action は別ファイルに切り出して "use server" を宣言する必要がある。
use client と混同するとエラーになりやすいので要注意。

◆ まとめ
サーバーで実行されるフォーム処理は Server Actions を使うのがベストプラクティスになりつつある。
「パフォーマンス」「コードの簡潔さ」「プログレッシブエンハンスメント」の観点からも推奨。
今後 Next.js で標準的なやり方になっていく可能性大。
👉 要するに、ミステイク5は“誤解”ではな「Server Actionsをまだ使ってない人へのおすすめ」 です。


【視聴済み】33Next.jsエンジニアが間違える5つの勘違い
https://www.youtube.com/watch?v=awCBhvJ0NLw