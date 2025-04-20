import React, { useState } from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs"; // 아이콘 import

export default function ArticleDetail() {
  const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 상태 관리

  // 하드코딩된 게시글 데이터
  const post = {
    id: 1,
    title: "맥북 16인치 16기가 테라 정도 사양이면 얼마에 팔아야 하나요?",
    author: "총명한판다",
    date: "2024.01.02",
    content: "맥북 16인치 16기가 테라 정도 사양이면 얼마에 팔아야 하나요?",
    heartCount: "123",
    usericon: "/images/products/userProfile.png",
  };

  // 드롭다운 메뉴 토글 함수
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="max-w-[1200px] mx-auto p-6 bg-white rounded-lg">
      {/* 제목과 드롭다운 버튼을 가로로 배치 */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
        {/* 드롭다운 아이콘 (BsThreeDotsVertical) */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-sm text-gray-500 bg-transparent px-4 py-2 rounded-lg"
          >
            <BsThreeDotsVertical className="h-5 w-5 text-gray-400" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-[140px] bg-white border border-gray-300 rounded-lg ">
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

      {/* 작성자 아이콘, 이름, 날짜, 좋아요 아이콘 */}
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

        {/* 세로선과 좋아요 버튼 */}
        <div className="flex items-center space-x-2 ">
          <div className="h-8 border-l border-gray-300 mx-4"></div>{" "}
          {/* 세로선 */}
          <div className="flex items-center w-[87px] h-10 px-3 py-2 rounded-[35px] border border-secondary-200">
            <CiHeart className="h-6 w-6" />
            <span className="text-base text-gray-500 ml-1">
              {post.heartCount}
            </span>
          </div>
        </div>
      </div>

      {/* 게시글 내용 */}
      <div className="mt-6 text-lg text-gray-700">
        <p>{post.content}</p>
      </div>
    </div>
  );
}
