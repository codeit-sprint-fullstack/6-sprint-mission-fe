"use client";

import Image from "next/image";
import ArticleCard from "./ArticleCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BEST_ARTICLE_COUNT, BREAKPOINTS } from "@/const";
import { useViewport } from "@/lib/hooks/useViewport";
import { getArticles } from "@/lib/getApi";
import { useQuery } from "@tanstack/react-query";

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
  const { data: bestArticles } = useQuery({
    queryKey: ["articles", { page: 1, pageSize, orderBy: "like" }],
    queryFn: () => getArticles({ page: 1, pageSize, orderBy: "like" }),
    suspense: true,
  });

  return (
    <section>
      <h2 className="text-lg font-bold">베스트 게시글</h2>
      <div className="flex justify-center md:gap-4 lg-gap-6">
        {bestArticles?.list.map((article) => (
          <article
            key={article.id}
            className="w-[343px] md:w-[340px] lg:w-[384px] mt-4 mb-6 px-6 pb-4 bg-gray-50 rounded-lg"
          >
            <Image
              src="/assets/img/img_badge.svg"
              alt="베스트 뱃지"
              width={102}
              height={30}
              className="mb-4"
            />
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
