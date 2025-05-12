"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { articlesService } from "../../api/articles";

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
      const response = await articlesService.getComments(currentArticleId);
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
      const response = await articlesService.createComment(
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
      const response = await articlesService.updateComment(
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
      await articlesService.deleteComment(currentArticleId, commentId);

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
