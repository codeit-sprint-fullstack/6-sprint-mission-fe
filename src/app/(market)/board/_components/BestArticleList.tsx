"use client";

import ArticleCard from "./ArticleCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useViewport } from "@/lib/hooks/useViewport";
import { useQuery } from "@tanstack/react-query";
import { BEST_ARTICLE_COUNT, BREAKPOINTS } from "@/constant";
import { getArticles } from "@/lib/service/getApi";
import { Article } from "@/types";
import { Badge } from "@/assets/svgs";

type TBestArticleList = {
  list: Article[];
};

function BestArticleList() {
  const [pageSize, setPageSize] = useState(BEST_ARTICLE_COUNT.pc);
  const windowWidth = useViewport();

  // 화면 너비 기준 보여줄 베스트 게시글 수
  useEffect(() => {
    if (windowWidth >= BREAKPOINTS.lg) {
      setPageSize(BEST_ARTICLE_COUNT.pc);
    } else if (windowWidth >= BREAKPOINTS.md) {
      setPageSize(BEST_ARTICLE_COUNT.tablet);
    } else {
      setPageSize(BEST_ARTICLE_COUNT.mobile);
    }
  }, [windowWidth]);

  // 베스트 게시글 목록 가져오기
  const { data: bestArticles } = useQuery<TBestArticleList, Error>({
    queryKey: ["articles", { page: 1, pageSize, orderBy: "like" }],
    queryFn: () => getArticles({ page: 1, pageSize, orderBy: "like" }),
  });

  return (
    <section>
      <h2 className="text-lg font-bold">베스트 게시글</h2>
      <div className="lg-gap-6 flex justify-center md:gap-4">
        {bestArticles?.list.map((article) => (
          <article
            key={article.id}
            className="mt-4 mb-6 w-[343px] rounded-lg bg-gray-50 px-6 pb-4 md:w-[340px] lg:w-[384px]"
          >
            <Badge aria-label="베스트 뱃지" className="mb-4" />
            <Link key={article.id} href={`/board/${article.id}`}>
              <ArticleCard key={article.id} article={article} isBest={true} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BestArticleList;
