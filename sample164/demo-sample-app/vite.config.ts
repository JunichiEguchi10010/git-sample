// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  css: {
    devSourcemap: true, // 開発中のデバッグしやすさ向上
    modules: {
      /**
       * 生成されるクラス名のパターン
       * - 開発: 可読性重視（Button__primary）
       * - 本番: 短いハッシュでコード量削減
       */
      generateScopedName:
        mode === 'development'
          ? '[name]__[local]'
          : '[hash:base64:6]',

      /**
       * TS/JS 側での参照方法
       * - 'camelCaseOnly' なら CSS の .primary-button を JS では styles.primaryButton で参照
       * - 'camelCase' にすると kebab と camel の両方をエクスポート
       */
      localsConvention: 'camelCaseOnly',

      /**
       * 複数プロジェクトや MPA で万一のハッシュ衝突を避けたいときの塩（任意）
       */
      hashPrefix: 'egc-design'
    }
  }
}))


// 以下は大規模開発で「うっかり .module を付け忘れてグローバル汚染」を防ぐため、デフォルトを local にし、特定ファイルだけ global にするパターン。

// 例：src/global.css と src/styles/reset.css はグローバル扱いにする。

// // vite.config.ts
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig(({ mode }) => ({
//   plugins: [react()],
//   css: {
//     devSourcemap: true,
//     modules: {
//       scopeBehaviour: 'local', // すべての .css をモジュール化（.module なしでもローカルに）
//       generateScopedName:
//         mode === 'development' ? '[name]__[local]' : '[hash:base64:6]',
//       localsConvention: 'camelCaseOnly',
//       hashPrefix: 'egc-design',
//       /**
//        * ここにマッチしたパスは「グローバルCSS」として扱う
//        * reset や ベースレイアウトなど
//        */
//       globalModulePaths: [
//         /src\/global\.css$/,
//         /src\/styles\/reset\.css$/
//       ]
//     }
//   }
// }))


// この場合、通常の .css も全部ローカルスコープになります。
// global.css だけがグローバル（.container などをページ全体で使える）。

// 以下は型定義をきちんとする（TypeScript 補強）パターンです。

// Vite 標準でも CSS Modules の import は動きますが、型を厳密化して DX を上げるのが実務向けです。

// CSS Modules の型宣言ファイルを追加
// src/styles.d.ts（ファイル名は任意）

// // src/styles.d.ts
// declare module '*.module.css' {
//   const classes: { readonly [key: string]: string }
//   export default classes
// }
// declare module '*.module.scss' {
//   const classes: { readonly [key: string]: string }
//   export default classes
// }


// tsconfig.json に include されていることを確認
// （"include": ["src", ...] にこの d.ts が入る配置にしておけばOK）

// 各オプションの意味（要点だけ）

// devSourcemap: true
// → 開発時にブラウザの DevTools で元の CSS 行番号が追いやすい。

// scopeBehaviour

// local：すべての CSS をモジュール扱い（.module.css 不要）。

// global：すべてグローバル扱い（非推奨。衝突しやすい）。

// 指定なし（デフォルト）：.module.css だけモジュール、通常の .css はグローバル。

// globalModulePaths
// → 指定パターンにマッチした CSS を「グローバル扱い」に戻す抜け道。

// localsConvention

// camelCaseOnly：JS からは styles.primaryButton しか使えない（統一しやすい）。

// camelCase：styles.primaryButton も styles['primary-button'] も使える（移行に便利）。

// generateScopedName

// [name] = ファイル名、[local] = 元クラス名、[hash:base64:6] = 6文字ハッシュ。

// 開発は可読性重視、本番は短いハッシュ推奨（バンドル縮小・秘匿性）。