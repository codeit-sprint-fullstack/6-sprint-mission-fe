"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getArticles } from "@/api/articles";
import ArticlesCard from "./_components/ArticlesCard";

import Button from "@/components/Button";
import SelectBox from "@/components/SelectBox";
import Search from "@/components/Search";
import offsetPagination from "@/components/offsetPagination";

function Articles() {
  const [orderBy, setOrderBy] = useState("최신순");
  const [searchText, setSearchText] = useState("");

  const { data, isPending, isError } = useQuery({
    queryKey: ["articles", orderBy],
    queryFn: () => getArticles({ orderBy }),
  });

  return (
    <section>
      {/* 제목 + 글쓰기 버튼 */}
      <div className="flex justify-between items-center mb-4 md:mb-12">
        <p className="text-700-20">게시글</p>
        <Link href="/articles/post">
          <Button size="md">글쓰기</Button>
        </Link>
      </div>
      {/* 검색창 + 선택 상자 */}
      <div className="flex justify-between gap-2.5 mb-4 md:mb-6">
        <Search className="grow" value={searchText} onChange={setSearchText} />
        <SelectBox onClick={setOrderBy} />
      </div>
      <div className="flex flex-col gap-6">
        {/* 게시글 목록 */}
        {data?.articles?.map((article) => (
          <Link key={article.id} href={`articles/${article.id}`}>
            <ArticlesCard article={article} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Articles;
