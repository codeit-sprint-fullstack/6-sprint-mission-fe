"use client";

import React, { useState } from "react";
import useGetDeviceType from "@/hooks/useGetDeviceType";
import BestArticle from "./BestArticle";
import { useQuery } from "@tanstack/react-query";
import { postService } from "@/service/postService";

type TParams = {
  offset: number;
  limit: number;
  orderBy: string;
  keyword: string;
};

type TBestArticles = {
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

export default function BestArticleList() {
  const [params, setParams] = useState<TParams>({
    offset: 1,
    limit: 0,
    orderBy: "like",
    keyword: "",
  });

  // 반응형 리퀘스트 보내기
  useGetDeviceType(setParams, "bestArticles");

  // 베스트 게시글 조회
  const { data: bestArticles, isPending } = useQuery<
    TBestArticles,
    Error,
    TBestArticles,
    [string, TParams]
  >({
    queryKey: ["bestArticles", params],
    queryFn: () => postService.getPosts("articles", params),
    enabled: !!params.limit,
  });

  return (
    <div className="flex flex-col gap-[16px]">
      <h2 className="font-bold text-[20px]">베스트 게시글</h2>
      {isPending ? (
        <div className="flex justify-center items-center gap-[8px]">
          <div className="size-[20px] border-[3px] border-t-[3px] border-secondary-gray-200 border-t-primary-100 rounded-full animate-spin"></div>
          <p className="font-medium">불러오는 중</p>
        </div>
      ) : !bestArticles?.list?.length ? (
        <div className="flex justify-center items-center text-center">
          아직 게시글이 없어요,
          <br />
          지금 게시글을 작성해보세요!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 md:grid-cols-3 md:gap-[24px]">
          {bestArticles?.list?.map((bestArticle) => (
            <BestArticle key={bestArticle.id} bestArticle={bestArticle} />
          ))}
        </div>
      )}
    </div>
  );
}
