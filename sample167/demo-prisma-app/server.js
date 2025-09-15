// Expressモジュールを読み込む（Node.jsの軽量Webフレームワーク）
const express = require("express");

// PrismaClientをインスタンス化するためにインポート
const { PrismaClient } = require("@prisma/client");

// Expressアプリケーションを作成
const app = express();

// 使用するポート番号を指定（今回は8000）
const port = 8000;

// PrismaClientをインスタンス化
const prisma = new PrismaClient();

// リクエストボディをJSON形式で解析 Express v4.16.0以降で組み込まれた ミドルウェア関数
app.use(express.json());

// ==============================
// ミドルウェア：すべてのリクエストをログ出力（デバッグ用）
// ==============================
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`); // リクエストメソッドとURL、タイムスタンプを表示
  console.log("Headers:", req.headers); // リクエストヘッダーを表示
  console.log("Body:", req.body);       // リクエストボディを表示（POST/PUT時など）
  next(); // 次のミドルウェアまたはルートハンドラへ処理を渡す
});

// ==============================
// ルート：全投稿を取得
// GET /
// ==============================
app.get("/", async (req, res) => {
  try {
    const posts = await prisma.posts.findMany(); // postsテーブルの全レコードを取得
    return res.json(posts); // JSON形式でレスポンスを返す
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal Server Error" }); // エラーハンドリング（将来的な保守性のため）
  }
});

// ==============================
// ルート：指定IDの投稿を取得
// GET /:id
// ==============================
app.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id); // URLパラメータからIDを数値として取得
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" }); // IDが数値でない場合は400エラー
  }

  try {
    const post = await prisma.posts.findUnique({
      where: { id: id }, // 指定IDのレコードを検索
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" }); // 該当レコードがない場合は404エラー
    }

    return res.json(post); // 該当レコードをJSON形式で返す
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({ error: "Internal Server Error" }); // エラーハンドリング
  }
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

// ==============================
// ルート：投稿の更新（PUT）
// PUT /:id
// ==============================
app.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id); // URLパラメータからidを数値として取得
  const { body } = req.body;          // リクエストボディから投稿内容（body）を取得

  // IDの形式チェック
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const updatedPosts = await prisma.posts.update({
      where: { id: id },     // 更新対象のIDを指定
      data: { body: body },  // 更新するフィールド（ここでは本文のみ）
    });

    return res.json(updatedPosts); // 更新後の投稿データを返す
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ error: "Internal Server Error" }); // エラーハンドリング
  }
});

// ==============================
// ルート：投稿の削除（DELETE）
// DELETE /:id
// ==============================
app.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id); // URLパラメータからidを数値として取得

  // IDの形式チェック
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const deletedPosts = await prisma.posts.delete({
      where: { id: id }, // 削除対象のIDを指定
    });

    return res.json(deletedPosts); // 削除された投稿データを返す
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ error: "Internal Server Error" }); // エラーハンドリング
  }
});

// Expressアプリケーションの動作確認用のテストコード
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

// 疑似コード
// 🌐 サーバーの初期設定
// コード
// 1. Webサーバーの機能を読み込む（Express）
// 2. データベース操作用のツールを読み込む（Prisma）

// 3. Webアプリケーションを作成する
// 4. 使用するポート番号を設定する（例：8000）

// 5. データベース接続用のインスタンスを作成する
// 6. リクエストの中身（JSON形式）を読み取れるようにする
// 🧩 ミドルウェア（共通処理）
// コード
// 7. すべてのリクエストに対して、以下の情報を記録する：
//    - リクエストの種類（GET, POSTなど）
//    - リクエストされたURL
//    - リクエストの日時
//    - ヘッダー情報
//    - リクエストの中身（本文）

// 8. 記録が終わったら、次の処理へ進む
// 📥 データの操作（CRUD）
// 🔍 投稿一覧を取得（GET /）
// コード
// 9. データベースからすべての投稿を取得する
// 10. 結果をJSON形式で返す
// 🔍 投稿をIDで取得（GET /:id）
// コード
// 11. URLから投稿IDを取得する
// 12. IDが正しい形式か確認する
// 13. データベースから該当する投稿を探す
// 14. 見つかれば投稿を返す、なければ「見つかりません」と返す
// 📝 新しい投稿を作成（POST /）
// コード
// 15. リクエストの中身から「タイトル」と「本文」を取り出す
// 16. 両方が存在するか確認する
// 17. データベースに新しい投稿を追加する
// 18. 作成された投稿を返す
// ✏️ 投稿を更新（PUT /:id）
// コード
// 19. URLから投稿IDを取得する
// 20. リクエストの中身から「本文」を取り出す
// 21. IDが正しい形式か確認する
// 22. データベースの該当投稿を更新する
// 23. 更新された投稿を返す
// 🗑 投稿を削除（DELETE /:id）
// コード
// 24. URLから投稿IDを取得する
// 25. IDが正しい形式か確認する
// 26. データベースから該当投稿を削除する
// 27. 削除された投稿の情報を返す
// 🚀 サーバーの起動
// コード
// 28. 指定したポート番号でサーバーを起動する
// 29. 起動成功時に、アクセス用のURLをコンソールに表示する