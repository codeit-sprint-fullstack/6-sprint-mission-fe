/** 나중에 좋아요는 컴포넌트 분리할 것! */

import LikesToArticle from "@/components/LikesToArticle";
import ReportingDate from "@/components/text/Date";
import { Title20, UserName } from "@/components/text/text";
import React, { useState } from "react";

function BestArticlesCard({ article }) {
  // 게시글 기본 이미지
  const thumbnailImg = article.thumbnailImg || "/assets/product.svg";

  return (
    <article className="bg-gray-50 rounded-[8px] relative px-[24px] py-[1px]">
      {/* BEST 뱃지 */}
      <img src="/assets/badge.png" alt="best badge" className="absolute" />

      {/* 내용 */}
      <div className="flex flex-col mt-8 mb-4 gap-2.5">
        <div className="flex flex-row justify-between items-center gap-2">
          {/* 제목 + 바탕 이미지 */}
          <Title20 weight="weight600" color="gray800">
            {article.title}
          </Title20>
          <img
            src={thumbnailImg}
            alt="thumbnail image"
            className="w-[72px] h-[72px] border-gray-200 rounded-[6px]"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* 작성자 */}
            <UserName>{article.user.nickname}</UserName>
            <LikesToArticle
              articleId={article.id}
              initialCount={article.likesToArticle.length}
            />
            <ReportingDate createdAt={article.createdAt} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default BestArticlesCard;
