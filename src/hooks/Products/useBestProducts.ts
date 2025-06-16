"use client";

import { productsService } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export function useBestProducts({ pageSize = 4 } = {}) {
  // React Query를 사용한 데이터 페칭
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["bestProducts", pageSize],
    queryFn: () => productsService.getProducts(1, pageSize, "likes", ""),
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
