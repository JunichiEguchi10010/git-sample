import { PrismaClient } from "@prisma/client";
import prisma from "../lib/prismaClients";
import { BBSCardList } from "./components/BBSCardList";

export default function Home() {
  return (
    <main>
      <BBSCardList />
    </main>
  );
}
