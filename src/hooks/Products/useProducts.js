"use client";

import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/api/products.js";

const DEFAULT_PAGE_SIZE = 10;

/**
 * 상품 목록 조회 및 관리를 위한 커스텀 훅
 * @param {Object} options - 초기 설정 옵션
 * @param {number} options.pageSize - 페이지당 상품 수 (기본값: 10)
 * @param {string} options.orderBy - 정렬 기준 (기본값: "recent")
 * @param {string} options.initialKeyword - 초기 검색어
 * @returns {Object} 상품 상태 및 함수
 */
export function useProducts({
  pageSize = DEFAULT_PAGE_SIZE,
  orderBy: initialOrderBy = "recent",
  initialKeyword = "",
} = {}) {
  // 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [keyWord, setKeyWord] = useState(initialKeyword);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // React Query를 사용한 데이터 페칭
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", currentPage, orderBy, keyWord, pageSize],
    queryFn: () =>
      productsService.getProducts(currentPage, pageSize, orderBy, keyWord),
  });

  // 상품 목록 및 페이지네이션 데이터
  const products = data?.data || [];
  const totalCount = data?.pagination?.total || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  // 페이지네이션 계산
  const pageGroupSize = 5;
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(totalPages, startPage + pageGroupSize - 1);

  // 검색어 변경 핸들러
  const handleKeywordChange = useCallback((e) => {
    setKeyWord(e.target.value);
  }, []);

  // 검색어 직접 설정 함수
  const setSearchKeyword = useCallback((keyword) => {
    setKeyWord(keyword);
    setCurrentPage(1); // 검색어 변경 시 첫 페이지로 이동
  }, []);

  // 정렬 방식 변경 핸들러
  const handleOrderChange = useCallback((newOrder) => {
    setOrderBy(newOrder);
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로 이동
    setIsDropdownOpen(false);
  }, []);

  // 드롭다운 토글 핸들러
  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  // 페이지 변경 핸들러
  const goToPage = useCallback((page) => {
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
    keyWord,
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
