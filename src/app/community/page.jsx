"use client";

import { useEffect } from "react";
import ArticleList from "./_components/ArticleList";
import BestArticleList from "./_components/BestArticleList";
import NavBar from "./_components/NavBar";

export default function CommunityPage() {
  // 렌더링(정렬 선택)
  const sortLoad = (orderBy) => {
    if (params.orderBy === orderBy) return;
    setParams((prevParams) => ({ ...prevParams, page: 1, orderBy }));
  };

  // 렌더링(검색)
  const searchLoad = (keyword) => {
    if (params.keyword === keyword) return;
    setParams((prevParams) => ({ ...prevParams, page: 1, keyword }));
  };

  return (
    <>
      <div className="flex justify-center items-center p-[16px] sm:p-[24px]">
        <div className="flex flex-col w-full max-w-[1200px] ">
          <BestArticleList />
          <NavBar searchLoad={searchLoad} sortLoad={sortLoad} />
          <ArticleList />
        </div>
      </div>
    </>
  );
}
