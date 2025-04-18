"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "lodash-es";
import * as articleApi from "../api/articles";

/**
 * 게시글 목록 조회 훅
 * @param {Object} options - 게시글 목록 조회 옵션
 * @param {number} options.offset - 페이지 오프셋
 * @param {number} options.limit - 한 페이지당 항목 수
 * @param {string} options.search - 검색어
 * @param {string} options.orderBy - 정렬 방식 (latest 또는 popular)
 * @returns {Object} 게시글 목록 상태 및 함수
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

  // 페이지 변경 핸들러
  const handlePageChange = useCallback((newOffset) => {
    setOptions((prev) => ({
      ...prev,
      offset: newOffset,
    }));
  }, []);

  // 로드 모어 핸들러
  const loadMore = useCallback(() => {
    if (pagination.hasMore && !loading) {
      setOptions((prev) => ({
        ...prev,
        offset: prev.offset + prev.limit,
      }));
    }
  }, [pagination.hasMore, loading]);

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
    pagination,
    loading,
    error,
    handleSearch,
    handleSearchChange,
    handleOrderChange,
    handlePageChange,
    loadMore,
    refetch: fetchArticles,
    currentOptions: options,
  };
}

/**
 * 특정 게시글 조회 훅
 * @param {string} articleId - 게시글 ID
 * @returns {Object} 게시글 상태 및 함수
 */
export function useArticle(articleId) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticle = useCallback(async () => {
    if (!articleId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await articleApi.getArticle(articleId);
      setArticle(data);
    } catch (error) {
      setError(error.message);
      console.error("게시글 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  const updateArticle = useCallback(
    async (articleData) => {
      if (!articleId) return;

      try {
        setLoading(true);
        setError(null);
        const updatedArticle = await articleApi.updateArticle(
          articleId,
          articleData,
        );
        setArticle(updatedArticle);
        return updatedArticle;
      } catch (error) {
        setError(error.message);
        console.error("게시글 수정 실패:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [articleId],
  );

  const deleteArticle = useCallback(async () => {
    if (!articleId) return;

    try {
      setLoading(true);
      setError(null);
      await articleApi.deleteArticle(articleId);
      setArticle(null);
      return true;
    } catch (error) {
      setError(error.message);
      console.error("게시글 삭제 실패:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  // 초기 렌더링 시 데이터 조회
  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  return {
    article,
    loading,
    error,
    updateArticle,
    deleteArticle,
    refetch: fetchArticle,
  };
}

/**
 * 댓글 목록 조회 훅
 * @param {string} articleId - 게시글 ID
 * @returns {Object} 댓글 목록 상태 및 함수
 */
export function useComments(articleId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // articleId를 참조로 저장하여 안정적인 참조 유지
  const articleIdRef = useRef(articleId);

  // articleId가 변경되면 참조 업데이트
  useEffect(() => {
    articleIdRef.current = articleId;
  }, [articleId]);

  const fetchComments = useCallback(async () => {
    const currentArticleId = articleIdRef.current;
    if (!currentArticleId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await articleApi.getComments(currentArticleId);
      setComments(response.data || []);
    } catch (error) {
      setError(error.message);
      console.error("댓글 목록 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addComment = useCallback(async (commentData) => {
    const currentArticleId = articleIdRef.current;
    if (!currentArticleId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await articleApi.createComment(
        currentArticleId,
        commentData,
      );

      // 댓글 데이터가 유효한지 확인
      if (response && response.data) {
        // 함수형 업데이트로 상태 변경
        setComments((prevComments) => [response.data, ...(prevComments || [])]);
        return response.data;
      }
    } catch (error) {
      setError(error.message);
      console.error("댓글 작성 실패:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateComment = useCallback(async (commentId, commentData) => {
    const currentArticleId = articleIdRef.current;
    if (!currentArticleId || !commentId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await articleApi.updateComment(
        currentArticleId,
        commentId,
        commentData,
      );

      // 수정된 댓글 반영
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? response.data : comment,
        ),
      );
      return response.data;
    } catch (error) {
      setError(error.message);
      console.error("댓글 수정 실패:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteComment = useCallback(async (commentId) => {
    const currentArticleId = articleIdRef.current;
    if (!currentArticleId || !commentId) return;

    try {
      setLoading(true);
      setError(null);
      await articleApi.deleteComment(currentArticleId, commentId);

      // 삭제된 댓글 제거
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      return true;
    } catch (error) {
      setError(error.message);
      console.error("댓글 삭제 실패:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // 초기 렌더링 시 데이터 조회
  useEffect(() => {
    fetchComments();
  }, [fetchComments, articleId]); // articleId가 변경될 때마다 다시 조회

  return {
    comments,
    loading,
    error,
    addComment,
    updateComment,
    deleteComment,
    refetch: fetchComments,
  };
}
