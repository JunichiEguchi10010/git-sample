// Expressモジュールを読み込む（Node.jsの軽量Webフレームワーク）
const express = require("express");

// PrismaClientをインスタンス化するためにインポート
const { PrismaClient } = require("@prisma/client");

// Expressアプリケーションを作成
const app = express();

// 使用するポート番号を指定（今回は8000）
const port = 6000;

// PrismaClientをインスタンス化
const prisma = new PrismaClient();

// リクエストボディをJSON形式で解析 Express v4.16.0以降で組み込まれた ミドルウェア関数
app.use(express.json());

// デバッグ用：すべてのリクエストをログ出力
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

app.get("/", async (req, res) => {
  const posts = await prisma.posts.findMany();
  return res.json(posts);
});

app.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const posts = await prisma.posts.findUnique({
    where: {
      id: Number(id),
    },
  });
  return res.json(posts);
});

// POSTリクエストを受け取ったときに新しい投稿を作成するエンドポイント
app.post("/", async (req, res) => {
  try {
    console.log("POSTリクエストを受信しました:", req.body);

    // リクエストボディからタイトルと本文を取得
    const { title, body } = req.body;

    // バリデーション
    if (!title || !body) {
      return res.status(400).json({ error: "titleとbodyは必須です" });
    }

    // Prisma ORMを使ってデータベースに新しい投稿を作成
    const posts = await prisma.posts.create({
      data: {
        title: title, // 投稿のタイトル
        body: body, // 投稿の本文
      },
    });

    console.log("投稿が作成されました:", posts);
    // 作成された投稿データをJSON形式でクライアントに返す
    res.json(posts);
  } catch (error) {
    console.error("エラーが発生しました:", error);
    res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
});

app.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id); // URLパラメータからidを取得
    const { body } = req.body;   // リクエストボディからbodyを取得
    
    const updatedPosts = await prisma.posts.update({
      where: {
        id: Number(id),
      },
      data: {
        body: body,
      },
    });
    return res.json(updatedPosts);
  }
);

app.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const deletedPosts = await prisma.posts.delete({
    where: { id: Number(id) },
  });
  return res.json(deletedPosts);
});




// ルートパス（"/"）にGETリクエストが来たときの処理を定義
// ブラウザで http://localhost:8000 にアクセスすると "Hello World" を返す → ブラウザ側に表示
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// サーバーを起動し、指定したポートでリクエストを待ち受ける
// 起動成功時にコンソールにメッセージを表示 → コンソール側に表示
app.listen(port, "0.0.0.0", () => {
  console.log(`サーバー起動中: Server is running on port ${port}`);
  console.log(`アクセスURL: http://localhost:${port}`);
  console.log(`アクセスURL: http://127.0.0.1:${port}`);
});

// コードの役割まとめ
// 機能	        説明
// express()	    Webサーバーのインスタンスを生成
// app.get()	    特定のURLパスに対するリクエスト処理を定義
// res.send()	    クライアントにテキストレスポンスを返す
// app.listen() 	サーバーを起動してポートで待機
