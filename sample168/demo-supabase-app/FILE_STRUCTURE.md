# demo-supabase-app ファイル構成

## 📁 プロジェクト構成

```
demo-supabase-app/
├── 📁 app/                          # Next.js 13+ App Router
│   ├── favicon.ico                  # ファビコン
│   ├── globals.css                  # グローバルCSS（Tailwind v4）
│   ├── layout.tsx                   # ルートレイアウト
│   └── page.tsx                     # ホームページ
│
├── 📁 components/                   # Reactコンポーネント
│   ├── TodoApp.tsx                  # メインTodoアプリケーション
│   └── TodoList.tsx                 # Todoリスト表示コンポーネント
│
├── 📁 utils/                        # ユーティリティ・ヘルパー関数
│   ├── interface.ts                 # TypeScript型定義
│   ├── supabase.ts                  # Supabaseクライアント設定
│   └── supabasefunctions.ts         # Supabase CRUD操作
│
├── 📁 public/                       # 静的ファイル
│   ├── file.svg                     # Next.jsアイコン
│   ├── globe.svg                    # Next.jsアイコン
│   ├── next.svg                     # Next.jsロゴ
│   ├── vercel.svg                   # Vercelロゴ
│   ├── window.svg                   # ウィンドウアイコン
│   ├── initialzing.jpeg             # 初期化画像
│   ├── SUPABASE_ANON_KEY.jpeg       # Supabase設定画像
│   └── SUPABASE_URL.jpeg            # Supabase設定画像
│
├── 📄 .env.local                    # 環境変数（Git管理外）
├── 📄 .gitignore                    # Git除外設定
├── 📄 eslint.config.mjs             # ESLint設定
├── 📄 next-env.d.ts                 # Next.js型定義
├── 📄 next.config.ts                # Next.js設定
├── 📄 package.json                  # 依存関係・スクリプト
├── 📄 package-lock.json             # 依存関係ロック
├── 📄 postcss.config.mjs            # PostCSS設定（Tailwind）
├── 📄 tailwind.config.js            # Tailwind CSS設定
├── 📄 tsconfig.json                 # TypeScript設定
└── 📄 README.md                     # プロジェクト説明
```

## 🔧 技術スタック

### フロントエンド
- **Next.js 15.5.3** - Reactフレームワーク（App Router）
- **React 19.1.0** - UIライブラリ
- **TypeScript 5** - 型安全なJavaScript
- **Tailwind CSS v4** - ユーティリティファーストCSS

### バックエンド・データベース
- **Supabase** - BaaS（Backend as a Service）
- **PostgreSQL** - リレーショナルデータベース

### 開発ツール
- **Turbopack** - 高速バンドラー
- **ESLint** - コード品質チェック
- **PostCSS** - CSS処理

## 📋 機能一覧

### ✅ Todo管理機能
- [x] Todo一覧表示
- [x] Todo追加
- [x] Todo削除
- [x] リアルタイム更新

### 🔧 技術機能
- [x] Supabase接続
- [x] TypeScript型安全性
- [x] Tailwind CSS スタイリング
- [x] エラーハンドリング
- [x] レスポンシブデザイン

## 🚀 セットアップ手順

### 1. 依存関係インストール
```bash
npm install
```

### 2. 環境変数設定
`.env.local` ファイルを作成：
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabaseテーブル作成
```sql
CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- RLSを無効化（開発時のみ）
ALTER TABLE todo DISABLE ROW LEVEL SECURITY;
```

### 4. 開発サーバー起動
```bash
npm run dev
```

## 📝 主要ファイル説明

### `app/page.tsx`
- アプリケーションのエントリーポイント
- TodoAppコンポーネントをレンダリング

### `components/TodoApp.tsx`
- メインのTodoアプリケーションコンポーネント
- Todoの追加・一覧表示機能

### `components/TodoList.tsx`
- Todoリスト表示と削除機能
- 各Todoアイテムの表示

### `utils/supabase.ts`
- Supabaseクライアントの初期化
- 環境変数から設定を読み込み

### `utils/supabasefunctions.ts`
- Supabase CRUD操作
- `getAllTodos()`, `addTodo()`, `deleteTodo()`

### `utils/interface.ts`
- TypeScript型定義
- Todoオブジェクトの型定義

## 🔍 トラブルシューティング

### よくある問題
1. **404エラー**: Supabaseバージョン互換性問題
2. **環境変数エラー**: `.env.local` の設定確認
3. **型エラー**: TypeScript型定義の確認

### 解決策
- Supabaseバージョン: `@supabase/supabase-js@^2.39.0`
- キャッシュクリア: `.next` フォルダ削除
- 開発サーバー再起動: `npm run dev`
