Web API オブジェクト一覧 20250630

🌐 グローバルオブジェクト（windowのプロパティとして使えるもの）
オブジェクト名	                         概要
window	                        最上位のグローバルオブジェクト（ブラウザウィンドウ）
document	                    HTMLドキュメントを操作するための DOM オブジェクト
console	                        デバッグのためのロギング機能（console.log など）
location	                    現在のURLの取得・変更ができる
navigator	                    ユーザーのブラウザやデバイスの情報を取得
screen	                        ディスプレイの情報にアクセス
history	                        ブラウザの履歴を操作
localStorage / sessionStorage	Web Storage API によるデータ保存
fetch	                        ネットワークリクエストを行う（Promiseベース）
setTimeout / setInterval        タイマー機能
alert / confirm / prompt	    ダイアログ系UI関数

🎧 メディア・通信系API
オブジェクト名	                           概要
AudioContext	                Web Audio API の中心。音の生成や加工が可能
MediaDevices	                カメラ・マイクなどメディア入力デバイス制御
WebSocket                     	サーバーと双方向通信
RTCPeerConnection	WebRTC によるP2P通信

🎨 グラフィック・アニメーション系
オブジェクト名	                            概要
CanvasRenderingContext2D	    <canvas> で2D描画を行うためのオブジェクト
WebGLRenderingContext	        <canvas> で3Dグラフィックを扱う

🛠 その他便利なAPIオブジェクト
オブジェクト名	                            概要
URL / URLSearchParams	        URLの構文解析とクエリ操作
FormData	                    フォームデータの送信や構築に使用
Crypto	                        暗号処理（crypto.getRandomValues など）
MutationObserver	            DOMの変化を監視


🚀 ホームページ制作で特に重要なJavaScript APIまとめ
API名	                                 主な用途	                   活用シーン
addEventListener	                イベントの登録	            ボタンのクリック、スクロール、キーボード操作などの反応を実装
IntersectionObserver	            要素の可視状態を監視	     スクロール連動アニメーション、Lazy Load、セクションのハイライト
MutationObserver	                DOMの変化を監視	            動的に変化するコンテンツの検出、SPAの状態監視
requestAnimationFrame	            アニメーションの最適化	     スムーズなアニメーション、スクロールエフェクト、ゲーム描画
fetch	                            ネットワークリクエスト	     APIからデータ取得、フォーム送信、非同期通信
setTimeout / setInterval	        遅延・繰り返し処理	         ローディング演出、定期的なデータ更新、アニメーション制御
classList	                        クラス操作	                アニメーションのトリガー、スタイルの切り替え、状態管理
querySelector / querySelectorAll	DOM要素の取得	            要素の選択・操作、イベントのバインド対象を指定
scrollTo / scrollIntoView	        スクロール制御	            スムーズスクロール、ナビゲーションリンクの移動先制御
localStorage / sessionStorage	    クライアント側のデータ保存	 ログイン状態の保持、テーマ設定、フォームの一時保存
history.pushState / popstate	    履歴の操作	                SPAのルーティング、URLの動的変更と戻るボタン対応
FormData	                        フォームデータの構築	     ファイルアップロード、非同期フォーム送信
URLSearchParams	                    クエリパラメータの操作	     フィルターや検索条件のURL管理、パラメータの取得・設定
matchMedia	                        メディアクエリのJS版	     レスポンシブ対応、画面幅に応じたJS処理の切り替え

🧠 特に重要なAPIベスト5（ホームページ制作視点）
addEventListener：すべてのインタラクションの基礎。
fetch：API連携や非同期通信の要。
IntersectionObserver：パフォーマンスを意識したアニメーションやLazy Loadに最適。
classList：状態管理やアニメーションのトリガーに頻出。
history.pushState / popstate：SPAやモダンなナビゲーションに不可欠。

Web API オブジェクトと JavaScript API の違いや関係について

🌐 Web API と JavaScript API の違いと関係
✅ 1. JavaScript API とは？
JavaScript で使える すべての機能の総称。
ECMAScript（JavaScriptの仕様）に含まれる 標準機能（例：Array, Object, Promise など）と、ブラウザや環境が提供する 追加機能（Web APIなど）を含む。

📌 例：
js
const arr = [1, 2, 3];
arr.map(x => x * 2); // JavaScriptの標準API（Array.prototype.map）

✅ 2. Web API とは？
ブラウザ（またはWebランタイム）が提供する 追加機能の集合。
JavaScript からアクセスできるが、ECMAScriptの仕様には含まれない。
DOM操作、ネットワーク通信、ストレージ、アニメーションなど、Webアプリに特化した機能を提供。

📌 例：
js
document.querySelector('h1'); // DOM API（Web APIの一部）
fetch('/api/data');           // Fetch API（Web API）
🔁 両者の関係性
項目	            JavaScript API	                    Web API
提供元	            ECMAScript仕様（言語仕様）	     ブラウザやNode.jsなどの環境
使用例	            Array, Math, Promise	        document, fetch, localStorage
実行環境	        どこでも（ブラウザ、Node.jsなど） 主にブラウザ（または一部Node.js）
目的	            言語としての基本機能	          Webアプリ開発に必要な機能を提供

🧠 まとめると…
JavaScript API は「言語としての機能」＋「環境が提供するAPI」の総称。
Web API はその中でも「ブラウザが提供するAPI群」で、window や document などが含まれる。