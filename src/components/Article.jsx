"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { useRouter } from "next/navigation";

export default function Articles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("최신순");

  const router = useRouter();

  // 글쓰기 버튼 클릭 시 페이지 이동
  const handleWritePost = () => {
    router.push("/articles/createArticle");
  };

  const articles = [
    {
      id: 1,
      title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
      imgUrl: "/images/products/macbook.png",
      author: "총명한판다",
      heartCount: "9999+",
      date: "2024. 04. 16",
      usericon: "/images/products/userProfile.png",
    },
    {
      id: 2,
      title: "아이폰 13 프로 256GB, 가격은 얼마일까요?",
      imgUrl: "/images/products/macbook.png",
      author: "비즈니스맨",
      heartCount: "1000+",
      date: "2024. 04. 15",
      usericon: "/images/products/userProfile.png",
    },
    {
      id: 3,
      title: "맥북 PRO VS 맥북 AIR 뭐가 더 합리적일까요?",
      imgUrl: "/images/products/macbook.png",
      author: "애플러버",
      heartCount: "500+",
      date: "2024. 04. 14",
      usericon: "/images/products/userProfile.png",
    },
  ];

  return (
    <div className="space-y-6 px-90">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">게시글</h2>
        {/* 글쓰기 버튼 */}
        <button
          className="bg-blue-500 font-semibold text-base text-white px-[23px] py-[11.5px] rounded-lg"
          onClick={handleWritePost} // 버튼 클릭 시 페이지 이동
        >
          글쓰기
        </button>
      </div>
      {/* 검색창과 필터 버튼 */}
      <div className="flex justify-between gap-4 items-center mb-4">
        {/* 검색창 */}
        <div className="flex items-center bg-secondary-100 p-2 rounded-xl w-full">
          <LuSearch className="text-secondary-400 mr-1 " />
          <input
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            className="w-full p-2 text-sm rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 필터 */}
        <div className="flex items-center space-x-2">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 rounded-md text-sm bg-gray-200"
          >
            <option value="최신순">최신순</option>
            <option value="좋아요순">좋아요순</option>
          </select>
        </div>
      </div>

      {/* 게시글 리스트 */}
      <div className="flex flex-col gap-4">
        {articles.map((post) => (
          <div
            key={post.id}
            className="flex flex-col bg-white  border-b border-gray-200"
          >
            <div className="flex justify-between items-center mb-3 gap-[6px]">
              <h3 className="font-semibold text-lg text-gray-900 w-[70%]">
                {post.title}
              </h3>
              <div className="flex justify-center items-center w-18 h-18 bg-white rounded-[6px] border border-solid border-gray-200">
                <div className="relative w-12 h-11">
                  <Image
                    src={post.imgUrl}
                    alt="Post Image"
                    fill
                    className=" object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center mt-2 text-gray-500 text-sm pb-[25px]">
              <div className="relative w-6 h-6">
                <Image
                  src={post.usericon}
                  alt="user Image"
                  fill
                  className=" object-cover"
                />
              </div>
              <span className="mr-2">{post.author}</span>
              <span>{post.date}</span>
              <div className="flex items-center ml-auto">
                <FaHeart className=" mr-1 " />
                <span className="mr-2">{post.heartCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
