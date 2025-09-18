// Supabase クライアントライブラリをインポート
import { createClient } from '@supabase/supabase-js'

// Supabase プロジェクトのURLを環境変数から取得
// NEXT_PUBLIC_ が付いていることで、クライアントサイド（ブラウザ）でも参照可能
// `!` は TypeScript の「非nullアサーション演算子」
// → この変数は絶対に null や undefined ではないと明示する
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

// Supabase の anon キー（クライアント用公開キー）を環境変数から取得
// RLS（Row Level Security）によりアクセス制限される安全なキー
// `!` によって、undefined の可能性を排除して createClient に渡せるようにしている
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Supabase クライアントを初期化
// このオブジェクトを使って、認証・データベース・ストレージなどの操作が可能になる
export const supabase = createClient(supabaseUrl, supabaseKey)
