"use client";

import Image from "next/image";
import { useState } from "react";
import { FaRegHeart, FaHeart, FaEllipsisV } from "react-icons/fa";
import { formatPrice, formatDate } from "@/utils/format";
import { productsSevice } from "@/api/products";
import ProductEditModal from "./ProductEditModal";
import { useRouter } from "next/navigation";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function ProductOverview({ product, user }) {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const [isLiked, setIsLiked] = useState(product?.isFavorite || false);
  const [favoriteCount, setFavoriteCount] = useState(
    product?.favoriteCount || 0,
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 게시글 삭제 모달 열기
  const handleDelete = () => {
    setShowOptions(false);
    setShowDeleteModal(true);
  };

  // 삭제 확인 처리 함수 추가
  const handleConfirmDelete = async () => {
    // 여기에 삭제 로직을 구현할 예정
    console.log("상품 삭제 확인:", product.id);
    try {
      await productsSevice.deleteProduct(product.id);
      router.push("/items");
    } catch (error) {
      console.error("상품 삭제 실패:", error);
    } finally {
      setShowDeleteModal(false);
    }

    setShowDeleteModal(false);
  };

  const handleToggleLike = () => {
    try {
      if (isLiked) {
        productsSevice.unLikeProduct(product.id);
        setIsLiked(false);
        setFavoriteCount(favoriteCount - 1);
      } else {
        productsSevice.likeProduct(product.id);
        setIsLiked(true);
        setFavoriteCount(favoriteCount + 1);
      }
    } catch (error) {
      console.error("좋아요 상태 변경 실패:", error);
    }
  };

  const handleSaveChanges = async (formData) => {
    console.log("저장할 데이터:", formData);
    // 여기에 API 호출 로직이 들어갈 예정

    try {
      const response = await productsSevice.updateProduct(product.id, formData);
      console.log("수정 응답:", response);
      router.refresh();
    } catch (error) {
      console.error("수정 실패:", error);
    } finally {
      setShowEditModal(false);
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
          priority
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

            {/* 수정 관련 버튼 */}
            {user?.id === product.ownerId && (
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
                        setShowEditModal(true);
                        setShowOptions(false);
                      }}
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
                  {favoriteCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 수정 모달 */}
      <ProductEditModal
        product={product}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveChanges}
      />

      {/* 삭제 확인 모달 */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
