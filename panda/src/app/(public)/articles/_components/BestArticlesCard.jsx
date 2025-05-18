/** 나중에 좋아요는 컴포넌트 분리할 것! */

import Likes from "@/components/Likes.jsx";
import React, { useState } from "react";

import Image from "next/image";

import badge from "@/assets/badge.png";
import thumbnailImage from "@/assets/product.svg";
import ReportingDate from "@/components/text/Date";

function BestArticlesCard({ article }) {
  // 게시글 기본 이미지
  const image = article.thumbnailImage || thumbnailImage;

  return (
    <article className="bg-gray-50 rounded-[8px] relative px-[24px] py-[1px]">
      {/* BEST 뱃지 */}
      <Image src={badge} alt="best badge" className="absolute" />

      {/* 내용 */}
      <div className="flex flex-col mt-8 mb-4 gap-2.5">
        <div className="flex flex-row justify-between items-center gap-2">
          {/* 제목 + 바탕 이미지 */}
          <span className="text-gray-800 text-600-18 lg:text-600-20">
            {article.title}
          </span>
          <img
            src={image}
            alt="thumbnail image"
            className="fill w-[72px] h-[72px] border-gray-200 rounded-[6px]"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* 작성자 */}
            <span className="text-gray-600 text-400-14">
              {article.author.nickname}
            </span>
            <Likes
              type="article"
              id={article.id}
              initialCount={article.likes}
            />
          </div>
          <ReportingDate createdAt={article.createdAt} />
        </div>
      </div>
    </article>
  );
}

export default BestArticlesCard;
