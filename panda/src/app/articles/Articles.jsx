"use client";

import React, { useEffect, useState } from "react";
import Search from "@/components/Search";
import Button from "./../../../src/components/Button";
import SelectBox from "@/components/SelectBox";
import ArticlesCard from "./_components/ArticlesCard";

function Articles() {
  const [articles, setArticles] = useState([]);

  // 백엔드 데이터 소환
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:3002/articles");
        if (!response.ok) throw new Error(response.status);

        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section>
      {/* 제목 + 글쓰기 버튼 */}
      <div className="flex justify-between items-center mb-4 md:mb-12">
        <h2 className="text-18-700 md:!text-[20px] text-gray-900">게시글</h2>
        <Button size="md">글쓰기</Button>
      </div>

      {/* 검색창 + 선택 상자 */}
      <div className="flex justify-between gap-2.5 mb-4 md:mb-6">
        <Search className="grow" />
        <SelectBox />
      </div>

      <div className="flex flex-col gap-6">
        {/* 게시글 목록 */}
        {articles.map((article) => {
          return <ArticlesCard key={article.id} article={article} />;
        })}
      </div>
    </section>
  );
}

export default Articles;
