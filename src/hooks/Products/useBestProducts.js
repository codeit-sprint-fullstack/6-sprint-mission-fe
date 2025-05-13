"use client";

import { productsService } from "@/api/products.js";
import { useQuery } from "@tanstack/react-query";

/**
 * 베스트 상품 목록 조회를 위한 커스텀 훅
 * @param {Object} options - 초기 설정 옵션
 * @param {number} options.pageSize - 페이지당 상품 수 (기본값: 4)
 * @returns {Object} 베스트 상품 상태 및 함수
 */
export function useBestProducts({ pageSize = 4 } = {}) {
  // React Query를 사용한 데이터 페칭
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["bestProducts", pageSize],
    queryFn: () => productsService.getProducts(1, pageSize, "favorite", ""),
  });

  // 베스트 상품 목록
  const bestProducts = data?.data || [];

  return {
    bestProducts,
    isLoading,
    error,
    refetch,
  };
}
