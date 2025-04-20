"use client";

import { useEffect, useState } from "react";
import { getArticleLists } from "@/lib/services/api/article";
import ArticleCard from "./ArticleCard";
import Link from "next/link";

export default function ArticleLists({ searchValueState }) {
  const [articlesState, setArticlesState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArticleLists(1, 3, "likes", searchValueState);
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
