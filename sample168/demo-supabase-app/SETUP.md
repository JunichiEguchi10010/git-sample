# セットアップガイド

## 🚀 クイックスタート

### 1. 依存関係インストール
```bash
npm install
```

### 2. 環境変数設定
`.env.local` ファイルをプロジェクトルートに作成：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Supabaseプロジェクト設定

#### 3.1 プロジェクト作成
1. [Supabase ダッシュボード](https://supabase.com/dashboard) にアクセス
2. "New Project" をクリック
3. プロジェクト名とデータベースパスワードを設定

#### 3.2 テーブル作成
SQL Editor で以下のSQLを実行：

```sql
-- Todoテーブル作成
CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- RLSを無効化（開発時のみ）
ALTER TABLE todo DISABLE ROW LEVEL SECURITY;

-- サンプルデータ挿入（オプション）
INSERT INTO todo (title) VALUES 
  ('Supabase Todo アプリを完成させる'),
  ('Tailwind CSS でスタイリング'),
  ('TypeScript で型安全性を確保');
```

#### 3.3 API設定確認
Settings → API から以下をコピー：
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** キー → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. 開発サーバー起動
```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセス

## 🔧 トラブルシューティング

### よくある問題

#### 404エラー
```
GET /_next/src/FunctionsClient.ts 404
```
**解決策**: Supabaseバージョンをダウングレード
```bash
npm install @supabase/supabase-js@^2.39.0
```

#### 環境変数エラー
```
Supabase URL または API キーが未設定です
```
**解決策**: `.env.local` ファイルの存在と内容を確認

#### 型エラー
```
setTodos is not a function
```
**解決策**: TypeScript型定義を確認、キャッシュクリア
```bash
rm -rf .next
npm run dev
```

## 📚 参考資料

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Supabase ドキュメント](https://supabase.com/docs)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [TypeScript ハンドブック](https://www.typescriptlang.org/docs/)
