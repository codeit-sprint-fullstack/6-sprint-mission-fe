"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaEllipsisV,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { formatPrice, formatDate } from "@/utils/format";
import { productsService } from "@/api/products.js";
import { useRouter } from "next/navigation";
import DeleteConfirmModal from "./DeleteConfirmModal";

const FALLBACK_IMAGE = "/img/product_skeleton_img.png";

export default function ProductOverview({ product, user }) {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const [isLiked, setIsLiked] = useState(product?.isLiked || false);
  const [likes, setLikes] = useState(product?.likes || 0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  // 이미지 데이터 처리
  useEffect(() => {
    if (
      product?.image &&
      Array.isArray(product.image) &&
      product.image.length > 0
    ) {
      setImages(product.image);
    } else {
      setImages([]);
    }
  }, [product]);

  // 이미지 이동 함수
  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // 게시글 삭제 모달 열기
  const handleDelete = () => {
    setShowOptions(false);
    setShowDeleteModal(true);
  };

  // 삭제 확인 처리 함수
  const handleConfirmDelete = async () => {
    try {
      console.log("삭제 처리 중", product.id);
      await productsService.deleteProduct(product.id);
      router.push("/items");
    } catch (error) {
      console.error("상품 삭제 실패:", error);
    } finally {
      setShowDeleteModal(false);
    }

    setShowDeleteModal(false);
  };

  // 좋아요 상태 변경
  const handleToggleLike = () => {
    try {
      if (isLiked) {
        productsService.unLikeProduct(product.id);
        setIsLiked(false);
        setLikes(likes - 1);
      } else {
        productsService.likeProduct(product.id);
        setIsLiked(true);
        setLikes(likes + 1);
      }
    } catch (error) {
      console.error("좋아요 상태 변경 실패:", error);
    }
  };

  // 수정 페이지로 이동
  const directToEdit = () => {
    router.push(`/items/${product.id}/edit`);
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
      {/* 상품 이미지 캐러셀 */}
      <figure className="relative mb-4 h-[500px] w-full md:w-[40%]">
        {images.length > 0 ? (
          <>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${images[currentImageIndex]}`}
              alt={`${product.name} 이미지 ${currentImageIndex + 1}`}
              priority
              fill
              sizes="500px"
              className="rounded-xl object-cover"
            />

            {/* 이미지가 2개 이상인 경우에만 화살표 표시 */}
            {images.length > 1 && (
              <>
                {/* 이전 이미지 버튼 */}
                <button
                  onClick={goToPrevImage}
                  className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-white/70 p-2 text-gray-800 shadow-md transition-colors hover:bg-white"
                >
                  <FaChevronLeft size={20} />
                </button>

                {/* 다음 이미지 버튼 */}
                <button
                  onClick={goToNextImage}
                  className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-white/70 p-2 text-gray-800 shadow-md transition-colors hover:bg-white"
                >
                  <FaChevronRight size={20} />
                </button>

                {/* 이미지 인디케이터 */}
                <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 w-2 rounded-full ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <Image
            src={FALLBACK_IMAGE}
            alt={product.name}
            priority
            fill
            sizes="500px"
            className="rounded-xl object-cover"
          />
        )}

        {/* 이미지 카운터 */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 rounded-full bg-black/60 px-3 py-1 text-white">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </figure>

      <div className="flex w-full flex-col md:w-[60%]">
        {/*  상품 헤더 */}
        <div className="mb-6 flex flex-col gap-2 border-b-2 pb-6">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">{product.name}</span>

            {/* 수정 관련 버튼 */}
            {user && user.user.id === product.userId && (
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
                      onClick={directToEdit}
                      className="flex w-full cursor-pointer items-center justify-center px-4 py-2 text-left text-sm text-[#6b7280] transition-colors hover:text-blue-500"
                    >
                      수정하기
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex w-full cursor-pointer items-center justify-center px-4 py-2 text-left text-sm text-[#6b7280] transition-colors hover:text-red-500"
                    >
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            )}
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
                {product.author?.nickname || "판매자"}
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
                  {likes}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
