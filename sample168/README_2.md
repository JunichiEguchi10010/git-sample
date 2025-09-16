Supabase PostgreSQL について 20250911

SupabaseとORM Prisma の関係にについて

Supabase と Prisma はどちらも「データベースを扱うときに便利なツール」ですが、役割が違います。

✅ Supabaseとは？
・一言でいうと：「Firebase のオープンソース版」
・データベース（PostgreSQL）を中心に、アプリ開発に必要な機能がまとめて提供されています。

主な機能
・データベース：PostgreSQL が標準で使える
・認証 (Auth)：ユーザー登録、ログイン、SNSログイン（Google, GitHubなど）
・ストレージ：画像やファイルのアップロード・配信
・API自動生成：テーブルを作ると、自動的に REST / GraphQL API が生える
・リアルタイム：データベースの更新をリアルタイムで取得できる
👉 要するに「バックエンドの機能をサーバーを自分で用意せずに全部そろえられる」サービスです。

✅ Prismaとは？
・一言でいうと：「データベース操作を安全・便利にする ORM（Object Relational Mapper）」
・SQL を直接書かずに、TypeScript/JavaScript のコードでデータベースを操作できます。

Prismaのメリット
・型安全：TypeScriptと相性がよく、補完や型チェックが効く
・マイグレーション：DBスキーマの変更をコードで管理できる
・複雑なクエリを直感的に書ける
👉 つまり「アプリからデータベースを触るときの道具箱」みたいな役割です。

✅ Supabase と Prisma の関係
・Supabaseは バックエンドサービス全体（DB＋認証＋API＋ストレージ）
・Prismaは DBアクセスのためのORMライブラリ

組み合わせるイメージ
・SupabaseのPostgreSQLを Prismaで操作する
・認証やストレージはSupabaseのSDKをそのまま使う
・データ操作はPrismaで型安全に扱う

💡 例：
・ユーザー登録 → Supabase Auth を使う
・ユーザーの投稿データ管理 → SupabaseのPostgreSQLを Prisma で操作する

✅ まとめ
・Supabase = Firebase風のオールインワンバックエンドサービス
・Prisma = データベースを便利に操作するORM
・関係性：SupabaseのPostgreSQLを、Prismaを使って安全・便利に操作できる


✅ Supabase SDK と Prisma で書き比べ
「users テーブル (id, name, email)」を例にして、CRUD (Create, Read, Update, Delete) を Supabase SDK と Prisma で書き比べてみます。

✅ Supabase SDK を使った場合
Supabase の JavaScript クライアントを使います。

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

// CREATE
async function createUser(name: string, email: string) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email }])
  return { data, error }
}

// READ
async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
  return { data, error }
}

// UPDATE
async function updateUser(id: number, name: string) {
  const { data, error } = await supabase
    .from('users')
    .update({ name })
    .eq('id', id)
  return { data, error }
}

// DELETE
async function deleteUser(id: number) {
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', id)
  return { data, error }
}


👉 SQLに近い感覚で書けて、API経由で操作できる。
👉 ただし 型安全性は弱め（型は手動定義が必要）。

✅ Prisma を使った場合

Prisma Client を利用して PostgreSQL にアクセスします。

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// CREATE
async function createUser(name: string, email: string) {
  return await prisma.user.create({
    data: { name, email }
  })
}

// READ
async function getUsers() {
  return await prisma.user.findMany()
}

// UPDATE
async function updateUser(id: number, name: string) {
  return await prisma.user.update({
    where: { id },
    data: { name }
  })
}

// DELETE
async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: { id }
  })
}


👉 TypeScriptの型補完が効くので安全に書ける。
👉 ただし SupabaseのAuthやStorage機能は使えないので、必要なら Supabase SDK も併用する。

✅ 違いをまとめると

Supabase SDK
・APIベースでDB操作
・簡単に書けるけど型安全性が弱い
・認証やストレージと自然に連携できる

Prisma
・型安全で開発体験が良い
・DB操作に特化
・SupabaseのAuthやStorageは別途 SDK を使う必要がある

👉 実際の現場では
「小規模・サクッと作りたい」→ Supabase SDK
「型安全・大規模・長期開発」→ Prisma + Supabase(PostgreSQL)


🧠 SupabaseのSDKとは？
🧩 「SDK」とは Software Development Kit（ソフトウェア開発キット）のこと

SupabaseのSDKは、Supabaseのバックエンド機能（認証・データベース・ストレージ・リアルタイム通信など）をフロントエンドやサーバーサイドから簡単に操作できるようにするライブラリ群です。主にJavaScript/TypeScript向けの @supabase/supabase-js が使われています。

🧰 SDKでできること（主なモジュール）
機能	            説明	                            例
Auth	        ユーザー認証（メール、OAuth、2FA）	 supabase.auth.signUp()
Database	    PostgreSQLベースのRDB操作	        supabase.from('todos').select('*')
Storage	        ファイルのアップロード・取得	     supabase.storage.from('images').upload()
Realtime	    DB変更のリアルタイム通知	        チャットや通知機能に活用
Edge Functions	サーバーレス関数の呼び出し	         supabase.functions.invoke()

🧪 SDKの使い方（基本構文）
ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://your-project.supabase.co', 'your-anon-key')

// 例：ユーザー登録
const { data, error } = await supabase.auth.signUp({
  email: 'junichi@example.com',
  password: 'secure-password'
})
このように、SDKを使えばHTTPリクエストを自分で書かずに済み、型安全かつ簡潔なコードでSupabaseの機能を呼び出せます。


*SDKとは、特定のシステムに対応したソフトウェアを開発するために必要なプログラムやツール、文書などをひとまとめにした「ソフトウェア開発キット（Software Development Kit）」のことです。

SDKには、一般的に以下のものが含まれます。
・コンパイラ、デバッガ：プログラムを機械語に変換したり、プログラムの誤りを見つけたりするためのツールです。
・ライブラリ：特定の機能を持つプログラムの部品集で、開発者が一からコードを書く手間を省きます。
・API（Application Programming Interface）：ソフトウェアの機能やサービスを外部から利用するための窓口となる仕様です。SDKはAPIを含んだ開発ツール一式を提供します。
・サンプルコード：SDKをインストールしてすぐに動かせるプログラム例で、SDKの理解を助けます。
・開発ドキュメント：SDKの使い方やAPIの仕様などを説明した文書です。
・統合開発環境（IDE）：開発に必要なツールが統合されたソフトウェアで、効率的な開発を支援します。
・エミュレータ：実際のデバイスがなくても、そのデバイス上でプログラムがどのように動作するかをシミュレートできるツールです。

【Supabase入門】Todoアプリを作りながらSupabaseをNext.jsとTypescriptで学んでみよう
https://www.youtube.com/watch?v=CZlZgRo0bZ4


モダンな技術でフルスタックブログ開発をしてみよう【Next.js13/Prisma/Supabase/Typescriptを利用】
https://www.youtube.com/watch?v=wF3g76z14Gs


Next.js14で掲示板Webアプリケーションを作ってみよう【Supabase/react-hook-form/zod/shadcnを利用】
https://www.youtube.com/watch?v=8b6iqmo_2Os&t=2740s


SupabaseでPostgreSQLのDB作成
https://qiita.com/pikimaru/items/5e51d36250c288b8b6dc


【どっちがいい？】Firebase vs Supabase
https://www.youtube.com/watch?v=4iQL1oi6F18
