"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ArticleCard from "./ArticleCard";
import { articleService } from "@/lib/services/api/articleService";

export default function ArticleLists({ searchValueState }: { searchValueState: string }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await articleService.getArticles(
        1,
        3,
        "like",
        searchValueState
      );
      setArticles(data.list);
    };

    fetchData();
  }, []);

  return (
    <>
      {articles?.map((article: any) => {
        return (
          <Link key={article.id} href={`/community/${article.id}`}>
            <ArticleCard article={article} />
          </Link>
        );
      })}
    </>
  );
}
