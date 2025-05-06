"use client";

import React, { useEffect, useState } from "react";
import Search from "@/components/Search";
import Button from "./../../../src/components/Button";
import SelectBox from "@/components/SelectBox";
import ArticlesCard from "./_components/ArticlesCard";
import { Title20 } from "@/components/text/text";
import Link from "next/link";

function Articles() {
  const [articles, setArticles] = useState([]); // 데이터 소환
  const [sortOption, setSortOption] = useState("최신순"); // 정렬
  const [searchText, setSearchText] = useState(""); // 검색

  // 백엔드 데이터 소환
  const fetchArticles = async () => {
    const sort = sortOption === "좋아요순" ? "likes" : ""; // 정렬 옵션
    const encodedSearchText = encodeURIComponent(searchText);

    try {
      const response = await fetch(
        `http://localhost:3002/articles?sort=${sort}&search=${encodedSearchText}`
      );
      if (!response.ok) throw new Error(response.status);

      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  // 정렬 옵션 바뀌면 Re-Rendering
  useEffect(() => {
    fetchArticles();
  }, [sortOption, searchText]);

  return (
    <section>
      {/* 제목 + 글쓰기 버튼 */}
      <div className="flex justify-between items-center mb-4 md:mb-12">
        <Title20 color="gray900">게시글</Title20>
        <Link href="/articles/post">
          <Button size="md">글쓰기</Button>
        </Link>
      </div>

      {/* 검색창 + 선택 상자 */}
      <div className="flex justify-between gap-2.5 mb-4 md:mb-6">
        <Search className="grow" value={searchText} onChange={setSearchText} />
        <SelectBox onClick={setSortOption} />
      </div>

      <div className="flex flex-col gap-6">
        {/* 게시글 목록 */}
        {articles.map((article) => (
          <Link key={article.id} href={`articles/${article.id}`}>
            <ArticlesCard article={article} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Articles;
