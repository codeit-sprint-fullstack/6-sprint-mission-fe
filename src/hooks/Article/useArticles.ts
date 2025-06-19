"use client";

import { useState, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { articlesService } from "../../api/articles";
import { scrollToTop } from "@/lib/common/scrollTop";
import { debounce } from "lodash-es";

const DEFAULT_PAGE_SIZE = 10;

export function useArticles({
  pageSize = DEFAULT_PAGE_SIZE,
  orderBy: initialOrderBy = "latest",
  initialKeyword = "",
} = {}) {
  // 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [keyWord, setKeyWord] = useState(initialKeyword);
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword);

  // offset 계산
  const offset = (currentPage - 1) * pageSize;

  // React Query를 사용한 데이터 페칭
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      "articles",
      "list",
      currentPage,
      orderBy,
      searchKeyword,
      pageSize,
    ],
    queryFn: () =>
      articlesService.getArticles({
        offset,
        limit: pageSize,
        search: searchKeyword,
        sort: orderBy,
      }),
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData, // keepPreviousData 대신 사용
    retry: 1,
  });

  // 게시글 목록 및 페이지네이션 데이터
  const articles = data?.articles || (Array.isArray(data) ? data : []);
  const totalCount =
    data?.pagination?.total || (Array.isArray(data) ? data.length : 0);
  const totalPages = Math.ceil(totalCount / pageSize);

  // 페이지네이션 계산
  const pageGroupSize = 5;
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(totalPages, startPage + pageGroupSize - 1);

  /**
   * 검색어를 즉시 적용하는 함수
   */
  const applySearch = useCallback((search: string) => {
    setSearchKeyword(search);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  }, []);

  /**
   * 디바운스된 검색어 적용을 위한 핸들러 (300ms)
   */
  const debouncedSearchRef = useRef(
    debounce((search: string) => {
      applySearch(search);
    }, 300)
  ).current;

  /**
   * 검색어 입력 변경 시 호출되는 디바운스 핸들러
   */
  const handleSearch = useCallback(
    (search: string) => {
      setKeyWord(search); // 입력값 즉시 반영 (UI용)
      debouncedSearchRef(search); // 디바운스된 실제 검색
    },
    [debouncedSearchRef]
  );

  /**
   * 정렬 방식 변경 핸들러 ("popular", "latest")
   */
  const handleOrderChange = useCallback((sortType: string) => {
    const sort = sortType === "popular" ? "popular" : "latest";
    setOrderBy(sort);
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로 이동
  }, []);

  // 페이지 변경 핸들러
  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
    scrollToTop();
  }, []);

  // 이전 페이지로 이동
  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      scrollToTop();
    }
  }, [currentPage]);

  // 다음 페이지로 이동
  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      scrollToTop();
    }
  }, [currentPage, totalPages]);

  return {
    // 게시글 데이터
    articles,
    loading: isLoading,
    error: error
      ? error instanceof Error
        ? error.message
        : "알 수 없는 오류"
      : null,

    // 상태값
    orderBy,
    keyWord, // 현재 입력된 검색어 (UI용)
    searchKeyword, // 실제 검색에 사용되는 검색어

    // 페이지네이션
    pagination: {
      totalPages,
      currentPage,
      startPage,
      endPage,
      goToPage,
      goToPrevPage,
      goToNextPage,
    },

    // 액션
    handleSearch,
    handleOrderChange,
    refetch,
  };
}
