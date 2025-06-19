"use client";

import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService } from "@/api/products";
import { Product } from "@/types/product";

export function useProduct(productId: Product["id"]) {
  const queryClient = useQueryClient();

  // React Query를 사용한 단일 상품 조회
  const {
    data: product,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products", "detail", productId],
    queryFn: () => productsService.getDetailProduct(productId),
    enabled: !!productId, // productId가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // 상품 수정 mutation
  const updateMutation = useMutation({
    mutationFn: (productData: FormData) =>
      productsService.updateProduct(productId, productData),
    onSuccess: (updatedProduct) => {
      // 수정된 상품으로 캐시 업데이트
      queryClient.setQueryData(
        ["products", "detail", productId],
        updatedProduct
      );

      // 관련 쿼리들 무효화 (상품 목록에도 반영)
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("상품 수정 실패:", error);
    },
  });

  // 상품 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: () => productsService.deleteProduct(productId),
    onSuccess: () => {
      // 삭제된 상품 캐시 제거
      queryClient.removeQueries({
        queryKey: ["products", "detail", productId],
      });

      // 상품 목록 무효화 (목록에서도 제거되도록)
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("상품 삭제 실패:", error);
    },
  });

  // 찜하기 추가 mutation
  const likeMutation = useMutation({
    mutationFn: () => productsService.likeProduct(productId),
    onSuccess: () => {
      // 상품 상세 페이지 데이터 갱신
      refetch();

      // 상품 목록 무효화 (찜하기 수 반영)
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("찜하기 추가 실패:", error);
    },
  });

  // 찜하기 취소 mutation
  const unlikeMutation = useMutation({
    mutationFn: () => productsService.unLikeProduct(productId),
    onSuccess: () => {
      // 상품 상세 페이지 데이터 갱신
      refetch();

      // 상품 목록 무효화 (찜하기 수 반영)
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("찜하기 취소 실패:", error);
    },
  });

  // 상품 수정 함수
  const updateProduct = useCallback(
    async (productData: FormData) => {
      if (!productId) return;
      return updateMutation.mutateAsync(productData);
    },
    [productId, updateMutation]
  );

  // 상품 삭제 함수
  const deleteProduct = useCallback(async () => {
    if (!productId) return;
    return deleteMutation.mutateAsync();
  }, [productId, deleteMutation]);

  // 찜하기 토글 함수
  const toggleLike = useCallback(
    async (isLiked: boolean) => {
      if (!productId) return;

      if (isLiked) {
        return unlikeMutation.mutateAsync();
      } else {
        return likeMutation.mutateAsync();
      }
    },
    [productId, likeMutation, unlikeMutation]
  );

  return {
    // 데이터
    product,
    loading,
    error: error
      ? error instanceof Error
        ? error.message
        : "알 수 없는 오류"
      : null,

    // 액션
    updateProduct,
    deleteProduct,
    toggleLike, // 새로 추가된 찜하기 토글 함수
    refetch,

    // 로딩 상태
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isTogglingLike: likeMutation.isPending || unlikeMutation.isPending,
  };
}
