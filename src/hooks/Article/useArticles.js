"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "lodash-es";
import * as articleApi from "../../api/articles";

/**
 * 게시글 목록 조회 훅
 * @param {Object} options - 게시글 목록 조회 옵션
 * @param {number} options.offset - 페이지 오프셋
 * @param {number} options.limit - 한 페이지당 항목 수
 * @param {string} options.search - 검색어
 * @param {string} options.orderBy - 정렬 방식 (latest 또는 popular)
 * @returns {Object} 게시글 목록 상태 및 함수 객체
 * - articles: 게시글 배열
 * - loading: 로딩 상태
 * - error: 에러 메시지
 * - pagination: 페이지 정보 및 페이지 전환 함수들 (currentPage, totalPages 등)
 * - search: 검색 핸들러 (handleSearch, handleSearchChange)
 * - handleOrderChange: 정렬 방식 변경 함수
 */

export function useArticles(initialOptions = {}) {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    hasMore: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({
    offset: 0,
    limit: 10,
    search: "",
    sort: "latest", // 기본 정렬 방식: 최신순
    ...initialOptions,
  });

  // 기본 조회 로직
  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await articleApi.getArticles(options);
      setArticles(response.data);
      setPagination(response.pagination);
    } catch (error) {
      setError(error.message);
      console.error("게시글 목록 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [options]);

  // 검색어 변경 핸들러
  const handleSearch = useCallback((search) => {
    setOptions((prev) => ({
      ...prev,
      search,
      offset: 0, // 검색 시 첫 페이지로 리셋
    }));
  }, []);

  // 디바운스된 검색 핸들러 생성
  const debouncedSearchRef = useRef(
    debounce((search) => {
      handleSearch(search);
    }, 300),
  ).current;

  // 검색어 변경 시 디바운스 적용 핸들러
  const handleSearchChange = useCallback(
    (search) => {
      debouncedSearchRef(search);
    },
    [debouncedSearchRef],
  );

  // 정렬 방식 변경 핸들러
  const handleOrderChange = useCallback((sortType) => {
    // orderType: "최신순" | "좋아요순"
    const sort = sortType === "좋아요순" ? "popular" : "latest";

    console.log("sort", sort);

    setOptions((prev) => ({
      ...prev,
      sort,
      offset: 0, // 정렬 방식 변경 시 첫 페이지로 리셋
    }));
  }, []);

  // 페이지 이동 핸들러
  const goToPage = useCallback(
    (pageNumber) => {
      if (!loading) {
        const newOffset = (pageNumber - 1) * options.limit;
        setOptions((prev) => ({
          ...prev,
          offset: newOffset,
        }));
      }
    },
    [loading, options.limit],
  );

  // 다음 페이지 이동 핸들러
  const goToNextPage = useCallback(() => {
    if (pagination.hasMore && !loading) {
      const currentPage = Math.floor(options.offset / options.limit) + 1;
      goToPage(currentPage + 1);
    }
  }, [pagination.hasMore, loading, options.offset, options.limit, goToPage]);

  // 이전 페이지 이동 핸들러
  const goToPrevPage = useCallback(() => {
    if (options.offset > 0 && !loading) {
      const currentPage = Math.floor(options.offset / options.limit) + 1;
      goToPage(currentPage - 1);
    }
  }, [options.offset, options.limit, loading, goToPage]);

  // 현재 페이지 계산
  const currentPage = Math.floor(options.offset / options.limit) + 1;
  // 총 페이지 수 계산
  const totalPages = Math.ceil(pagination.total / options.limit);

  // 페이지 번호 범위 계산 (시작 페이지와 끝 페이지)
  const getPageRange = useCallback(() => {
    const pageCount = 5; // 한 번에 보여줄 페이지 개수
    let startPage = Math.max(1, currentPage - Math.floor(pageCount / 2));
    let endPage = startPage + pageCount - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - pageCount + 1);
    }

    return { startPage, endPage };
  }, [currentPage, totalPages]);

  const { startPage, endPage } = getPageRange();

  // 초기 렌더링 및 옵션 변경 시 데이터 조회
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // 컴포넌트 언마운트 시 디바운스 핸들러 정리
  useEffect(() => {
    return () => {
      debouncedSearchRef.cancel();
    };
  }, [debouncedSearchRef]);

  return {
    articles,
    loading,
    error,
    pagination: {
      currentPage,
      totalPages,
      startPage,
      endPage,
      goToPage,
      goToNextPage,
      goToPrevPage,
    },
    search: {
      handleSearch,
      handleSearchChange,
    },
    handleOrderChange,
  };
}
