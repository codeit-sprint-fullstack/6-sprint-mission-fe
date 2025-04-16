import Image from "next/image";
import React from "react";
import ArticleCard from "./ArticleCard";
import dayjs from "dayjs";

function BestArticle({ articles }) {
  const article = articles[0];
  const date = article.createdAt;
  const formattedDate = dayjs(date).format("YYYY. MM. DD");

  return (
    <div>
      <h2 className="text-lg font-bold">베스트 게시글</h2>
      <article className="mt-4 mb-6 px-6 pb-4 bg-gray-50 rounded-lg">
        <Image
          src="/assets/img/img_badge.svg"
          alt="베스트 뱃지"
          width={102}
          height={30}
        />
        <ArticleCard title={article.title} createdAt={formattedDate} />
      </article>
    </div>
  );
}

export default BestArticle;
