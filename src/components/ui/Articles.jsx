import React from "react";
import Article from "@/components/ui/Article";
import { getArticles } from "@/lib/api/article";
import Link from "next/link";

export default async function Articles() {
  const res = await getArticles();
  const articles = res.data;

  return (
    <div className="flex flex-col">
      {articles.map((article) => (
        <Link href={`/articles/${article.id}`}>
          <Article
            key={article.id}
            title={article.title}
            // 아직 사진을 넣고 post 하지 않음 imageUrl={article.imageUrl}
            createdAt={article.createdAt}
          />
        </Link>
      ))}
    </div>
  );
}
