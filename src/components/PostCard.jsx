import Image from "next/image";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

function PostCard({ post }) {
  return (
    <article className="w-[1200px] min-h-[138px] bg-gray-50 rounded-lg flex flex-col justify-between border-b border-gray-200">
      {/* 상단: 제목 + 썸네일 */}
      <div className="flex justify-between items-start">
        {/* 제목 */}
        <h3 className="text-xl font-semibold text-secondary-800">
          {post.title}
        </h3>
        {/* 썸네일 */}
        <div className="flex justify-center items-center w-[72px] h-[72px] rounded-md border border-gray-200 shrink-0 overflow-hidden">
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

      {/* 하단: 작성자 + 날짜 + 좋아요 */}
      <div className="flex justify-between items-center font-normal text-sm text-secondary-400">
        {/* 작성자 + 프로필 + 날짜 */}
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6">
            <Image
              src="/images/profile.png"
              alt="프로필"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span>{post.author}</span>
          <span>{post.date}</span>
        </div>

        {/* 좋아요 */}
        <span className="flex items-center gap-1 text-base">
          <AiOutlineHeart className="text-secondary-500" />
          {post.likes.toLocaleString()}+
        </span>
      </div>
    </article>
  );
}

export default PostCard;
