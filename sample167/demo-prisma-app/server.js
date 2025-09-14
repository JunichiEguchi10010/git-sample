// Expressモジュールを読み込む（Node.jsの軽量Webフレームワーク）
const express = require('express');

// Expressアプリケーションを作成
const app = express();

// 使用するポート番号を指定（今回は8000）
const port = 8000;


// POSTリクエストを受け取ったときに新しい投稿を作成するエンドポイント
app.post('/', async (req, res) => {
  // リクエストボディからタイトルと本文を取得
  const { title, body } = req.body;

  // Prisma ORMを使ってデータベースに新しい投稿を作成
  const posts = await prisma.posts.create({
    data: {
      title: title, // 投稿のタイトル
      body: body,   // 投稿の本文
    },
  });

  // 作成された投稿データをJSON形式でクライアントに返す
  res.json(posts);
});


// ルートパス（"/"）にGETリクエストが来たときの処理を定義
// ブラウザで http://localhost:8000 にアクセスすると "Hello World" を返す → ブラウザ側に表示
app.get('/', (req, res) => {
  res.send('Hello World');
});

// サーバーを起動し、指定したポートでリクエストを待ち受ける
// 起動成功時にコンソールにメッセージを表示 → コンソール側に表示
app.listen(port, () => {
  console.log(`サーバー起動中: Server is running on port ${port}`);
});

// コードの役割まとめ
// 機能	        説明
// express()	    Webサーバーのインスタンスを生成
// app.get()	    特定のURLパスに対するリクエスト処理を定義
// res.send()	    クライアントにテキストレスポンスを返す
// app.listen() 	サーバーを起動してポートで待機