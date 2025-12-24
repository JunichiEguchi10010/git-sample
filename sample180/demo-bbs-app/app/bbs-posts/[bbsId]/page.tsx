import { BBSData } from "@/app/types/types";
import React from "react"; // 6.9k(gzipped: 2.7k) 6.9k	minified された JS のサイズ 2.7k gzip 圧縮後に実際に送信されるサイズ

// 「掲示板（BBS）の投稿詳細ページ」 のページコンポーネント
async function getDetailBBSData(id: number) {
  const response = await fetch(`http://localhost:3000/api/post/${id}`, {
    cache: "no-store",
  });
  const bbsDetailData: BBSData = await response.json();
  return bbsDetailData;
}

// パラメーターを受け取る
const BBSDetailPage = async ({ params }: { params: { bbsId: number } }) => {
  // bbsIdは「[bbsId]」と同じ名前で受け取る
  const bbsDetailData = await getDetailBBSData(params.bbsId);
  const { title, content, username } = bbsDetailData; // 分割代入で取得したデータを表示する
  console.log(bbsDetailData);
  return (
    <div className="container max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{bbsDetailData.title}</h1>
        <p className="text-gray-700">{username}</p>
      </div>
      <div className="mb-6">
        <p className="text-gray-900">{content}</p>
      </div>
      <Link href="/" className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md">戻る</Link>
    </div>
  );
};
export default BBSDetailPage;
