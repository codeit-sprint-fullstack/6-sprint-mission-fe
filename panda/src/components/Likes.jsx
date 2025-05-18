"use client";

import { BASE_URL } from "@/api/apiRequest";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

function Likes({ type, id }) {
  const [count, setCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const likeType = ["article", "product"];

  if (!likeType.includes(type))
    throw new Error("좋아요 유형은 'article'과 'product' 중 하나입니다.");

  // 데이터 소환
  useEffect(() => {
    if (!type || !id) return;

    let url = type === "article" ? `/articles/${id}` : `/products/${id}`;

    const fetchLikeCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}${url}`);
        if (!response.ok) throw new Error("좋아요 오류");

        const data = await response.json();

        const likes =
          type === "article" ? data.article.likeCount : data.product.likeCount;

        setCount(likes);
      } catch (err) {
        console.error("게시글 좋아요 오류:", err);
      }
    };

    fetchLikeCount();
  }, [type, id]);

  // 좋아요 클릭 시 실행 함수
  const handleLikeClick = async () => {
    const newCount = isClicked ? count - 1 : count + 1;

    setIsClicked(!isClicked);
    setCount(newCount);
  };

  return (
    <button onClick={handleLikeClick} className="flex items-center gap-[1px]">
      {isClicked ? (
        <FaHeart className="text-pink-500 inline" />
      ) : (
        <CiHeart className="inline" />
      )}
      <span className="text-400-14 text-gray-600">
        {count.toLocaleString()}
      </span>
    </button>
  );
}

export default Likes;
