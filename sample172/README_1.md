プログラミング「似た名前・似た書き方・併用が多い」ため混同しやすいポイント 20250924

 プログラミングやフロントエンド開発では 「似た名前・似た書き方・併用が多い」ため混同しやすい方式や環境 がいくつかあります。

1. モジュール関連の混同しやすいもの
混同しやすい要素	                違い	混乱の理由
ES Modules (ESM) vs CommonJS (CJS)	ESM = import/export 標準仕様
CJS = require/module.exports	Node.js 環境ではどちらも使えるが設定が違うので混乱
CSS Modules vs CSS-in-JS (styled-components, Emotion)	CSS Modules = ファイル単位のスコープ化
CSS-in-JS = JS 内でスタイルを定義	「コンポーネントに閉じ込める」考え方は同じだが、仕組みが違う
普通の CSS import vs CSS Modules import	普通 = グローバルに適用
Modules = スコープ化 & JS オブジェクトとして返る	両方とも import を使うので、同じ仕組みっぽく見える
2. フロントエンド環境関連
混同しやすい要素	違い	混乱の理由
ブラウザネイティブ JS 機能 vs ビルドツールでの拡張	例: import './style.css' はブラウザでは標準じゃないけど Vite/Webpack で動く	「import = 標準仕様」と思いがち
React / Next.js / Vite の設定 vs Node.js 環境	React/Next はビルド環境が自動で処理
Node.js 単体では設定が必要	「動く / 動かない」の境界がわかりにくい
JSX vs JavaScript	JSX = React の拡張構文
JavaScript = 標準言語	「import も JSX も ES Modules も全部同じ」っぽく見える
3. 名前・構文が似ているもの

Modules 系
ES Modules / CSS Modules / CommonJS Modules
→ 仕組みも用途も違うが「モジュール」という言葉で混乱

Hooks 系
useState / useEffect / useRef
→ React のライフサイクルに関わるが、初心者は何がどのタイミングで動くか混乱

import/export と require/module.exports
→ 同じ「モジュール読み込み」に見えるが、動作や環境が違う

🔑 混同を避けるコツ
名前で区別する
Modules  分割・部品化の考え方
「ES Modules = JS」「CSS Modules = CSS」

環境で区別する
ブラウザで動くか / Node.js だけか / ビルドツールが必要か

対象で区別する
ロジック？ → JS / ESM

見た目？ → CSS / CSS Modules

💡 まとめると：
似た名前や import 文の書き方は混乱しやすい
**対象（JS/CSS）・環境（ブラウザ/Node/ビルドツール）・仕組み（標準/拡張）**で整理するとスッキリする


📊 モジュール整理表
種類	            対象	                    スコープ	                                    環境	            書き方の例
CommonJS (CJS)	    JS（ロジック・関数）	基本はグローバル共有（ただし require 単位で閉じる）	Node.js（古い環境）	js\nconst fs = require('fs');\nmodule.exports = myFunc;\n
ES Modules (ESM)	JS（ロジック・関数・変数）	モジュールごとにスコープ分離	モダンブラウザ / Node.js (v12+)	js\nimport fs from 'fs';\nexport function myFunc() {}\n
CSS (通常 import)	CSS（見た目全体）	        グローバルに適用	                    ブラウザ / ビルドツールあり	    js\nimport './style.css';\n
CSS Modules	        CSS（見た目をローカル化）	クラス名を自動的にローカルスコープ化	Webpack / Vite / Next.js などビルド必須	js\nimport styles from './style.module.css';\n<div className={styles.btn}></div>\n
CSS-in-JS (例: styled-components)	JS内でCSSを扱う	コンポーネント単位でスコープ	React / Vue などのフレームワーク	js\nimport styled from 'styled-components';\nconst Button = styled.button`color: red;`;\n
💡 ポイント整理

対象で整理
JSなら → CommonJS / ESM
CSSなら → 普通のCSS / CSS Modules / CSS-in-JS

スコープで整理
グローバル → CommonJS / 普通のCSS
ローカル → ESM / CSS Modules / CSS-in-JS

環境で整理
ブラウザかNodeか、ビルドツールが必要かで分ける


🟥 CommonJS ES Modules (ESM) モジュールシステム 混同ポイント 
 CommonJS と ESM の差 が、混同を生みやすい大きな要因なんです。

💡 混同ポイントまとめ

対象環境の違い
CJS → Node.js 用に作られたバックサイド専用（ブラウザ非対応:🟥フロントサイドは非対応）
ESM → ECMAScript 標準、ブラウザも Node.js も対応（フロントもバックも両サイド対応）
🟥🟥🟥👉 「Node.js ではどっちも使える」ことが逆に混乱の元。

1. 環境依存の違い
CommonJS (CJS)

Node.js 専用に作られたモジュールシステム
require() / module.exports を使う
ブラウザではそのまま動かない（フロントでは非対応）

ES Modules (ESM)
ECMAScript 標準で、ブラウザ・Node.js 両方で利用可能
import / export を使う
フロントとバックの両方で同じ書き方ができる

2. Node.js では両方使える罠
Node.js は CJS が元々の標準だったため require() が普通に使える
しかし ESM もサポートされていて import / export が使える

この「両方使える状況」が混乱の元：
「Node.js だから CJS だけ」「Node.js だから ESM だけ」と思い込むとハマる
🟥 実際には .mjs 拡張子や package.json の "type": "module" で挙動が変わる

✅ まとめると
ESM は公式標準、フロントでもバックでも動く
CommonJS はNode.js発祥のレガシーだが、まだ現役で大量に使われている

書き方の違い

// CommonJS
const math = require("./math");
module.exports = math;

// ESM
import { add } from "./math.js";
export function add(a, b) {}

👉 require と import が似た役割なので混同しやすい。
歴史的背景
2009〜：Node.js が CJS を採用
2015〜：ESM が ECMAScript 標準に追加
2020〜：Node.js が ESM を正式サポート

👉 「古い教材やライブラリは CJS、新しいものは ESM」という二重構造。
フロントとバックでの扱い
フロント → ESM が基本
バック（Node.js） → まだ CJS が残っている

👉 フロントもバックも書く人が「どっちで統一すべき？」と迷う。

🎯 結論
混同の本質は「環境差」と「歴史的経緯」
今は フロント＝ESM、バックエンド＝ESM推奨（CJSは互換用）」 と整理するとスッキリします。