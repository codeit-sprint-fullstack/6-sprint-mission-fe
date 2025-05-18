/**
 * 나중에 좋아요는 컴포넌트로 빼야 함!
 */

"use client";

import Likes from "@/components/Likes";
import ReportingDate from "@/components/text/Date";
import React from "react";

function ArticlesCard({ article }) {
  // 게시글 기본 이미지
  const thumbnailImage = article.thumbnailImage || "/assets/product.svg";

  return (
    <article className="bg-[#fcfcfc] w-full h-[138px] border-b border-gray-200 pb-[24px] px-1.5 pt-1.5">
      {/* 제목 + 이미지 */}
      <div className="flex justify-between mb-[10px]">
        <span className="text-gray-800 text-600-20">{article.title}</span>
        <img
          src={thumbnailImage}
          alt="thumbnail image"
          className="w-[72px] h-[72px] rounded-[8px]"
        />
      </div>

      <div className="flex justify-between items-center">
        {/* 프로필 사진 + 작성자 + 작성일자 */}
        <div className="flex gap-2 items-center">
          <img
            src="/assets/default_img.svg"
            alt="기본 프로필 사진"
            className="w-[24px]"
          />
          <span className="text-gray-600 text-400-14">
            {article.author.nickname}
          </span>
          <ReportingDate createdAt={article.createdAt} />
        </div>
        {/* 좋아요 아이콘 */}
        <Likes type="article" id={article.id} initialCount={article.likes} />
      </div>
    </article>
  );
}

export default ArticlesCard;
