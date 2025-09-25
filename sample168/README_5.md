Next.js next.config.ts ファイルについて 20250902

Next.js プロジェクト全体の動作を制御・カスタマイズする設定ファイルです。TypeScript で書かれているため、型安全に構成できます。

🧩 主な役割
機能カテゴリ	            内容
ビルド設定	            Turbopack や Webpack の挙動を調整（例：ルートディレクトリの指定、モジュール解決の変更）
環境変数	            env オプションで環境変数を定義し、クライアント／サーバーで使い分け可能
画像最適化	            images オプションで外部画像ドメインやサイズ制限を設定
リダイレクト／リライト	　redirects や rewrites を使って URL の振る舞いを制御
国際化（i18n）	        多言語対応の設定（ロケール、デフォルト言語など）
ESLint／TypeScript	    開発時の静的解析や型チェックの挙動を調整
API／SSR の挙動	        サーバーサイドレンダリングや API ルートの最適化設定

🛠構成例
ts
const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};
この構成では：

Turbopack のルート指定：ビルドの起点を明示し、パフォーマンスと安定性を向上。

Webpack の fallback 設定：Supabase などの SDK が Node.js モジュール（fs, net, tls）を参照しようとする問題を回避。
特にクライアントサイドでのビルドエラー防止に重要。

📦 ファイル名と形式の補足
next.config.js → JavaScript形式
next.config.ts → TypeScript形式（型補完や静的解析が可能）
next.config.mjs → ESモジュール形式（import/export を使いたい場合）


✅ next.config.tsファイルの生成方法

next.config.ts ファイルは、Next.js プロジェクトのルートディレクトリに手動で作成する設定ファイルです。
Next.js は自動生成してくれないため、開発者が自分で作成する必要があります。

🛠 作成手順（TypeScript 形式）
プロジェクトのルートにファイルを作成 next.config.ts という名前で新規ファイルを作成します。
基本構成を記述 TypeScript を使う場合、型補完のために NextConfig 型をインポートします。

ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ここに設定を記述
};

export default nextConfig;
Next.js がこのファイルを認識する条件
tsconfig.json が存在していて TypeScript プロジェクトとして認識されていること
next.config.ts がルートディレクトリにあること
Next.js のバージョンが TypeScript 対応済みであること（v12以降ならOK）

✅ よく使う設定例（TypeScript + ES Modules 形式）
※ Next.js はデフォルトで CommonJS (next.config.js) を使いますが、
TypeScript プロジェクトでは .ts + export default による ES Modules 形式が推奨されます。

ts
const nextConfig: NextConfig = {
  reactStrictMode: true, // 開発時の厳格モード（潜在的な問題を警告）
  swcMinify: true,       // SWC による高速な minify 処理
  images: {
    domains: ["example.com"], // 外部画像ドメインの許可設定
  },
};

export default nextConfig;