"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import {
  fetchProductDetail,
  deleteProduct,
  likeProduct,
  unlikeProduct,
} from "@/lib/api/itemApi";
import CommentForm from "@/components/comment/CommentForm";
import CommentList from "@/components/comment/CommentList";
import { useConfirmModal } from "@/components/ui/ConfirmModal";

export default function ItemDetailPage() {
  const { id: productId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const dropdownRef = useRef(null);
  const { openConfirmModal } = useConfirmModal();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) setUserId(Number(storedId));
  }, []);

  const {
    data: product,
    isPending,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductDetail(productId),
    enabled: !!productId,
    initialData: () => queryClient.getQueryData(["product", productId]),
  });

  const isAuthor = userId && product?.ownerId === userId;

  const toggleFavoriteMutation = useMutation({
    mutationFn: () =>
      product.isFavorite ? unlikeProduct(product.id) : likeProduct(product.id),
    onMutate: async () => {
      await queryClient.cancelQueries(["product", productId]);
      const previous = queryClient.getQueryData(["product", productId]);
      if (previous) {
        queryClient.setQueryData(["product", productId], {
          ...previous,
          favoriteCount: previous.isFavorite
            ? previous.favoriteCount - 1
            : previous.favoriteCount + 1,
          isFavorite: !previous.isFavorite,
        });
      }
      return { previous };
    },
    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["product", productId], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["product", productId]);
      queryClient.invalidateQueries(["products"]);
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      await queryClient.removeQueries({ queryKey: ["product", productId] });
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      router.replace("/items");
    },
  });

  const handleToggleFavorite = () => product && toggleFavoriteMutation.mutate();
  const handleDeleteProduct = () =>
    openConfirmModal("정말 삭제하시겠습니까?", () => {
      deleteProductMutation.mutate(product.id);
    });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  if (isPending) return <div className="text-center">로딩 중...</div>;
  if (error)
    return <div className="text-center text-red-500">{error.message}</div>;

  const isExternalImage = (url) => url?.startsWith("http");
  const imageUrl = isExternalImage(product.images?.[0])
    ? product.images[0]
    : `${process.env.NEXT_PUBLIC_API_URL}${product.images?.[0] || ""}`;

  return (
    <div className="max-w-[1200px] mx-auto px-4 mt-6 flex flex-col gap-10">
      <div className="relative flex flex-col lg:flex-row gap-6 border-b pb-10 border-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-[486px] h-[486px] object-cover rounded-[28.6px]"
          />
        ) : (
          <img
            src="/img_default.svg"
            alt="기본 이미지"
            className="w-[486px] h-[486px] object-cover rounded-[28.6px]"
          />
        )}

        {isAuthor && (
          <div ref={dropdownRef} className="absolute top-4 right-4">
            <button onClick={toggleDropdown}>
              <Image
                src="/images/icons/ic_kebab.svg"
                alt="메뉴"
                width={24}
                height={24}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-6 bg-white border border-gray-300 rounded-lg z-10 w-[139px]">
                <button
                  onClick={() => router.push(`/items/${productId}/edit`)}
                  className="w-full text-center pt-3 pb-2 text-gray-500 hover:bg-gray-100"
                >
                  수정하기
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="w-full text-center pt-2 pb-3 text-gray-500 hover:bg-gray-100"
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex-1 flex flex-col justify-between h-[486px]">
          <div>
            <div className="flex flex-col pb-4 gap-4 border-b border-gray-200 text-gray-800 font-semibold">
              <span className="text-2xl">{product.name}</span>
              <span className="text-[40px]">
                {product.price.toLocaleString()}원
              </span>
            </div>

            <div className="flex flex-col mt-6 space-y-4 gap-6 text-base text-gray-600">
              <div className="flex flex-col gap-4">
                <span className="font-semibold">상품 소개</span>
                <p className="mt-2 whitespace-pre-line">
                  {product.description}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-semibold">상품 태그</span>
                <div className="flex flex-wrap gap-2 mt-2 text-gray-800">
                  {product.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-[5px] bg-gray-100 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-10">
            <div className="flex items-center gap-4">
              <Image
                src="/images/icons/ic_profile.svg"
                width={40}
                height={40}
                alt="프로필"
              />
              <div className="flex flex-col text-sm">
                <span className="text-gray-600">
                  {product.ownerNickname || "닉네임"}
                </span>
                <span className="text-gray-400">
                  {new Date(product.createdAt).toLocaleDateString("ko-KR")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-px h-10 bg-gray-200" />
              <button
                onClick={handleToggleFavorite}
                className="flex items-center border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-100 gap-2"
              >
                <Image
                  src={
                    product.isFavorite
                      ? "/images/icons/ic_heart_active.svg"
                      : "/images/icons/ic_heart.svg"
                  }
                  alt="좋아요"
                  width={24}
                  height={24}
                />
                <span className="text-gray-600 text-sm">
                  {product.favoriteCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <CommentForm productId={productId} />
        <CommentList productId={productId} />
      </div>
    </div>
  );
}
