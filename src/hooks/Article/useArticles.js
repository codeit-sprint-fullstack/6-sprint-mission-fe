"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "lodash-es";
import { articlesService } from "../../api/articles";
import { scrollToTop } from "@/lib/common/scrollTop";

/**
 * 게시글 목록을 조회하고 검색, 정렬, 페이지네이션 기능을 제공하는 커스텀 훅
 *
 * @param {Object} initialOptions - 초기 옵션값
 * @param {number} initialOptions.offset - 페이지 오프셋
 * @param {number} initialOptions.limit - 페이지당 항목 수
 * @param {string} initialOptions.search - 검색어
 * @param {string} initialOptions.sort - 정렬 방식 ("latest" | "popular")
 *
 * @returns {{
 *   articles: Array, // 게시글 배열
 *   loading: boolean, // 로딩 중 여부
 *   error: string | null, // 에러 메시지
 *   pagination: {
 *     currentPage: number, // 현재 페이지 번호
 *     totalPages: number, // 전체 페이지 수
 *     startPage: number, // 표시할 시작 페이지 번호
 *     endPage: number, // 표시할 끝 페이지 번호
 *     goToPage: (page: number) => void, // 특정 페이지로 이동
 *     goToNextPage: () => void, // 다음 페이지로 이동
 *     goToPrevPage: () => void, // 이전 페이지로 이동
 *   },
 *   search: {
 *     handleSearch: (text: string) => void, // 즉시 검색 실행
 *     handleSearchChange: (text: string) => void, // 디바운스 검색 실행
 *   },
 *   handleOrderChange: (type: "좋아요순" | "최신순") => void, // 정렬 방식 변경
 * }}
 */
export function useArticles(initialOptions = {}) {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [options, setOptions] = useState({
    offset: 0,
    limit: 10,
    search: "",
    sort: "latest",
    ...initialOptions,
  });

  const currentPage = Math.floor(options.offset / options.limit) + 1;
  const totalPages = Math.ceil(total / options.limit);

  /**
   * 게시글 데이터를 서버에서 조회하는 함수
   */
  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await articlesService.getArticles(options);
      setArticles(response.data);
      setTotal(response.pagination.total);
    } catch (error) {
      setError(error.message);
      console.error("게시글 목록 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [options]);

  /**
   * 검색어를 즉시 적용하는 함수
   */
  const applySearch = useCallback((search) => {
    setOptions((prev) => ({
      ...prev,
      search,
      offset: 0,
    }));
  }, []);

  /**
   * 디바운스된 검색어 적용을 위한 핸들러 (300ms)
   */
  const debouncedSearchRef = useRef(
    debounce((search) => {
      applySearch(search);
    }, 300),
  ).current;

  /**
   * 검색어 입력 변경 시 호출되는 디바운스 핸들러
   */
  const debouncedSearchChange = useCallback(
    (search) => {
      debouncedSearchRef(search);
    },
    [debouncedSearchRef],
  );

  /**
   * 정렬 방식 변경 핸들러 ("좋아요순", "최신순")
   */
  const handleOrderChange = useCallback((sortType) => {
    const sort = sortType === "좋아요순" ? "popular" : "latest";
    setOptions((prev) => ({
      ...prev,
      sort,
      offset: 0,
    }));
  }, []);

  /**
   * 지정한 페이지 번호로 이동
   */
  const goToPage = useCallback(
    (pageNumber) => {
      if (!loading) {
        const newOffset = (pageNumber - 1) * options.limit;
        setOptions((prev) => ({
          ...prev,
          offset: newOffset,
        }));
        scrollToTop();
      }
    },
    [loading, options.limit],
  );

  /**
   * 다음 페이지로 이동
   */
  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages && !loading) {
      goToPage(currentPage + 1);
      scrollToTop();
    }
  }, [currentPage, totalPages, loading, goToPage]);

  /**
   * 이전 페이지로 이동
   */
  const goToPrevPage = useCallback(() => {
    if (currentPage > 1 && !loading) {
      goToPage(currentPage - 1);
      scrollToTop();
    }
  }, [currentPage, loading, goToPage]);

  /**
   * 화면에 표시할 페이지 범위를 계산하는 함수
   */
  const getPageRange = useCallback(() => {
    const pageCount = 5;
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
      totalPages,
      currentPage,
      startPage,
      endPage,
      goToPage,
      goToNextPage,
      goToPrevPage,
    },
    handleSearch: debouncedSearchChange,
    handleOrderChange,
  };
}
