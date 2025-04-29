"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ArticleCard from "./ArticleCard";
import { articleService } from "@/lib/services/api/articleService";

export default function ArticleLists({ searchValueState }) {
  const [articlesState, setArticlesState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await articleService.getArticles(
        1,
        3,
        "likes",
        searchValueState
      );
      setArticlesState(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {articlesState?.map((article) => {
        return (
          <Link key={article.id} href={`/community/${article.id}`}>
            <ArticleCard article={article} />
          </Link>
        );
      })}
    </>
  );
}
