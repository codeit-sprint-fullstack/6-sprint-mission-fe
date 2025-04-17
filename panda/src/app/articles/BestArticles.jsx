"use client";

import React, { useEffect, useState } from "react";
import BestArticlesCard from "./_components/BestArticlesCard";

function BestArticles() {
  const [articles, setArticles] = useState([]);
  const [limit, setLimit] = useState(0); // 카드 수

  // 화면 크기에 따라 카드 불러오는 개수 변경
  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;

      if (width <= 744) {
        setLimit(1);
      } else if (width > 744 && width < 1200) {
        setLimit(2);
      } else {
        setLimit(3);
      }
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);

    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  // 백엔드 데이터 소환
  useEffect(() => {
    if (limit === 0) return; // 처음 페이지 들어갔을 때 전체 목록 출력 방지

    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/articles?sort=likes&limit=${limit}`
        );

        if (!response.ok) throw new Error(response.status);
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, [limit]);

  return (
    <section className="mb-10">
      <h2 className="text-18-700 md:!text-[20px] text-gray-900 mb-4">
        베스트 게시글
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
        {articles.map((article) => {
          return <BestArticlesCard key={article.id} article={article} />;
        })}
      </div>
    </section>
  );
}

export default BestArticles;
