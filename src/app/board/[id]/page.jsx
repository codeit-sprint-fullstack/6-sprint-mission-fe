"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getArticle,
  getArticleComments,
  createArticleComment,
  deleteArticle,
  deleteComment,
  updateComment,
} from "@/lib/api(board)";

import ArticleHeader from "@/components/ArticleHeader";
import ArticleContent from "@/components/ArticleContent";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";

export default function ArticleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id;

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const loadData = useCallback(async () => {
    if (!articleId) return;
    setIsLoading(true);
    setError(null);
    try {
      const articleData = await getArticle(articleId);

      setArticle({ ...articleData, isOwner: articleData.isOwner ?? false });

      const commentsResponse = await getArticleComments(articleId, {
        take: 10,
      });
      const commentsWithDefaults = (commentsResponse.data || []).map(
        (comment) => ({
          ...comment,
          isOwner: comment.isOwner ?? false,
          author: comment.author || {
            nickname: "익명",
            profileUrl: "/images/board/ic_profile.png",
          },
        })
      );
      setComments(commentsWithDefaults);
    } catch (err) {
      console.error("데이터 로딩 실패:", err);
      setError("게시글 정보를 불러오는 중 오류가 발생했습니다.");
      setArticle(null);
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setIsCommentLoading(true);
    try {
      const createdComment = await createArticleComment(articleId, {
        content: newComment,
      });

      const commentWithAuthor = {
        ...createdComment,
        isOwner: true,
        author: createdComment.author || {
          nickname: "익명",
          profileUrl: "/img/board/ic_profile.png",
        },
      };
      setComments((prevComments) => [commentWithAuthor, ...prevComments]);
      setNewComment("");
    } catch (err) {
      console.error("댓글 등록 실패:", err);
      alert("댓글 등록 중 오류가 발생했습니다.");
    } finally {
      setIsCommentLoading(false);
    }
  };

  const handleEditArticle = () => {
    router.push(`/board/${articleId}/edit`);
  };

  const handleDeleteArticle = async () => {
    if (confirm("정말로 게시글을 삭제하시겠습니까?")) {
      try {
        await deleteArticle(articleId);
        alert("게시글이 삭제되었습니다.");
        router.push("/board");
      } catch (err) {
        console.error("게시글 삭제 실패:", err);
        alert("게시글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleEditComment = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setEditingCommentContent(currentContent);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingCommentContent("");
  };

  const handleSaveComment = async (commentId) => {
    if (!editingCommentContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    setIsSavingEdit(true);
    try {
      const updatedComment = await updateComment(commentId, {
        content: editingCommentContent,
      });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                content: updatedComment.content,
              }
            : comment
        )
      );
      handleCancelEdit();
    } catch (err) {
      console.error("댓글 수정 실패:", err);
      alert("댓글 수정 중 오류가 발생했습니다.");
    } finally {
      setIsSavingEdit(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (deletingCommentId === commentId) return;

    if (confirm("정말로 댓글을 삭제하시겠습니까?")) {
      setDeletingCommentId(commentId);
      try {
        await deleteComment(commentId);
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
        if (editingCommentId === commentId) {
          handleCancelEdit();
        }
      } catch (err) {
        console.error("댓글 삭제 실패:", err);
        alert("댓글 삭제 중 오류가 발생했습니다.");
      } finally {
        setDeletingCommentId(null);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto pt-[24px] pb-10 flex justify-center items-center min-h-[calc(100vh-70px-160px)]">
        로딩 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1200px] mx-auto pt-[24px] pb-10 text-red-500 min-h-[calc(100vh-70px-160px)]">
        {error}
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-[1200px] mx-auto pt-[24px] pb-10 min-h-[calc(100vh-70px-160px)]">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto pt-[24px] pb-10 flex flex-col min-h-[calc(100vh-70px-160px)]">
      <ArticleHeader
        article={article}
        onEdit={handleEditArticle}
        onDelete={handleDeleteArticle}
      />
      <ArticleContent content={article.content} />
      <CommentForm
        newComment={newComment}
        setNewComment={setNewComment}
        handleCommentSubmit={handleCommentSubmit}
        isCommentLoading={isCommentLoading}
      />
      <CommentList
        comments={comments}
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
        editingCommentId={editingCommentId}
        editingCommentContent={editingCommentContent}
        onEditingContentChange={setEditingCommentContent}
        onSaveEdit={handleSaveComment}
        onCancelEdit={handleCancelEdit}
        isSavingEdit={isSavingEdit}
        deletingCommentId={deletingCommentId}
      />

      <div className="flex justify-center mt-10">
        <Link href="/board">
          <Image
            src="/images/board/btn_medium.png"
            alt="목록으로 돌아가기"
            width={180}
            height={48}
            className="cursor-pointer hover:opacity-90 transition-opacity"
            priority={false}
          />
        </Link>
      </div>
    </div>
  );
}
