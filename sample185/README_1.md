カウントアップアニメーション スニペット 20251130

6:30～カウントアップアニメーションの要約

カウントアップは、0から指定した数字まで自動で数字が増えていくアニメーションです。JavaScriptを比較的多く使いますが、一度作っておくと使い回しがしやすい機能です。

実装のポイント
1. HTML側

数字を表示する要素には

data-target（最終的な数字）

data-duration（アニメーションの時間）
を指定する。

要素には js-count-up のクラスを付与し、これを目印に JavaScript が動く。

2. JavaScript側

js-count-up の要素を取得。

各要素から

data-target（最終値）

data-duration（秒数）
を取得。

animationCounter() という関数に要素や目標値、時間を渡す。

animationCounter の動作

経過時間と進捗率を計算し、現在の値を算出。

小数か整数かによって値の更新方法を切り替える。

requestAnimationFrame を使い、ブラウザの描画タイミングで数値を更新。

最終数字に到達するまで更新を繰り返す。

コピペで即戦力！時短と品質向上に必須のテクニック！WebアニメーションCSS/JSスニペット集【デイトラウィークリーコーディング】6:30カウントアップアニメーション
https://www.youtube.com/watch?v=W70N8R5lsqc