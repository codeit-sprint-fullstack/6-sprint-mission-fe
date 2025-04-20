"use client";

import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

function LikesToArticle({ articleId, initialCount = 0 }) {
  const [count, setCount] = useState(initialCount || 0);
  const [isClicked, setIsClicked] = useState(false);

  // 데이터 소환
  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/articles/${articleId}`
        );
        if (!response.ok) throw new Error("게시글 좋아요 오류");

        const data = await response.json();
        const likesCount = data.article.likesToArticle.length || 0;
        setCount(likesCount);
      } catch (error) {
        console.error("게시글 좋아요 오류:", error);
      }
    };

    fetchLikeCount();
  }, [articleId]);

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
      <span className="text-14-400 text-gray-600">
        {count.toLocaleString()}
      </span>
    </button>
  );
}

export default LikesToArticle;
