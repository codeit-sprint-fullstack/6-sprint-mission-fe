"use client";

import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/api/products";

const DEFAULT_PAGE_SIZE = 10;

export function useProducts({
  pageSize = DEFAULT_PAGE_SIZE,
  orderBy: initialOrderBy = "recent",
  initialKeyword = "",
} = {}) {
  // 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [keyWord, setKeyWord] = useState(initialKeyword);
  const [debouncedKeyword, setDebouncedKeyword] = useState(initialKeyword);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 검색어 디바운싱 (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyWord);
      // 검색어가 변경되면 첫 페이지로 이동
      if (keyWord !== debouncedKeyword) {
        setCurrentPage(1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [keyWord, debouncedKeyword]);

  // React Query를 사용한 데이터 페칭 (debouncedKeyword 사용)
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      "products",
      "list",
      currentPage,
      orderBy,
      debouncedKeyword,
      pageSize,
    ],
    queryFn: () =>
      productsService.getProducts(
        currentPage,
        pageSize,
        orderBy,
        debouncedKeyword
      ),
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData, // 페이지 전환 시 이전 데이터 유지
    retry: 1,
  });

  // 상품 목록 및 페이지네이션 데이터
  const products = data?.products || [];
  const totalCount = data?.pagination?.total || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  // 페이지네이션 계산
  const pageGroupSize = 5;
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(totalPages, startPage + pageGroupSize - 1);

  // 검색어 변경 핸들러 (즉시 UI 반영, 디바운싱된 API 호출)
  const handleKeywordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyWord(e.target.value);
    },
    []
  );

  // 검색어 직접 설정 함수
  const setSearchKeyword = useCallback((keyword: string) => {
    setKeyWord(keyword);
    setDebouncedKeyword(keyword); // 즉시 검색 실행
    setCurrentPage(1); // 검색어 변경 시 첫 페이지로 이동
  }, []);

  // 정렬 방식 변경 핸들러
  const handleOrderChange = useCallback((newOrder: string) => {
    setOrderBy(newOrder);
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로 이동
    setIsDropdownOpen(false);
  }, []);

  // 드롭다운 토글 핸들러
  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  // 페이지 변경 핸들러
  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // 이전 페이지로 이동
  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  // 다음 페이지로 이동
  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  return {
    // 상품 데이터
    products,
    isLoading,
    error,

    // 상태값
    orderBy,
    keyWord, // UI에 표시되는 즉시 반영되는 검색어
    debouncedKeyword, // 실제 API 호출에 사용되는 디바운싱된 검색어
    isDropdownOpen,

    // 페이지네이션
    pagination: {
      totalPages,
      currentPage,
      startPage,
      endPage,
      goToPage,
      goToPrevPage,
      goToNextPage,
      setCurrentPage,
    },

    // 액션
    handleKeywordChange,
    setSearchKeyword,
    handleOrderChange,
    toggleDropdown,
    refetch,
  };
}
