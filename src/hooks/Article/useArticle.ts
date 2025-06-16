"use client";

import { useState, useEffect, useCallback } from "react";
import { articlesService } from "../../api/articles";
import { Article } from "@/types/article";

export function useArticle(articleId: Article["id"]) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 단일 게시글 조회
  const fetchArticle = useCallback(async () => {
    if (!articleId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await articlesService.getArticle(articleId);

      // 새로운 API 응답 구조 처리
      setArticle(response);
      return response;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다"
      );
      console.error("게시글 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  // 게시글 수정
  const updateArticle = useCallback(
    async (articleData: Pick<Article, "title" | "content" | "images">) => {
      if (!articleId) return;

      try {
        setLoading(true);
        setError(null);

        // 게시글 수정 API 호출
        const response = await articlesService.updateArticle(
          articleId,
          articleData
        );

        // 응답 데이터가 있으면 게시글 상태 업데이트
        if (response) {
          // 현재 API 응답 구조에 맞게 업데이트
          setArticle(response);
          return response;
        }

        return null;
      } catch (error) {
        console.error("게시글 수정 오류:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [articleId]
  );

  // 게시글 삭제
  const deleteArticle = useCallback(async () => {
    if (!articleId) return;

    try {
      setLoading(true);
      setError(null);
      await articlesService.deleteArticle(articleId);
      setArticle(null);
      return true;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다"
      );
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
