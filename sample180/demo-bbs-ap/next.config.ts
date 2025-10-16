import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname
  },
};

export default nextConfig;

// __dirname は 「directory name（ディレクトリ名）」の略です。 
// Node.js や Next.js の環境で使われる特殊な変数で、現在のファイルが存在するフォルダの絶対パスを表します。

// git-sample フォルダに1つ
// git-sample/sample180/demo-bbs-ap フォルダにも1つ
// → つまり、親フォルダと子フォルダの両方に package-lock.json があるため、Next.js がどちらを「本体」とするか迷っている状態です。

// Next.js の設定オブジェクトに型を付けるための型定義をインポート
// import type { NextConfig } from "next";

// Next.js の設定オブジェクトを定義
// const nextConfig: NextConfig = {
  // ここに他の設定オプション（例：reactStrictMode, images など）を追加できます
  // turbopack: {
    // Turbopack におけるプロジェクトのルートディレクトリを明示的に指定
    // __dirname はこのファイル（next.config.ts）が存在するディレクトリの絶対パス
    // root: __dirname
  // },
// };

// // 設定オブジェクトを Next.js にエクスポート（プロジェクト全体で使用される）
// export default nextConfig;



// package-lock.jsonの警告なのになぜnext.config.js のturbopack.rootを明示しなければならないのですか？
// 一見すると「package-lock.json に関する警告」なのに、なぜ next.config.js の turbopack.root を設定する必要があるのか？ 
// その理由は、Next.js（特に Turbopack）が「どのディレクトリをプロジェクトのルートとみなすか」を package-lock.json を手がかりに推測しているからです。

// 🔍 背景：警告の本質
// Next.js（Turbopack）は、起動時に以下のような判断をします：
// どのフォルダが「プロジェクトのルート」か？
// そのルートにある package-lock.json を使って依存関係を管理する
// しかし、複数の package-lock.json が存在すると…
// 「どっちが本物のルートなの？」と迷ってしまう
// 自動で選んだルートが 意図と違う場所になる可能性がある
// その結果、依存関係の解決やビルドが不安定になる

// ✅ 解決策：turbopack.root で明示する
// next.config.js に turbopack.root を設定することで：
// Turbopack に「このフォルダが本物のルートです」と教える
// package-lock.json の場所も正しく認識される
// // 警告が消え、安定したビルド環境になる

// next.config.js に turbopack.rootを明示することで、package-lock.jsonへのルートが明確になりコンピュータが迷わないということですか？
// はい、その通りです。

// 🧠 なぜ turbopack.root を明示するのか？
// Next.js（特に Turbopack）は、プロジェクトの「ルートディレクトリ」を自動で推測しようとします。
// その際、package-lock.json の位置を手がかりにしてルートを判断します。

// しかし、複数の package-lock.json が存在すると…

// どちらが本物のルートか判断できず、迷ってしまう

// 意図しないフォルダをルートとして選んでしまう可能性がある

// その結果、依存関係の解決やビルド処理に不具合が出ることも

// ✅ turbopack.root を設定する意味
// ts
// turbopack: {
//   root: __dirname
// }

// この設定を next.config.js に書くことで：
// 「このフォルダが本物のルートです」と Turbopack に明示できる
// Turbopack はそのフォルダ内の package-lock.json を正しく使う
// 警告が消え、迷いなくビルドが進む