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

>libフォルダにprismaClients.ts(もしくはsupabaseClients.ts)を作成(認証とかが無ければprismaORM使用の方が良い→SQL不要になる)
https://www.prisma.io/
>prismaをインストールする>prismaフォルダが自動作成>schema.prismaファイルが自動作成される


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
























Next.js14で掲示板Webアプリケーションを作ってみよう【Supabase/react-hook-form/zod/shadcnを利用】
https://www.youtube.com/watch?v=8b6iqmo_2Os&t=2740s