"use client";

import React, { useEffect } from "react";
import Article from "@/components/ui/Article";
import { getArticles } from "@/lib/api/article";
import Link from "next/link";
import { useArticles } from "@/providers/ArticlesProvider";

export default function Articles() {
  const { order, articles, setArticles } = useArticles();

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await getArticles();
      setArticles(res.data);
    };
    fetchArticles();
  }, [setArticles]);

  const sortedArticles = [...articles].sort((a, b) => {
    if (order === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    //좋아요 순은 만들지 않음
    return 0;
  });

  return (
    <div className="flex flex-col">
      {sortedArticles.map((article) => (
        <Link href={`/articles/${article.id}`}>
          <Article
            key={article.id}
            title={article.title}
            createdAt={article.createdAt}
          />
        </Link>
      ))}
    </div>
  );
}
