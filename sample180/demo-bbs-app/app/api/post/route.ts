// 全部の投稿データを取得する
import prisma from "../../../lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const allBBSPosts = await prisma.post.findMany();
    return NextResponse.json(allBBSPosts);
}