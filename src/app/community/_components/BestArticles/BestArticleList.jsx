"use client";

import { getArticles } from "@/lib/api/article.api";
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

  const bestArticlesLoad = async () => {
    const { list } = await getArticles(params);

    setIsLoading(false);
    return setBestArticles(list);
  };

  // 베스트 게시글 조회
  useEffect(() => {
    bestArticlesLoad(params);
  }, [params]);

  return (
    <div className="flex flex-col gap-[16px]">
      <h2 className="font-bold text-[20px]">베스트 게시글</h2>
      <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 md:grid-cols-3 md:gap-[24px]">
        {isLoading
          ? "베스트 게시글 로딩중..."
          : bestArticles.map((bestArticle) => (
              <BestArticlesLoad
                key={bestArticle.id}
                bestArticle={bestArticle}
              />
            ))}
      </div>
    </div>
  );
}
