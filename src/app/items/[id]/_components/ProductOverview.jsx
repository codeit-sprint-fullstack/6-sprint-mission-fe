"use client";

import Image from "next/image";
import { useState } from "react";
import { FaRegHeart, FaHeart, FaEllipsisV } from "react-icons/fa";
import { formatPrice, formatDate } from "@/utils/format";
import { productsSevice } from "@/api/products";

export default function ProductOverview({ product }) {
  console.log("product", product);

  const [showOptions, setShowOptions] = useState(false);
  const [isLiked, setIsLiked] = useState(product?.isFavorite || false);

  // 게시글 삭제 모달 열기
  const openDeleteModal = () => {
    setShowOptions(false);
    // setShowDeleteModal(true);
  };

  // 이부분 본인이 좋아요 한건지 어떻게 판단 가능한건지?
  const handleToggleLike = () => {
    try {
      if (isLiked) {
        productsSevice.unLikeProduct(product.id);
        setIsLiked(false);
      } else {
        productsSevice.likeProduct(product.id);
        setIsLiked(true);
      }
    } catch (error) {
      console.error("좋아요 상태 변경 실패:", error);
    }
  };

  if (!product) {
    return (
      <div className="w-full p-4 text-center">
        상품 정보를 불러오는 중입니다...
      </div>
    );
  }

  return (
    // 상품 상세 설명
    <div className="mb-6 flex w-full flex-col gap-4 border-b-2 pb-6 md:flex-row">
      {/* 상품 이미지 */}
      <figure className="relative mb-4 h-[500px] w-full md:w-[40%]">
        <Image
          src={product.images?.[0] || "/img/product_skelenton_img.png"}
          alt={product.name}
          fill
          sizes="500px"
          className="object-cove rounded-xl"
        />
      </figure>

      <div className="flex w-full flex-col md:w-[60%]">
        {/*  상품 헤더 */}
        <div className="mb-6 flex flex-col gap-2 border-b-2 pb-6">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">{product.name}</span>

            {/* TODO: 추후 컴포넌트 화 필요 */}
            <div className="relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="cursor-pointer text-[#9ca3af]"
              >
                <FaEllipsisV />
              </button>
              {showOptions && (
                <div className="absolute right-0 z-10 w-[100px] rounded-md border-2 border-[#e5e7eb] bg-white py-1 md:w-[140px]">
                  <button
                    onClick={() => {
                      // setIsEditing(true);
                      setShowOptions(false);
                    }}
                    className="flex w-full cursor-pointer items-center justify-center px-4 py-2 text-left text-sm text-[#6b7280] transition-colors hover:text-blue-500"
                  >
                    수정하기
                  </button>
                  <button
                    onClick={openDeleteModal}
                    className="flex w-full cursor-pointer items-center justify-center px-4 py-2 text-left text-sm text-[#6b7280] transition-colors hover:text-red-500"
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          </div>
          <span className="text-3xl font-bold">
            {formatPrice(product.price)}원
          </span>
        </div>

        {/* 상품 설명 */}
        <div className="mb-6 flex flex-col gap-2">
          <span className="font-bold">상품 소개</span>
          <span>{product.description}</span>
        </div>

        {/* 상품 태그 */}
        {product.tags && product.tags.length > 0 && (
          <div className="mb-6 flex flex-col gap-2">
            <span className="font-bold">상품 태그</span>
            <ul className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <li key={index} className="rounded-full bg-[#f3f4f6] px-4 py-1">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 판매자 정보 및 좋아요 */}
        <div className="flex items-center justify-between">
          {/* 프로필, 이름, 날짜 */}
          <div className="flex items-center pr-8">
            <figure className="relative h-[40px] w-[40px]">
              <Image
                src="/img/user_icon.png"
                alt="프로필"
                fill
                sizes="40px"
                className="object-cover"
              />
            </figure>
            <div className="ml-4 flex flex-col">
              <span className="mr-1 text-[14px] font-bold text-gray-600">
                {product.ownerNickname}
              </span>
              <span className="text-[14px] font-medium text-[#9ca3af]">
                {formatDate(product.createdAt)}
              </span>
            </div>
          </div>

          {/* 좋아요 */}
          <div className="flex items-center border-l border-[#e5e7eb] pl-8">
            <div className="flex items-center rounded-full border-2 border-[#e5e7eb]">
              <button
                onClick={handleToggleLike}
                className="flex cursor-pointer items-center px-3 py-1 text-[28px] text-gray-500 hover:text-red-500"
              >
                {isLiked ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
                <span className="ml-1 text-[16px] font-medium text-gray-500">
                  {product.favoriteCount || 0}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
