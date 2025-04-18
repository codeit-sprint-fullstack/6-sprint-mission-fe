"use client";

import { getArticles } from "@/lib/api/article.api";
import React, { useEffect, useState } from "react";
import AriclesLoad from "./ArticlesLoad";
import NavBar from "../NavBar/NavBar";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState({
    offset: 1,
    limit: 5,
    orderBy: "recent",
    keyword: "",
  });

  const articlesLoad = async (params) => {
    const { list } = await getArticles(params);

    setIsLoading(false);
    return setArticles(list);
  };

  // 게시글 전체 조회
  useEffect(() => {
    articlesLoad(params);
  }, [params]);

  // 렌더링(정렬 선택)
  const sortLoad = (orderBy) => {
    if (params.orderBy === orderBy) return;
    setParams((prevParams) => ({ ...prevParams, offset: 1, orderBy }));
  };

  // 렌더링(검색)
  const searchLoad = (keyword) => {
    if (params.keyword === keyword) return;
    setParams((prevParams) => ({ ...prevParams, offset: 1, keyword }));
  };

  return (
    <>
      <NavBar sortLoad={sortLoad} searchLoad={searchLoad} />
      <div className="flex flex-col gap-[24px]">
        {isLoading
          ? "게시글 로딩중..."
          : articles.map((article) => (
              <AriclesLoad key={article.id} article={article} />
            ))}
      </div>
    </>
  );
}
