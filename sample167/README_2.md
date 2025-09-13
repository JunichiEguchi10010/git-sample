Node.js TypeScript ORM Prisma について 20250910

Prisma公式
https://www.prisma.io/

🔹 Prismaとは？
Prismaは ORM (Object Relational Mapper) と呼ばれるツールのひとつです。
データベースとやり取りするときに、SQLを直接書かずに TypeScript/JavaScriptのコードで安全に操作できるようにする仕組みです。

🔹 例でイメージ

従来だと、ユーザーを取得するSQLはこう書きます：
SELECT * FROM User WHERE id = 1;

Prismaを使うと、TypeScriptでこんな風に書けます：
const user = await prisma.user.findUnique({
  where: { id: 1 },
});


👉 SQLの知識がなくても直感的に書けて、しかもTypeScriptの型チェックが効くので 安全にコーディングできます。

🔹 Prismaの主な特徴

型安全 (Type-Safe)
・PrismaはDBスキーマから自動で型定義を生成します。
・だから「存在しないカラムを指定した」といったエラーを コンパイル時に防げる。

自動補完が効く
・VS CodeなどのIDEでカラム名やリレーションが自動補完されるので効率的。

Migration機能
・Prisma Migrateを使うと、スキーマファイル（schema.prisma）に書いた定義を元にDBを自動で更新できる。

複数DB対応
・PostgreSQL / MySQL / SQLite / SQL Server / MongoDB などに対応。

🔹 Prismaの基本構成
・プロジェクトにはだいたいこのファイルが関わります：

・schema.prisma
データベースのスキーマ（テーブルやリレーション）を宣言するファイル。

model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
  posts Post[]
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  content  String?
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
}

// 上記のコードのコメント付バージョン
// ユーザーモデル
model User {
  id    Int     @id @default(autoincrement()) 
  // 主キー。Int型。自動で1,2,3...と連番で増える

  name  String  
  // ユーザー名（文字列）

  email String  @unique 
  // メールアドレス（ユニーク制約付き = 重複不可）

  posts Post[] 
  // ユーザーが書いた投稿（Postモデルとの1対多リレーション）
}


// 投稿モデル
model Post {
  id       Int    @id @default(autoincrement())
  // 主キー。Int型。自動採番

  title    String 
  // 投稿タイトル（文字列）

  content  String?
  // 投稿本文（文字列）。? がついているので「省略可能（NULL可）」

  author   User   @relation(fields: [authorId], references: [id])
  // 投稿を書いたユーザー（Userモデルとのリレーション）
  // fields: [authorId] → 外部キーに使うフィールド
  // references: [id] → Userのidと関連付ける

  authorId Int
  // 外部キー。Userテーブルのidを参照
}


・node_modules/@prisma/client
🟥 スキーマから自動生成される型定義とクライアントライブラリ。
prisma.user.findMany() などがここに含まれる。

・prisma/migrations/
スキーマ変更時に作られるDBマイグレーション用ファイル。


🔹 開発の流れ

1.スキーマ定義
・schema.prisma にテーブル・カラム・リレーションを記述。

2.マイグレーション生成 & 実行
・npx prisma migrate dev --name init

# データベースにマイグレーションを適用するコマンド
# --name init で「init」という名前のマイグレーションファイルを作成し
# schema.prisma の内容に基づいて DB のテーブルを実際に作成/更新する
# 同時に Prisma Client も再生成される

3.Prisma Client生成
・npx prisma generate

# Prisma Client を生成するコマンド
# schema.prisma に書かれたモデル定義から
# TypeScript で使える型安全なクライアント（@prisma/client）を自動生成する

4.アプリから利用
・import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: { name: 'Alice', email: 'alice@example.com' },
  });

  const users = await prisma.user.findMany();
  console.log(users);
}

main();

🟥 上記コードのコメント付きコード
// PrismaClient を @prisma/client からインポート
// これでDBにアクセスするためのクラスを使えるようになる
import { PrismaClient } from '@prisma/client';

// PrismaClient のインスタンスを作成
// これがDB操作の窓口になる（userやpostなどのモデルごとのメソッドが使える）
const prisma = new PrismaClient();

async function main() {
  // Userテーブルに新しいユーザーを追加
  // name と email のデータをセットして保存する
  const newUser = await prisma.user.create({
    data: { name: 'Alice', email: 'alice@example.com' },
  });

  // Userテーブルからすべてのユーザーを取得
  // SELECT * FROM User と同じイメージ
  const users = await prisma.user.findMany();

  // 取得したユーザー一覧をコンソールに出力
  console.log(users);
}

// 非同期関数 main() を実行
// エラー処理は省略されているが、実際は try/catch を書いた方が安全
main();

📌 このコードの流れをまとめると：
PrismaClientを準備 → DBに接続するためのオブジェクトを作成
ユーザーを1件作成 → create を使って User テーブルにデータを追加
全ユーザーを取得 → findMany でユーザー一覧を配列で取得
出力 → 取得したデータを console.log で確認


🔹 まとめ
・Prismaは Node.js + TypeScriptで安全にDBを扱えるORM。
・SQLを書かずに直感的なメソッドでDB操作できる。
・型補完・型安全・マイグレーション管理が強力で、開発効率と安全性が大幅アップ。


【Prisma入門】次世代ORMで簡単にデータベース管理ができるようになろう
https://www.youtube.com/watch?v=9mE1j1vzUAQ

Prismaの導入とメリットを考える
https://qiita.com/am_765/items/5e42bd5f87b296f61fbc

Prisma Studioとは？データベースを視覚的に操作できる便利ツール
https://peaky.co.jp/prisma-studio/#index_id6

Prisma Studio - 概要
https://zenn.dev/aoyamadev/articles/14859cfc9431af