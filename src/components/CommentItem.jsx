"use client";

import React from "react";
import Image from "next/image";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function CommentItem({ comment }) {
  return (
    <div className="relative w-full max-w-[1200px] h-[100px] bg-gray-50 pb-3 border-b border-secondary-200">
      {/* 점 세 개 버튼 */}
      <button
        className="absolute top-1 right-1 text-secondary-400 hover:text-secondary-600"
        aria-label="댓글 옵션 열기"
        onClick={() => console.log("옵션 열기")}
      >
        <HiOutlineDotsVertical size={24} />
      </button>

      {/* 댓글 내용 */}
      <div className="text-[14px] font-[400] text-secondary-800 mb-6">
        {comment.content}
      </div>

      {/* 작성자 정보 */}
      <div className="flex items-center gap-3 text-xs font-[400] text-secondary-600">
        <div className="relative w-[32px] h-[32px]">
          <Image
            src="/images/profile.png"
            alt="profile"
            className="object-cover"
            fill
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>
            {comment.author}
          </span>
          <span className="text-secondary-400">{comment.time}</span>
        </div>
      </div>
    </div>
  );
}
