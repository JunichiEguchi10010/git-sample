demo-bbs-app 20251011

以下、時系列の制作メモ

初期設定
 npx create-next-app@latest demo-bbs-app
√ Would you like to use TypeScript? ... No / 🔴Yes
√ Which linter would you like to use? » ESLint
√ Would you like to use Tailwind CSS? ... No / 🔴Yes
√ Would you like your code inside a `src/` directory? ...🔴 No / Yes
√ Would you like to use App Router? (recommended) ... No / 🔴Yes
√ Would you like to use Turbopack? (recommended) ... No / 🔴Yes

>demo-bbs-app>へ移動  npm run dev

>app配下にcomponentsフォルダ >layoutsフォルダ >Header.tsx作成

>layout.tsx コード修正 en → ja
return (
    <html lang="ja">

>Header.tsx作成 import Link from 'next/link'

>shadcnでUI作成 >初期設定npx shadcn@latest init

>components.jsonを自動生成

>add コマンドで他のコンポーネント（input, card, dialog など）を追加するとcomponents フォルダが自動生成

>page.tsxでベタでカードリストを作成
>BBSCardLis.tsxを作成　>BBSCard.tsxを作成しカードをコンポーネント化

>SupaBaseを設定 
https://supabase.com
プロジェクト名:bbs-nextjs-sampleｰDatebase
データベースパスワード:stYVOlc1rK8SZxLq

>データベース作成後の画面にURLとAPIキーが発行されるので.env.localファイルを作成する
プロジェクトURL
https://zcraxyulvsqgakkwuptu.supabase.co
APIキー
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjcmF4eXVsdnNxZ2Fra3d1cHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MDg4MzcsImV4cCI6MjA3NzM4NDgzN30.ePOBCAuvnG0zuR4KHDKiffayYcxGt8yDWmkMIR7-C5E

>libフォルダにprismaClients.ts(もしくはsupabaseClients.ts)を手動で作成(認証とかが無ければprismaORM使用の方が良い→SQL不要になる)
https://www.prisma.io/
>prismaをインストールする>prismaフォルダが自動作成>schema.prismaファイルが自動作成される

>.envにConnection Stringを登録 supabaseのプロジェクトを作成したときのパスワードを入れる
postgresql://postgres:[YOUR_PASSWORD]@db.zcraxyulvsqgakkwuptu.supabase.co:5432/postgres

>掲示板のスキーマ定義　prismaドキュメント参照
https://www.prisma.io/docs/orm/prisma-schema/overview

>schema.prismaに記述追加
Postモデル例

model Post {  
  id         Int        @id @default(autoincrement())  
  createdAt  DateTime   @default(now())  
  updatedAt  DateTime   @updatedAt  
  title      String  
  published  Boolean    @default(false)  
  author     User       @relation(fields: [authorId], references: [id])  
  authorId   Int  
  categories Category[]  
}

>作成したスキーマをDB(Supabase)へマイグレート
npx prisma migrate dev --name <migration-name>
→migrationsファイルが自動作成される>その中に複数のファイルとsqlを管理するフォルダが自動作成された。
ORMのメイン機能

参考ドキュメント
https://www.prisma.io/docs/orm/prisma-migrate/getting-started
https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production
sample167 README_2参照

いつの間にかprisma.config.tsが作成（作成した記憶なしだが、自動作成はされない仕様らしい）されていてこれがエラーの原因となっていて削除した経緯あり、通常は不要らしい

結論: prisma.config.ts は手動で作成された、または誤って作成されたファイルであり、Prisma の標準では不要です。削除で問題ありません。

✅ 次のステップ
1. データベーススキーマの定義
schema.prisma ファイルを開いて、最初のモデル（テーブルの設計）を定義します。参考になるドキュメントはこちら： 👉 Prisma スキーマの書き方

2. マイグレーションの適用
以下のコマンドでマイグレーション（スキーマ変更の反映）を作成・適用します：

bash
npx prisma migrate dev --name init
3. データの管理
ローカルでデータをGUIで確認・編集するには：

bash
npx prisma studio
またはオンラインの Prisma Console でも操作できます： 🔗 Prisma Console Studio

4. アプリからクエリを送る
JavaScript / TypeScript アプリからデータベースにアクセスするには、Prisma ORM を使います。 👉 ステップバイステップのガイドはこちら

🔔 npm のアップデート通知
新しいメジャーバージョンの npm が利用可能です：
現在のバージョン: 10.7.0
新しいバージョン: 11.6.2

更新方法：
bash
npm 

>prismaのスキーマ設定からCLIコマンドでsupabaseでDBが自動で作成される
>Disable RLS（Confirm to disable Row Level Security）→をconfirmして、Create policyにて作成
Policy Name：INSERT BBS to POST Table
Policy Command →　内容に応じて設定 今回はINSERT

Use options above to edit
alter policy "INSERT BBS to POST Table"
on "public"."Post"
to public
🟥 with check (
  true ここをtureにする
);

Policy Name：GET ALL BBS DATA
Policy Command →　内容に応じて設定 今回はSELECT

Postで
Policiesを2つ作成
Name	Command	Applied to	Actions
GET ALL BBS DATA SELECT	public
INSERT BBS to POST Table INSERT public

npm i @prisma/clientインストール
package.json確認したら既に入ってい他が実行する
  "devDependencies": 
    "@prisma/client": "^6.18.0",

AIでこの案内が出ている
PrismaClient を使う場合、Next.js の App Router ではシングルトンパターンが推奨です。必要なら、lib/prismaClient.ts を作成してエクスポートする方法を案内します。必要ですか？？？

>libフォルダに作成済みのprismaClients.tsにprismaclientのホットリロード対策を記述




Next.js14で掲示板Webアプリケーションを作ってみよう【Supabase/react-hook-form/zod/shadcnを利用】
https://www.youtube.com/watch?v=8b6iqmo_2Os&t=2740s