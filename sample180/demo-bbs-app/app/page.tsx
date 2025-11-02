import { PrismaClient } from "@prisma/client";
import { BBSCardList } from "./components/BBSCardList";


const prismaClient = new PrismaClient();(外で使うと何回も生成される）
)

export default function Home() {
  return (
    <main>
      <BBSCardList />
    </main>
  );
}
