"use client";

import { useState } from "react";
import Image from "next/image";
import { FaRegHeart, FaHeart, FaEllipsisV } from "react-icons/fa";

export default function ArticleHeader({ article, onToggleLike, isLiked }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="mb-6 flex w-full justify-between border-b border-[#e5e7eb] pb-4">
      {/* 타이틀, 작성자 정보 */}
      <div className="flex min-w-[95%] flex-col gap-4">
        {/* 타이틀 */}
        <div className="max-w-[90%] text-[20px] font-bold text-[#1f2937]">
          {article.data?.title}
        </div>

        {/* 작성자 정보 */}
        <div className="flex items-center">
          {/* 프로필, 이름, 날짜 */}
          <div className="flex items-center border-r border-[#e5e7eb] pr-8">
            <figure className="relative h-[40px] w-[40px]">
              <Image
                src="/img/user_icon.png"
                alt="프로필"
                fill
                sizes="40px"
                className="object-cover"
              />
            </figure>
            <div className="ml-4">
              <span className="mr-1 text-[14px] font-medium text-gray-600">
                판다판다
              </span>
              <span className="text-[14px] font-medium text-[#9ca3af]">
                {article.data?.createdAt
                  ? new Date(article.data.createdAt).toLocaleDateString()
                  : "2024. 01. 02"}
              </span>
            </div>
          </div>

          {/* 좋아요 */}
          <div className="flex items-center pl-8">
            <div className="flex items-center rounded-full border-2 border-[#e5e7eb]">
              <button
                onClick={onToggleLike}
                className="flex cursor-pointer items-center px-3 py-1 text-[28px] text-gray-500 hover:text-red-500"
              >
                {isLiked ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
                <span className="ml-1 text-[16px] font-medium text-gray-500">
                  {article.data?.likes || 123}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 3단 메뉴 버튼 */}
      <div className="relative">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="cursor-pointer text-[#9ca3af]"
        >
          <FaEllipsisV />
        </button>
        {showOptions && (
          <div className="absolute right-0 z-10 w-[100px] rounded-md border-2 border-[#e5e7eb] bg-white py-1 md:w-[140px]">
            <button className="flex w-full cursor-pointer items-center justify-center px-4 py-2 text-left text-sm text-[#6b7280] transition-colors hover:text-blue-500">
              수정하기
            </button>
            <button className="flex w-full cursor-pointer items-center justify-center px-4 py-2 text-left text-sm text-[#6b7280] transition-colors hover:text-red-500">
              삭제하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
