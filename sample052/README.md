React Next.js TypeScript CSR SSR SSG について 20250427

手法	                                     特徴	                                             主な用途	                                             実装方法
CSR (Client Side Rendering)	                クライアント側でデータを取得し、レンダリングする    	ユーザーごとのデータ表示や頻繁なデータ更新が必要なページ	 useEffectでデータ取得
SSR (Server Side Rendering)	                リクエストごとにサーバーでデータを取得し、HTMLを生成	常に最新のデータが必要なページやSEOが重要なページ	        getServerSideProps
SSG (Static Site Generation)	            ビルド時にデータを取得し、静的なHTMLを生成	           更新頻度が低く、パフォーマンスが重要なページ	               getStaticProps
ISR (Incremental Static Regeneration)	    静的生成に再生成の仕組みを加えた手法	               定期的なデータ更新が必要なページ	                          getStaticProps + revalidate


使い分けの考え方
ユーザーごとのデータ表示や頻繁なデータ更新が必要なページ：​CSR​

SEOが重要で、常に最新のデータが必要なページ：​SSR

更新頻度が低く、パフォーマンスが重要なページ：​SSG

定期的なデータ更新が必要なページ：​ISR


サンプルコード
1. SSR（Server Side Rendering）
// pages/ssr.tsx
<!-- getServerSideProps を使う -->
import { GetServerSideProps } from 'next';

type Data = {
  message: string;
};

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async () => {
  const res = await fetch('https://api.example.com/data');
  const data: Data = await res.json();
  return { props: { data } };
};

export default function Page({ data }: { data: Data }) {
  return <div>{data.message}</div>;
}
このコードでは、getServerSidePropsを使用してサーバー側でデータを取得し、ページに渡しています。​
リクエストごとに最新のデータを取得できるため、リアルタイム性が求められるページに適しています。​



2. SSG（Static Site Generation）
// pages/ssg.tsx
<!-- getStaticProps を使う -->
import { GetStaticProps } from 'next';

type Data = {
  message: string;
};

export const getStaticProps: GetStaticProps<{ data: Data }> = async () => {
  const res = await fetch('https://api.example.com/data');
  const data: Data = await res.json();
  return { props: { data } };
};

export default function Page({ data }: { data: Data }) {
  return <div>{data.message}</div>;
}
このコードでは、getStaticPropsを使用してビルド時にデータを取得し、静的なページを生成しています。​
更新頻度が低く、パフォーマンスが重要なページに適しています。​



3. CSR（Client Side Rendering）
// pages/csr.tsx
<!-- useEffect, useState を使う -->
import { useEffect, useState } from 'react';

type Data = {
  message: string;
};

export default function Page() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then((res) => res.json())
      .then((data: Data) => setData(data));
  }, []);

  if (!data) return <div>Loading...</div>;
  return <div>{data.message}</div>;
}
このコードでは、クライアント側でデータを取得し、レンダリングしています。​
ユーザーごとのデータ表示や頻繁なデータ更新が必要なページに適しています。



​4. ISR (Incremental Static Regeneration)
// pages/blog/[id].tsx
<!-- GetStaticProps､revalidate を使う -->
import { GetStaticProps } from 'next';

interface Post {
  id: string;
  title: string;
  content: string;
}

interface Props {
  post: Post;
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const res = await fetch(`https://api.example.com/posts/${params?.id}`);
  const post: Post = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to fetch post, received status ${res.status}`);
  }

  return {
    props: { post },
    revalidate: 60, // 60秒ごとに再生成
  };
};

export default function BlogPost({ post }: Props) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}
このコードでは、getStaticProps内でAPIからデータを取得し、revalidateを60秒に設定しています。​
これにより、初回アクセス時に静的ページが生成され、その後60秒ごとにバックグラウンドで再生成されます。​


SSR（Server Side Rendering）の事例
TypescriptとNext.jsをアプリ開発しながら学んでみよう【Typescript入門】
https://www.youtube.com/watch?v=MZclBqhCB6A