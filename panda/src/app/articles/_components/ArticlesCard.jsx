/**
 * 나중에 좋아요는 컴포넌트로 빼야 함!
 */

"use client";

import ReportingDate from "@/components/text/Date";
import { Title20, UserName } from "@/components/text/text";
import React from "react";

function ArticlesCard({ article }) {
  // 게시글 기본 이미지
  const thumbnailImg = article.thumbnailImg || "/assets/product.svg";

  return (
    <article className="bg-[#fcfcfc] w-full border-b border-gray-200 pb-[24px] px-1.5 pt-1.5">
      {/* 제목 + 기본 이미지 */}
      <div className="flex justify-between">
        <Title20 weight="weight600" color="gray800">
          {article.title}
        </Title20>
        <img
          src={thumbnailImg}
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
          <UserName>{article.user.nickname}</UserName>
          <ReportingDate createdAt={article.createdAt} />
        </div>
        {/* 좋아요 아이콘 */}
      </div>
    </article>
  );
}

export default ArticlesCard;
