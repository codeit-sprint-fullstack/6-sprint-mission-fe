"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { fetchArticles } from "@/api/article.api"; // ✅ API import

export default function BestArticles() {
  const [bestArticles, setBestArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();

        // 좋아요 높은 순으로 정렬 후 상위 3개 선택
        const sorted = [...data].sort(
          (a, b) => (b.heartCount ?? 0) - (a.heartCount ?? 0)
        );
        setBestArticles(sorted.slice(0, 3));
      } catch (error) {
        console.error("베스트 게시글 로딩 실패:", error);
      }
    };

    loadArticles();
  }, []);

  return (
    <div className="space-y-4 px-90">
      <h2 className="text-xl font-semibold mb-6">베스트 게시글</h2>
      <div className="flex gap-4 overflow-x-auto">
        {bestArticles.map((post) => (
          <div
            key={post.id}
            className="flex flex-col bg-gray-100 px-4 rounded-lg w-[384px] h-[169px] hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <span className="flex items-center bg-blue-500 text-white gap-1.5 px-6 py-0.5 text-base font-semibold rounded-b-2xl">
                <img src="/images/icons/besticon.png" alt="besticon" />
                Best
              </span>
            </div>
            <div className="flex justify-between items-start mb-3">
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
            <div className="flex items-center mt-2 text-gray-500 text-sm">
              <span className="mr-2">{post.author || "작성자"}</span>
              <FaHeart className="mr-1" />
              <span className="mr-2">{post.heartCount ?? 0}</span>
              <div className="flex items-center ml-auto">
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
