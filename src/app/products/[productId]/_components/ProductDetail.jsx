"use client";

import React, { useState } from "react";
import Image from "next/image";
import DropDownToggle from "@/components/ui/DropDownToggle";
import Tags from "./Tags";
import img_default_product from "@/assets/images/products/img_default_product.svg";
import Profile from "@/components/ui/Profile";
import ProductModal from "./ProductModal";

const product = {
  createdAt: "2025-03-20T14:17:50.554Z",
  favoriteCount: 123,
  ownerNickname: "똑똑한 판다",
  ownerId: 1,
  images: ["@/assets/images/products/img_default_product.svg"],
  tags: ["아이패드미니", "애플", "가성비"],
  price: 500000,
  description: `액정에 잔기스랑 주변부 스크래치있습니다만 예민하신분아니면 전혀 신경쓰이지않을정도입니다.\n박스 보관중입니다.\n메모용과 넷플릭스용으로만쓰던거라 뭘 해보질 않아 기능이나 문제점을 못느꼈네요.\n잘 안써서 싸게넘깁니다! 택배거래안합니다.`,
  name: "아이패드 미니 팔아요",
  id: 1,
  isFavorite: true,
};

export default function ProductDetail() {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  // 정렬 선택버튼 토글
  const handleDropDownToggle = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  // 정렬 선택버튼 닫기
  const handleDropDownClose = () => {
    setIsDropDownVisible(false);
  };

  // // 상품 수정
  // const handleEdit = () => {
  //   router.push(`/community/${articleId}/edit`);
  // };

  // // 상품 삭제
  // const removeArticle = async (articleId) => {
  //   await deleteArticle(articleId);

  //   router.push("/community");
  // };

  return (
    <>
      {/* <ProductModal /> */}
      <div className="flex flex-col justify-center items-center gap-y-[16px] sm:flex-row sm:items-start sm:gap-[16px] md:items-center md:gap-[24px]">
        <div className="relative min-w-[343px] min-h-[343px] rounded-[12px] sm:min-w-[340px] sm:min-h-[340px] md:min-w-[486px] md:min-h-[486px]">
          <Image
            src={img_default_product}
            alt="상품"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col w-full gap-[40px] sm:min-w-[340px] sm:max-w-[690px] md:gap-[62px]">
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[8px] md:gap-[16px]">
              <div className="relative flex justify-between items-center">
                <h1 className="font-semibold text-[16px]/[26px] text-secondary-gray-700 sm:text-[20px]/[32px] md:text-[24px]">
                  {product.name}
                </h1>
                <DropDownToggle
                  handleDropDownToggle={handleDropDownToggle}
                  handleDropDownClose={handleDropDownClose}
                  isDropDownVisible={isDropDownVisible}
                />
              </div>
              <p className="font-semibold text-[24px]/[32px] text-secondary-gray-700 sm:text-[32px]/[42px] md:text-[40px]/[48px]">
                {product.price.toLocaleString()}원
              </p>
            </div>
            <div className="border-t-[1.3px] border-secondary-gray-200"></div>
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[8px] md:gap-[16px]">
                <h2 className="font-semibold text-[14px]/[24px] text-secondary-gray-700 md:text-[16px]/[26px]">
                  상품 소개
                </h2>
                <p className="font-normal text-[16px]/[26px] whitespace-pre-line text-secondary-gray-700">
                  {product.description}
                </p>
              </div>
              <div className="flex flex-col gap-[8px] md:gap-[16px]">
                <h2 className="font-semibold text-[14px]/[24px] text-secondary-gray-700 md:text-[16px]/[26px]">
                  상품 태그
                </h2>
                <Tags tags={product.tags} />
              </div>
            </div>
          </div>
          <Profile product={product} />
        </div>
      </div>
      <div className="border-t-[1.3px] border-secondary-gray-200 my-[24px] sm:my-[32px] md:my-[40px]"></div>
    </>
  );
}
