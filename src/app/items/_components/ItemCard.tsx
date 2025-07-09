"use client";

import React from "react";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { Product } from "@/types/product";
import Image from "next/image";

interface ItemCardProps {
  item: Product;
}

export default function ItemCard({ item }: ItemCardProps) {
  // 이미지 URL 처리 함수
  const getImageUrl = (imagePath: string | undefined): string => {
    if (!imagePath) return "/images/img_default.png"; // 기본 이미지

    // 이미 전체 URL인 경우
    if (imagePath.startsWith("http")) return imagePath;

    // 상대 경로인 경우 백엔드 URL 추가 (환경 변수 사용)
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
    return `${baseUrl}/${imagePath}`;
  };

  return (
    <Link href={`/items/${item.id}`}>
      <div className="itemCard">
        <Image
          src={getImageUrl(item.images?.[0])}
          alt={item.name}
          className="itemCardThumbnail"
          fill
          onError={(e) => {
            // 이미지 로드 실패 시 기본 이미지로 변경
            (e.target as HTMLImageElement).src = "/images/img_default.png";
          }}
        />
        <div className="itemSummary">
          <h2 className="itemName">{item.name}</h2>
          <p className="itemPrice">{item.price?.toLocaleString()}원</p>
          <div className="favoriteCount">
            <FaHeart />
            {item.favoriteCount || 0}
          </div>
        </div>
      </div>
    </Link>
  );
}
