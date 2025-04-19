"use client";

import Image from "next/image";
import ArticleCard from "./ArticleCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ARTICLE_COUNT, BREAKPOINTS } from "@/const";

function BestArticle({ articles }) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 화면 너비 기준 보여줄 개수 결정
  const articleCount =
    windowWidth >= BREAKPOINTS.lg
      ? ARTICLE_COUNT.pc
      : windowWidth >= BREAKPOINTS.md
      ? ARTICLE_COUNT.tablet
      : ARTICLE_COUNT.mobile;
  const bestArticles = articles.slice(0, articleCount);

  return (
    <>
      <h2 className="text-lg font-bold">베스트 게시글</h2>
      <div className="flex justify-center md:gap-4 lg-gap-6">
        {bestArticles.map((article) => (
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
              <ArticleCard
                key={article.id}
                title={article.title}
                createdAt={article.createdAt}
                isBest={true}
              />
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}

export default BestArticle;
