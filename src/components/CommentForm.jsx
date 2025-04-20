// CommentForm.jsx
import React, { useState } from "react";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";

const Comment = ({ author, time, content }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="w-full border-b border-gray-200 bg-secondary-100 py-4 relative">
      <div className="flex justify-between">
        <p className="text-base font-semibold text-gray-800">{content}</p>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-sm text-gray-500 bg-transparent px-2 py-1 rounded-lg"
          >
            <BsThreeDotsVertical className="text-gray-400 h-5 w-5 cursor-pointer" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-[140px] bg-white border border-gray-300 rounded-lg z-10">
              <ul>
                <li className="px-4 py-2 text-center text-secondary-500 hover:bg-gray-100">
                  수정하기
                </li>
                <li className="px-4 py-2 text-center text-secondary-500 hover:bg-gray-100">
                  삭제하기
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center mt-4">
        <div className="relative w-8 h-8 mr-3">
          <Image
            src="/images/products/userProfile.png"
            alt="작성자 프로필"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-800">{author}</span>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
      </div>
    </div>
  );
};

export { Comment };
