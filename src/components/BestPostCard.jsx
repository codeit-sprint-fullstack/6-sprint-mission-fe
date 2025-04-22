import Image from "next/image";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaMedal } from "react-icons/fa";

export default function BestPostCard({ post }) {
  return (
    <article className="w-[384px] h-[169px] bg-secondary-50 px-6 py-4 rounded-lg flex flex-col justify-between">
      {/* Top: 뱃지 */}
      <span className="inline-flex items-center gap-1 text-base font-semibold text-white bg-primary-100 rounded-b-2xl px-6 py-0.5 w-fit">
        <FaMedal className="text-yellow-400 text-base" />
        Best
      </span>

      {/* Middle: 제목 + 이미지 */}
      <div className="flex justify-between items-start gap-4">
        {/* 제목 */}
        <h3 className="text-xl font-semibold text-secondary-800">
          {post.title}
        </h3>

        {/* 썸네일 */}
        <div className="flex justify-center items-center w-[72px] h-[72px] rounded-md border border-gray-200 shrink-0">
          <div className="relative w-[48px] h-[44.57px]">
            <Image
              src={post.imageUrl}
              alt="썸네일"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Bottom: 작성자, 좋아요, 날짜 */}
      <div className="flex justify-between items-center text-sm font-normal text-secondary-600 pt-2">
        {/* 왼쪽: 작성자 + 좋아요 */}
        <div className="flex items-center gap-3">
          <span className="truncate">{post.author}</span>
          <span className="flex items-center gap-1">
            <AiOutlineHeart className="text-secondary-400" />
            {post.likes.toLocaleString()}+
          </span>
        </div>

        {/* 오른쪽: 날짜 */}
        <span>{post.date}</span>
      </div>
    </article>
  );
}
