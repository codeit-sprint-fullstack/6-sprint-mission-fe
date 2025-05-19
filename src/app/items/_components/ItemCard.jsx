"use client";

import React from "react";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

export default function ItemCard({ item }) {
  // 이미지 URL 처리 함수
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/img_default.png"; // 기본 이미지

    // 이미 전체 URL인 경우
    if (imagePath.startsWith("http")) return imagePath;

    // 상대 경로인 경우 백엔드 URL 추가
    return `http://localhost:3000/${imagePath}`;
  };

  return (
    <Link href={`/items/${item.id}`}>
      <div className="itemCard">
        <img
          src={getImageUrl(item.images?.[0])} // ← 수정: optional chaining과 함수 사용
          alt={item.name}
          className="itemCardThumbnail"
          onError={(e) => {
            // 이미지 로드 실패 시 기본 이미지로 변경
            e.target.src = "/images/img_default.png";
          }}
        />
        <div className="itemSummary">
          <h2 className="itemName">{item.name}</h2>
          <p className="itemPrice">{item.price?.toLocaleString()}원</p>{" "}
          {/* ← 수정: optional chaining */}
          <div className="favoriteCount">
            <FaHeart />
            {item.likeCount || item.favoriteCount || 0}{" "}
            {/* ← 수정: 백엔드 필드명 대응 */}
          </div>
        </div>
      </div>
    </Link>
  );
}
