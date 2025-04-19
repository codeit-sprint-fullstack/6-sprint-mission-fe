"use client";

import { useState, useEffect, useCallback } from "react";
import * as articleApi from "../../api/articles";

/**
 * 단일 게시글 조회 훅
 * @param {string} articleId - 게시글 ID
 * @returns {Object} 게시글 상태 및 함수
 */
export function useArticle(articleId) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 단일 게시글 조회
  const fetchArticle = useCallback(async () => {
    if (!articleId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await articleApi.getArticle(articleId);
      setArticle(data);
      return data;
    } catch (error) {
      setError(error.message);
      console.error("게시글 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  // 게시글 수정
  const updateArticle = useCallback(
    async (articleData) => {
      if (!articleId) return;

      try {
        setLoading(true);
        setError(null);

        // 게시글 수정 API 호출
        const response = await articleApi.updateArticle(articleId, articleData);

        // 응답 데이터가 있으면 게시글 상태 업데이트
        if (response) {
          // 현재 article 데이터 구조 유지하면서 업데이트
          const updatedArticle = {
            ...article,
            data: {
              ...article.data,
              ...articleData,
            },
          };
          setArticle(updatedArticle);
          return updatedArticle;
        }

        return null;
      } catch (error) {
        console.error("게시글 수정 오류:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [articleId, article],
  );

  // 게시글 삭제
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
