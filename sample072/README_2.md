React 環境構築　ES Modulesについて　20250518

JavaScriptの標準的なモジュールシステムです。
これにより、コードを分割して管理しやすくなり、再利用性や保守性が向上します。

🔹 ES Modulesの特徴
import と export を使用

他のファイルから機能を取り込む (import)

他のファイルへ機能を提供する (export)

ブラウザとNode.jsの両方で利用可能

以前は CommonJS（Node.js向け）や AMD（ブラウザ向け）が使われていましたが、ES Modulesは標準仕様として統一されています。

非同期ロードが可能

<script type="module"> を使うことで、ブラウザが自動的にモジュールを非同期でロードします。

🔹 ES Modulesの基本構文
✅ export を使ってモジュールを定義
javascript
// math.js
export const PI = 3.14159;
export function square(x) {
  return x * x;
}

✅ import を使ってモジュールを読み込む
javascript
// main.js
import { PI, square } from "./math.js";

console.log(PI); // 3.14159
console.log(square(4)); // 16

🔹 ES Modulesのメリット
✅ スコープが分離される → グローバル汚染を防ぐ
✅ コードの再利用が簡単 → 必要な機能だけを import できる
✅ 依存関係が明確 → どのモジュールがどこで使われているかが分かりやすい


🔹 CommonJSとの違い
CommonJSとES Modules（ESM）の違いを簡単にまとめると、モジュールの管理方法と動作の仕組みが異なります。

🔹 主な違い
項目	                    CommonJS (CJS)	                        ES Modules (ESM)
導入時期	                Node.jsの初期から	                  ECMAScript 2015（ES6）で標準化
構文	                    require() を使用	                 import / export を使用
モジュールの読み込み	     同期的（ブロッキング）	                非同期的（パフォーマンス向上）
静的解析	                不可（実行時に解析）	                可能（コンパイル時に解析）
ブラウザ対応	            非対応（Node.js専用）               	対応（ブラウザでも動作）
パフォーマンス	            遅め（同期読み込み）	                高速（非同期読み込み）

🔹 具体的なコードの違い
CommonJS
javascript
// モジュールのエクスポート
const add = (a, b) => a + b;
module.exports = add;

// モジュールのインポート
const addFunction = require('./moduleA.js');
console.log(addFunction(3, 5)); // 8

ES Modules
javascript
// モジュールのエクスポート
export const add = (a, b) => a + b;

// モジュールのインポート
import { add } from './moduleA.js';
console.log(add(3, 5)); // 8

🔹 どちらを使うべき？
✅ Node.jsの古いプロジェクト → CommonJS
✅ モダンなJavaScript開発（React, Vue, Next.jsなど） → ES Modules

最近では、ES Modulesが主流になりつつあり、Node.jsもESMをサポートしています。