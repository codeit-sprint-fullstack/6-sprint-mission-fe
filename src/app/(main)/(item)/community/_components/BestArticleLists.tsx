"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BestArticleCard from "./BestArticleCard";
import { articleService } from "@/lib/services/api/articleService";

export default function BestArticleLists() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await articleService.getArticles(1, 1, "like", "");
      setArticles(data.list);
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center gap-5">
      {articles?.map((article: any) => {
        return (
          <Link key={article.id} href={`/community/${article.id}`}>
            <BestArticleCard key={article.id} article={article} />
          </Link>
        );
      })}
    </div>
  );
}
