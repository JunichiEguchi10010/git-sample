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


Next.js14で掲示板Webアプリケーションを作ってみよう【Supabase/react-hook-form/zod/shadcnを利用】
https://www.youtube.com/watch?v=8b6iqmo_2Os&t=2740s