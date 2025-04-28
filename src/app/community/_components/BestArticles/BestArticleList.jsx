"use client";

import { getArticles } from "@/service/article-service";
import React, { useEffect, useState } from "react";
import { useGetDeviceType } from "@/hooks/useGetDeviceType";
import BestArticlesLoad from "./BestArticlesLoad";

export default function BestArticleList() {
  const [bestArticles, setBestArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState({
    offset: 1,
    limit: null,
    orderBy: "recent",
    keyword: "",
  });

  // 반응형 리퀘스트 보내기
  useGetDeviceType(setParams);

  const bestArticlesLoad = async (params) => {
    if (!params.limit) return;

    const { list } = await getArticles(params);

    setBestArticles(list);
    setIsLoading(false);
  };

  // 베스트 게시글 조회
  useEffect(() => {
    bestArticlesLoad(params);
  }, [params]);

  return (
    <div className="flex flex-col gap-[16px]">
      <h2 className="font-bold text-[20px]">베스트 게시글</h2>
      {isLoading ? (
        <div className="flex justify-center items-center">
          베스트 게시글 로딩중...
        </div>
      ) : !bestArticles.length ? (
        <div className="flex justify-center items-center text-center">
          아직 게시글이 없어요,
          <br />
          지금 게시글을 작성해보세요!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 md:grid-cols-3 md:gap-[24px]">
          {bestArticles.map((bestArticle) => (
            <BestArticlesLoad key={bestArticle.id} bestArticle={bestArticle} />
          ))}
        </div>
      )}
    </div>
  );
}
