"use client";

import React from "react";

function ArticlesCard({ article }) {
  // 게시글 기본 이미지
  const thumbnailImg = article.thumbnailImg || "/assets/product.svg";

  // 날짜 서식
  const createdAt = new Date(article.createdAt);
  const date = `${createdAt.getFullYear()}.
  ${String(createdAt.getMonth() + 1).padStart(2, "0")}.
  ${String(createdAt.getDate()).padStart(2, "0")}`;

  return (
    <article className="bg-[#fcfcfc] w-full border-b border-gray-200 pb-[24px] px-1.5 pt-1.5">
      {/* 제목 + 기본 이미지 */}
      <div className="flex justify-between">
        <p className="text-18-600 md:!text-20-600">{article.title}</p>
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
          <span className="text-14-400 text-gray-600">
            {article.user.nickname}
          </span>
          <span className="text-14-400 text-gray-400">{date}</span>
        </div>
        {/* 좋아요 아이콘 */}
      </div>
    </article>
  );
}

export default ArticlesCard;
