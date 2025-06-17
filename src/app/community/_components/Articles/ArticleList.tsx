"use client";

import React, { useState } from "react";
import Article from "./Article";
import NavBar from "../NavBar/NavBar";
import { useQuery } from "@tanstack/react-query";
import { postService } from "@/service/postService";

type TArticleListParams = {
  offset: number;
  limit: number;
  orderBy: string;
  keyword: string;
};

type TArticles = {
  list: {
    likeCount: number;
    author: {
      nickname: string;
    };
    id: number;
    createdAt: Date;
    title: string;
    content: string;
  }[];
  totalCount: number;
};

export default function ArticleList() {
  const [params, setParams] = useState<TArticleListParams>({
    offset: 1,
    limit: 5,
    orderBy: "recent",
    keyword: "",
  });

  // 게시글 목록 조회
  const { data: articles, isPending } = useQuery<
    TArticles,
    Error,
    TArticles,
    [string, TArticleListParams]
  >({
    queryKey: ["articles", params],
    queryFn: () => postService.getPosts("articles", params),
  });

  // 렌더링(검색)
  const changeKeywordInParams = (keyword: string) => {
    if (params.keyword === keyword) return;
    setParams((prevParams) => ({ ...prevParams, offset: 1, keyword }));
  };

  // 렌더링(정렬 선택)
  const changeOrderByInParams = (orderBy: string) => {
    if (params.orderBy === orderBy) return;
    setParams((prevParams) => ({ ...prevParams, offset: 1, orderBy }));
  };

  return (
    <>
      <NavBar
        changeKeywordInParams={changeKeywordInParams}
        changeOrderByInParams={changeOrderByInParams}
      />
      <div className="flex flex-col gap-[24px]">
        {isPending ? (
          <div className="flex justify-center items-center gap-[8px]">
            <div className="size-[20px] border-[3px] border-t-[3px] border-secondary-gray-200 border-t-primary-100 rounded-full animate-spin"></div>
            <p className="font-medium">불러오는 중</p>
          </div>
        ) : !articles?.list?.length ? (
          <div className="flex justify-center items-center text-center">
            아직 게시글이 없어요,
            <br />
            지금 게시글을 작성해보세요!
          </div>
        ) : (
          articles?.list?.map((article) => (
            <Article key={article.id} article={article} />
          ))
        )}
      </div>
    </>
  );
}
