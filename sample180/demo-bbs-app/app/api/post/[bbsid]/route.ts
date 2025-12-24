import { NextResponse } from "next/server";
import prisma from "../../../../lib/prismaClient";

// 特定（id）の投稿データを取得する
export async function GET(
    request: Request,
    { params }: { params: { bbsId: string } }// string型でないとエラーがでる、パラメーターを受け取る
) {
    const bbsId = params.bbsId;// パラメーターを受け取る
    const bbsDetailData = await prisma.post.findUnique({
        where: {
            id: parseInt(bbsId),// string型 → number型 整数型に変換
        },
    });
    return NextResponse.json(bbsDetailData);
}