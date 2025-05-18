"use client";

import React, { useEffect, useState } from "react";
import BestArticlesCard from "./_components/BestArticlesCard";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getBestArticles } from "@/api/articles";

function BestArticles() {
  const [limit, setLimit] = useState(0); // 게시글 수

  // 게시글 수 - 반응형
  useEffect(() => {
    const updateLimit = () => {
      let width = window.innerWidth;

      if (744 > width) {
        setLimit(1);
      } else if (width >= 744 && width < 1200) {
        setLimit(2);
      } else {
        setLimit(3);
      }
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  const {
    data: articles,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["articles", limit],
    queryFn: () => getBestArticles(limit),
    enabled: limit > 0,
  });

  return (
    <section className="mb-10">
      <p className="mb-4 text-gray-900 text-700-20">베스트 게시글</p>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
        {articles?.map((article) => (
          <Link key={article.id} href={`/articles/${article.id}`}>
            <BestArticlesCard article={article} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default BestArticles;
