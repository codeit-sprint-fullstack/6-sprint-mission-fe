"use client";

import { getArticles } from "@/lib/api/article.api";
import React, { useEffect, useState } from "react";
import AriclesLoad from "./ArticlesLoad";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState({
    offset: 1,
    limit: 5,
    orderBy: "recent",
    keyword: "",
  });

  const articlesLoad = async () => {
    const { list } = await getArticles(params);

    setIsLoading(false);
    return setArticles(list);
  };

  useEffect(() => {
    articlesLoad(params);
  }, [params]);

  return (
    <div className="flex flex-col gap-[24px]">
      {isLoading
        ? "게시글 로딩중..."
        : articles.map((article) => (
            <AriclesLoad key={article.id} article={article} />
          ))}
    </div>
  );
}
