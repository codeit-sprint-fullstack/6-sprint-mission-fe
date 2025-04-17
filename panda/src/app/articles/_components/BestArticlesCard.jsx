import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

function BestArticlesCard({ article }) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // 날짜 서식
  const createdAt = new Date(article.createdAt);
  const date = `${createdAt.getFullYear()}.
  ${String(createdAt.getMonth() + 1).padStart(2, "0")}.
  ${String(createdAt.getDate()).padStart(2, "0")}`;

  // 좋아요
  const handleLikeClick = () => {
    if (like) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }

    setLike(!like);
  };

  // 게시글 기본 이미지
  const thumbnailImg = article.thumbnailImg || "/assets/product.svg";

  return (
    <article className="bg-gray-50 rounded-[8px] relative px-[24px]">
      {/* BEST 뱃지 */}
      <img src="/assets/badge.png" alt="best badge" className="absolute" />

      {/* 내용 */}
      <div className="flex flex-col mt-8 mb-4 gap-2.5">
        <div className="flex flex-row justify-between items-center gap-2">
          {/* 제목 + 바탕 이미지 */}
          <p className="text-20-600">{article.title}</p>
          <img
            src={thumbnailImg}
            alt="thumbnail image"
            className="w-[72px] h-[72px] border-gray-200 rounded-[6px]"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* 작성자 */}
            <span className="text-14-400 text-gray-600">
              {article.user.nickname}
            </span>
            {/* 좋아요 아이콘 */}
            <button onClick={handleLikeClick}>
              {like ? (
                <FaHeart className="text-pink-500 inline" />
              ) : (
                <CiHeart className="inline" />
              )}
              {/* 좋아요 개수 */}
              <span className="text-14-400 text-gray-600">
                {article.likesToArticle.length}
              </span>
            </button>
          </div>
          {/* 작성일자 */}
          <span className="text-14-400 text-gray-400">{date}</span>
        </div>
      </div>
    </article>
  );
}

export default BestArticlesCard;
