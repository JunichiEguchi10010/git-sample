// next.config.ts は、Next.js プロジェクト全体の動作を制御・カスタマイズする設定ファイルです。
// TypeScript で書かれているため、型安全に構成できます。ES Modules（ESM）方式

// path モジュールをインポート（ファイルパスの解決に使用）
import path from "path";

// Next.js の設定型をインポート（型安全な構成のため）
import type { NextConfig } from "next";

// Next.js の設定オブジェクトを定義
const nextConfig: NextConfig = {
  // Turbopack の設定（Next.js の高速ビルドツール）
  turbopack: {
    // プロジェクトのルートディレクトリを明示的に指定
    root: path.resolve(__dirname),
  },

  // Webpack のカスタマイズ設定
  webpack: (config, { isServer }) => {
    // Supabase のモジュール解決を改善
    // Supabase 使用時に Node.js の組み込みモジュール（fs, net, tls）を無効化
    // → ブラウザ環境で不要な依存によるビルドエラーを防ぐため
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,   // ファイルシステムモジュールを無効化
      net: false,  // ネットワークモジュールを無効化
      tls: false,  // TLS（暗号化）モジュールを無効化
    };

    // 修正済みの config を返す
    return config;
  },
};

// 設定オブジェクトをエクスポート（Next.js に読み込ませる）
export default nextConfig;


// 元のコード
// import path from "path";
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   turbopack: {
//     root: path.resolve(__dirname),
//   },
//   webpack: (config, { isServer }) => {
//     config.resolve.fallback = {
//       ...config.resolve.fallback,
//       fs: false,
//       net: false,
//       tls: false,
//     };
//     return config;
//   },
// };

// export default nextConfig;