import { PrismaClient } from "./generated/prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;


// prismaClientのベストプラクティスから作成したコード ホットリロード対応
// ホットリロード時にプロセスがリセットされるので、グローバル変数に保存する