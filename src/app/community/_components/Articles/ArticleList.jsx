"use client";

import { getArticles } from "@/service/articleService";
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
    try {
      const { list } = await getArticles(params);

      setArticles(list);
    } catch (e) {
      console.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 게시글 전체 조회
  useEffect(() => {
    articlesLoad(params);
  }, [params]);

  // 렌더링(정렬 선택)
  const changeOrderByInParams = (orderBy) => {
    if (params.orderBy === orderBy) return;
    setParams((prevParams) => ({ ...prevParams, offset: 1, orderBy }));
  };

  // 렌더링(검색)
  const changeKeywordInParams = (keyword) => {
    if (params.keyword === keyword) return;
    setParams((prevParams) => ({ ...prevParams, offset: 1, keyword }));
  };

  return (
    <>
      <NavBar
        changeKeywordInParams={changeKeywordInParams}
        changeOrderByInParams={changeOrderByInParams}
      />
      <div className="flex flex-col gap-[24px]">
        {isLoading ? (
          <div className="flex justify-center items-center">
            게시글 로딩중...
          </div>
        ) : !articles.length ? (
          <div className="flex justify-center items-center text-center">
            아직 게시글이 없어요,
            <br />
            지금 게시글을 작성해보세요!
          </div>
        ) : (
          articles.map((article) => (
            <AriclesLoad key={article.id} article={article} />
          ))
        )}
      </div>
    </>
  );
}
