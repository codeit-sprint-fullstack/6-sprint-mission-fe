"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import DropDownToggle from "@/components/ui/DropDownToggle";
import Tags from "./Tags";
import img_default_product from "@/assets/images/products/img_default_product.svg";
import Profile from "@/components/ui/Profile";
import ProductModal from "./ProductModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { postService } from "@/service/postService";

export default function ProductDetail() {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const { productId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  // 상품 상세 조회
  const {
    data: product,
    isPending,
    error,
  } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => postService.getPost("products", productId),
  });

  // 상품 삭제 API
  const { mutate: deletePost } = useMutation({
    mutationFn: (productId) => postService.deletePost("products", productId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["products", productId] }),
  });

  // 상품 삭제 전 모달 토글
  const handleDeleteModalToggle = () => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
  };

  // 상품 삭제
  const handleDeleteConfirm = () => {
    deletePost(productId);

    router.push("/products");
  };

  // 상품 수정 페이지로 이동
  const handleEdit = () => {
    router.push(`/products/${productId}/edit`);
  };

  // 정렬 선택버튼 토글
  const handleDropDownToggle = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  // 정렬 선택버튼 닫기
  const handleDropDownClose = () => {
    setIsDropDownVisible(false);
  };

  if (isPending || !product) {
    return (
      <div className="flex justify-center items-center">
        상품 불러오는 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">{error.message}</div>
    );
  }

  return (
    <>
      {isDeleteModalVisible && (
        <ProductModal
          handleDeleteModalToggle={handleDeleteModalToggle}
          handleDeleteConfirm={handleDeleteConfirm}
        />
      )}
      <div className="flex flex-col justify-center items-center gap-y-[16px] sm:flex-row sm:items-start sm:gap-[16px] md:items-center md:gap-[24px]">
        <div className="relative min-w-[343px] min-h-[343px] rounded-[12px] sm:min-w-[340px] sm:min-h-[340px] md:min-w-[486px] md:min-h-[486px]">
          {/* TODO: 이미지 태그 변경해보기 */}
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
                  handleEdit={handleEdit}
                  handleDelete={handleDeleteModalToggle}
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
