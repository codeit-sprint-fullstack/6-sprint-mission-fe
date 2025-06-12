import React from "react";
import BestArticle from "@/components/ui/BestArticle";
import { getBestArticles } from "@/lib/article";
import Link from "next/link";

interface BestArticleType {
  id: number;
  title: string;
  imageUrl: string;
  createdAt: string;
}

export default async function BestList() {
  const res = await getBestArticles();
  const bestArticles: BestArticleType[] = res.data;

  return (
    <div className="flex flex-col font-pretendard">
      <div className="font-bold text-[20px]">베스트 게시글</div>

      <div className="flex flex-row justify-between mt-[24px] w-[384px] h-[169px] gap-[24px]">
        {bestArticles.map((article) => (
          <Link href={`/articles/${article.id}`} key={article.id}>
            <BestArticle
              title={article.title}
              imageUrl={article.imageUrl}
              createdAt={article.createdAt}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
