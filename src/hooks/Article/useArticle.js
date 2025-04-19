"use client";

import { useState, useEffect, useCallback } from "react";
import * as articleApi from "../../api/articles";

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
