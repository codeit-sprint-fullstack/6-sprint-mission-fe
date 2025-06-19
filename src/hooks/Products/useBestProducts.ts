"use client";

import { productsService } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export function useBestProducts({ pageSize = 4 } = {}) {
  // React Query를 사용한 데이터 페칭
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", "best", pageSize],
    queryFn: () => productsService.getProducts(1, pageSize, "likes", ""),
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // 베스트 상품 목록
  const bestProducts = data?.products || [];

  return {
    bestProducts,
    isLoading,
    error,
    refetch,
  };
}
