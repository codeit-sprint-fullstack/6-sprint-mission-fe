"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { LuSearch } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { fetchArticles } from "@/api/articles.api";

interface Article {
  id: number;
  title: string;
  imgUrl?: string;
  usericon?: string;
  author?: string;
  createdAt: string;
  heartCount?: number;
}

export default function Articles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("최신순");
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();

  const handleWritePost = () => {
    router.push("/articles/createArticle");
  };

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };

    getArticles();
  }, []);

  return (
    <div className="space-y-6 px-90">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">게시글</h2>
        <button
          className="bg-blue-500 font-semibold text-base text-white px-[23px] py-[11.5px] rounded-lg"
          onClick={handleWritePost}
        >
          글쓰기
        </button>
      </div>

      {/* 검색창 */}
      <div className="flex justify-between gap-4 items-center mb-4">
        <div className="flex items-center bg-secondary-100 p-2 rounded-xl w-full">
          <LuSearch className="text-secondary-400 mr-1" />
          <input
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            className="w-full p-2 text-sm rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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

      {/* 게시글 목록 */}
      <div className="flex flex-col gap-4">
        {articles.map((post) => (
          <div
            key={post.id}
            className="flex flex-col bg-white border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => router.push(`/articles/${post.id}`)}
          >
            <div className="flex justify-between items-center mb-3 gap-[6px]">
              <h3 className="font-semibold text-lg text-gray-900 w-[70%]">
                {post.title}
              </h3>
              <div className="flex justify-center items-center w-18 h-18 bg-white rounded-[6px] border border-solid border-gray-200">
                <div className="relative w-12 h-11">
                  <Image
                    src={post.imgUrl || "/images/products/macbook.png"}
                    alt="Post Image"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center mt-2 text-gray-500 text-sm pb-[25px]">
              <div className="relative w-6 h-6">
                <Image
                  src={post.usericon || "/images/products/userProfile.png"}
                  alt="user Image"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="mr-2">{post.author || "똑똑한판다"}</span>
              <span>
                {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </span>
              <div className="flex items-center ml-auto">
                <CiHeart className="mr-1" />
                <span className="mr-2">{post.heartCount ?? 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 