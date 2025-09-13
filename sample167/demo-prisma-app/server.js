// Expressモジュールを読み込む（Node.jsの軽量Webフレームワーク）
const express = require('express');

// Expressアプリケーションを作成
const app = express();

// 使用するポート番号を指定（今回は8000）
const port = 8000;

// ルートパス（"/"）にGETリクエストが来たときの処理を定義
// ブラウザで http://localhost:8000 にアクセスすると "Hello World" を返す
app.get('/', (req, res) => {
  res.send('Hello World');
});

// サーバーを起動し、指定したポートでリクエストを待ち受ける
// 起動成功時にコンソールにメッセージを表示
app.listen(port, () => {
  console.log(`サーバー起動中: Server is running on port ${port}`);
});

// コードの役割まとめ
// 機能	        説明
// express()	    Webサーバーのインスタンスを生成
// app.get()	    特定のURLパスに対するリクエスト処理を定義
// res.send()	    クライアントにテキストレスポンスを返す
// app.listen() 	サーバーを起動してポートで待機