"use client";

import React, { useState } from "react";
import DropDownToggle from "@/components/ui/DropDownToggle";
import Tags from "./Tags";
import img_default_product from "@/assets/images/products/img_default_product.svg";
import Profile from "@/components/ui/Profile";
import ProductModal from "./ProductModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { postService } from "@/service/postService";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

type TProduct = {
  tags: string[];
  images: string[];
  likeCount: number;
  isLiked: boolean;
  author: {
    id: string;
    nickname: string;
  };
  name: string;
  id: number;
  createdAt: Date;
  description: string;
  price: number;
};

export default function ProductDetail() {
  const [isDropDownVisible, setIsDropDownVisible] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  const { productId } = useParams<{ productId: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // 상품 상세 조회
  const {
    data: product,
    isPending,
    error,
  } = useQuery<TProduct, Error, TProduct, [string, string]>({
    queryKey: ["products", productId],
    queryFn: () => postService.getPost("products", productId),
  });

  // 상품 삭제 API
  const { mutate: deletePost } = useMutation<void, Error, string>({
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

  // 상품 수정(페이지 이동)
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

  if (isPending) {
    return (
      <div className="flex justify-center items-center gap-[8px]">
        <div className="size-[20px] border-[3px] border-t-[3px] border-secondary-gray-200 border-t-primary-100 rounded-full animate-spin"></div>
        <p className="font-medium">불러오는 중</p>
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
        <Image
          src={
            product?.images?.length === 0
              ? img_default_product.src
              : product?.images?.[0]
          }
          alt={product.name}
          className="relative min-w-[343px] min-h-[343px] max-w-[343px] max-h-[343px] rounded-[12px] overflow-hidden sm:min-w-[340px] sm:min-h-[340px] sm:max-w-[340px] sm:max-h-[340px] md:min-w-[486px] md:min-h-[486px]"
        />
        <div className="flex flex-col w-full gap-[40px] sm:min-w-[340px] sm:max-w-[690px] md:gap-[62px]">
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[8px] md:gap-[16px]">
              <div className="relative flex justify-between items-center">
                <h1 className="font-semibold text-[16px]/[26px] text-secondary-gray-700 sm:text-[20px]/[32px] md:text-[24px]">
                  {product.name}
                </h1>
                {user?.id === product?.author?.id && (
                  <DropDownToggle
                    handleEdit={handleEdit}
                    handleDelete={handleDeleteModalToggle}
                    handleDropDownToggle={handleDropDownToggle}
                    handleDropDownClose={handleDropDownClose}
                    isDropDownVisible={isDropDownVisible}
                  />
                )}
              </div>
              <p className="font-semibold text-[24px]/[32px] text-secondary-gray-700 sm:text-[32px]/[42px] md:text-[40px]/[48px]">
                {product?.price?.toLocaleString()}원
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
