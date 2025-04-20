import React, { useState } from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function ArticleDetail({ onSubmit }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      onSubmit(comment);
      setComment("");
    }
  };

  const post = {
    id: 1,
    title: "맥북 16인치 16기가 테라 정도 사양이면 얼마에 팔아야 하나요?",
    author: "총명한판다",
    date: "2024.01.02",
    content: "맥북 16인치 16기가 테라 정도 사양이면 얼마에 팔아야 하나요?",
    heartCount: "123",
    usericon: "/images/products/userProfile.png",
  };

  return (
    <div className="max-w-[1200px] mx-auto mt-9 bg-white rounded-lg">
      {/* 제목 */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-sm text-gray-500 bg-transparent px-4 py-2 rounded-lg"
          >
            <BsThreeDotsVertical className="h-5 w-5 text-gray-400" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-[140px] bg-white border border-gray-300 rounded-lg">
              <ul>
                <li className="px-4 py-2 text-center text-secondary-500 hover:bg-gray-100">수정하기</li>
                <li className="px-4 py-2 text-center text-secondary-500 hover:bg-gray-100">삭제하기</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 작성자 정보 */}
      <div className="flex items-center mt-4 text-sm text-gray-500 border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-8 h-8">
            <Image
              src={post.usericon}
              alt="Author"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex space-x-2">
            <div className="font-semibold">{post.author}</div>
            <div className="text-secondary-400">{post.date}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-8 border-l border-gray-300 mx-4"></div>
          <div className="flex items-center w-[87px] h-10 px-3 py-2 rounded-[35px] border border-secondary-200">
            <CiHeart className="h-6 w-6" />
            <span className="text-base text-gray-500 ml-1">{post.heartCount}</span>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="mt-6 text-lg text-gray-700">
        <p>{post.content}</p>
      </div>

      {/* 댓글 입력창 */}
      <div className="max-w-[1200px] mx-auto mt-6">
        <div className="text-xl font-semibold text-gray-800 mb-2">댓글달기</div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력해주세요"
          rows="4"
          className="w-full px-6 py-4 resize-none bg-gray-100 focus:outline-none placeholder-secondary-400 rounded-2xl"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            등록
          </button>
        </div>
      </div>

      
    </div>
  );
}
