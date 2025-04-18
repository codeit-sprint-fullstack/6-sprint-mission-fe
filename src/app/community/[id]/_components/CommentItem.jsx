"use client";

import { useState } from "react";
import Image from "next/image";
import { FaEllipsisV } from "react-icons/fa";

export default function CommentItem({
  comment,
  showEditDeleteButtons = false,
}) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <li className="flex w-full border-b border-[#e5e7eb] pb-4">
      <div className="w-full">
        <p className="text-md mb-6 text-gray-700">{comment.content}</p>

        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <figure className="relative mr-2 h-8 w-8 overflow-hidden rounded-full bg-gray-200">
              <Image
                src="/img/user_icon.png"
                alt="프로필"
                fill
                sizes="32px"
                className="object-cover"
              />
            </figure>
            <div className="ml-2 flex flex-col gap-2">
              <span className="mr-2 text-sm font-medium text-gray-600">
                {comment.author || "독특한판다"}
              </span>
              <span className="text-xs text-gray-400">
                {comment.createdAt
                  ? new Date(comment.createdAt).toLocaleDateString()
                  : "1시간 전"}
              </span>
            </div>
          </div>
        </div>
      </div>

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
    </li>
  );
}
