// ✅ トースト通知
const copyButton = document.getElementById('copyButton');
const toast = document.getElementById('toast');

copyButton.addEventListener('click', () => {
  // 実際のコピー処理（例: テキスト）
  navigator.clipboard.writeText('コピーされました！').then(() => {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  });
});

// ✅ SVG チェックマーク再描画（毎回アニメ）
const svgCheck = document.getElementById('svgCheck');
svgCheck.addEventListener('click', () => {
  const path = svgCheck.querySelector('path');
  path.style.animation = 'none'; // リセット
  path.offsetHeight; // 再計算トリガー
  path.style.animation = null; // 再スタート
});

// コードの全体像
// 1. ✅ コピー操作とトースト通知
// ユーザーが「コピー」ボタンをクリックすると、指定されたテキスト（例：「コピーされました！」）がクリップボードにコピーされます。
// コピーが成功すると、画面に一時的な通知（トースト）が表示され、2秒後に自動で消えます。
// これは、ユーザーに「コピーできたよ！」と視覚的に伝えるための仕組みです。

// 2. ✅ SVGチェックマークの再描画アニメーション
// SVGアイコン（チェックマークなど）をクリックすると、内部の<path>要素のCSSアニメーションが毎回再生されるように制御しています。
// 通常、CSSアニメーションは一度しか再生されませんが、このコードではアニメーションを一度リセットして再スタートさせることで、毎回クリック時にアニメーションが再生されるようにしています。

// 疑似コード
// ✅ トースト通知（コピー完了の表示）
// plaintext
// 「copyButton」ボタンを取得
// 「toast」通知エリアを取得

// ボタンがクリックされたら：
//   - 「コピーされました！」というテキストをクリップボードにコピーする
//   - コピーが成功したら「toast」に「show」クラスを追加して通知を表示
//   - 2秒後に「show」クラスを削除して通知を非表示にする
// ✅ SVGチェックマークの再描画（毎回アニメーション）
// plaintext
// 「svgCheck」要素を取得

// クリックされたら：
//   - 中の「path」要素を取得
//   - アニメーションを一度「none」にしてリセット
//   - 高さを再計算してブラウザに変更を認識させる
//   - アニメーションを再度有効にして、毎回描画されるようにする

// コード解説
// ✅ トースト通知の処理
// js
// const copyButton = document.getElementById('copyButton');
// 🔹 id="copyButton" の要素（コピー用ボタン）を取得して、変数 copyButton に格納します。

// const toast = document.getElementById('toast');
// 🔹 id="toast" の要素（通知表示用の領域）を取得して、変数 toast に格納します。

// copyButton.addEventListener('click', () => {
// 🔹 コピー用ボタンがクリックされたときに、以下の処理を実行するイベントリスナーを設定します。

//   navigator.clipboard.writeText('コピーされました！').then(() => {
// 🔹 ブラウザのクリップボードAPIを使って、文字列 'コピーされました！' をコピーします。コピーが成功したら .then() の中の処理が実行されます。

//     toast.classList.add('show');
// 🔹 通知領域に show クラスを追加して、トースト通知を表示します（CSSで表示制御されている前提）。

//     setTimeout(() => {
// 🔹 一定時間後に何かを実行するためのタイマーを設定します。

//       toast.classList.remove('show');
// 🔹 2秒後に show クラスを削除して、通知を非表示にします。

//     }, 2000);
// 🔹 上記の処理（通知を消す）を 2000ミリ秒（＝2秒）後に実行します。

//   });
// 🔹 .then() の処理終了。

// });
// 🔹 copyButton のクリックイベントの処理終了。

// ✅ SVGチェックマークの再描画（アニメーションを毎回再生）
// const svgCheck = document.getElementById('svgCheck');
// 🔹 id="svgCheck" のSVG要素（チェックマークなど）を取得して、変数 svgCheck に格納します。

// svgCheck.addEventListener('click', () => {
// 🔹 SVGがクリックされたときに、以下の処理を実行するイベントリスナーを設定します。

//   const path = svgCheck.querySelector('path');
// 🔹 SVGの中にある <path> 要素（線や形を描く部分）を取得して、変数 path に格納します。

//   path.style.animation = 'none'; // リセット
// 🔹 CSSアニメーションを一度 'none' に設定して、アニメーションを強制的にリセットします。

//   path.offsetHeight; // 再計算トリガー
// 🔹 offsetHeight を参照することで、ブラウザに「レイアウトを再計算させる」トリガーを与えます。
// これにより、次のアニメーションが確実に再生されるようになります。

//   path.style.animation = null; // 再スタート
// 🔹 アニメーションスタイルを元に戻すことで、CSSで定義されたアニメーションが再度実行されます。

// });
// 🔹 svgCheck のクリックイベントの処理終了。

// 🔍 補足ポイント
// navigator.clipboard.writeText() は HTTPS環境でのみ動作します。
// path.offsetHeight は値を使わなくても「再計算させる」ために参照するだけで効果があります。
// CSS側で .toast.show や @keyframes が定義されている前提です。