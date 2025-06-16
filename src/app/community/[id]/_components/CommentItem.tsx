"use client";

import { useState } from "react";
import Image from "next/image";
import { FaEllipsisV } from "react-icons/fa";
import { useComments } from "@/hooks/Article";
import ConfirmModal from "../../../../components/common/ConfirmModal";
import { Article } from "@/types/article";
import { Product } from "@/types/product";
import { Comment } from "@/types/comment";
import { useAuth } from "@/providers/AuthProvider";

export default function CommentItem({
  comment,
  parent,
  onCommentUpdated,
}: {
  comment: Comment;
  parent: Article | Product;
  onCommentUpdated: () => void;
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 댓글 데이터 안전하게 접근
  const commentData = comment;
  const [editContent, setEditContent] = useState(commentData.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 부모 데이터의 구조에 맞게 ID 추출
  const parentId = parent.id;

  const { user } = useAuth();

  const { updateComment, deleteComment } = useComments(parentId);

  // 댓글 수정 취소
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(commentData.content || "");
  };

  // 댓글 수정 저장
  const handleSaveEdit = async () => {
    if (!editContent.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await updateComment(commentData.id, editContent);
      setIsEditing(false);
      setShowOptions(false);
      if (onCommentUpdated) onCommentUpdated();
    } catch (err) {
      console.error("댓글 수정 실패:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 댓글 삭제 모달 열기
  const openDeleteModal = () => {
    setShowOptions(false);
    setShowDeleteModal(true);
  };

  // 댓글 삭제 실행
  const executeDelete = async () => {
    try {
      setIsSubmitting(true);
      await deleteComment(commentData.id);
      if (onCommentUpdated) onCommentUpdated();
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 작성자 정보 추출
  const authorNickname = comment.author.nickname || "독특한판다";

  return (
    <>
      <li className="flex w-full border-b border-[#e5e7eb] pb-4">
        <div className="w-full">
          {isEditing ? (
            <div className="mb-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="h-24 w-full resize-none rounded-lg bg-gray-100 p-3 focus:outline-none"
                disabled={isSubmitting}
              />
              <div className="mt-2 flex justify-end space-x-2">
                <button
                  onClick={handleCancelEdit}
                  className="cursor-pointer rounded-md border border-none bg-white px-6 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  취소
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="cursor-pointer rounded-md bg-[#3692FF] px-10 py-2 text-sm font-medium text-white transition hover:bg-blue-400 disabled:opacity-50"
                  disabled={!editContent.trim() || isSubmitting}
                >
                  {isSubmitting ? "저장 중..." : "저장"}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-md mb-6 text-gray-700">{commentData.content}</p>
          )}

          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <figure className="relative mr-2 h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                <Image
                  src="/img/user_icon.png"
                  alt="프로필"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </figure>
              <div className="ml-2 flex flex-col gap-2">
                <span className="mr-2 text-sm font-medium text-gray-600">
                  {authorNickname}
                </span>
                <span className="text-xs text-gray-400">
                  {commentData.createdAt
                    ? new Date(commentData.createdAt).toLocaleDateString()
                    : "1시간 전"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {!isEditing && (
          <div className="relative">
            {user?.user.id === comment.author.id && (
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="cursor-pointer text-[#9ca3af]"
              >
                <FaEllipsisV />
              </button>
            )}
            {showOptions && (
              <div className="absolute right-0 z-10 w-[100px] rounded-md border-2 border-[#e5e7eb] bg-white py-1 md:w-[140px]">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setShowOptions(false);
                  }}
                  className="flex w-full cursor-pointer items-center justify-center px-4 py-2 text-left text-sm text-[#6b7280] transition-colors hover:text-blue-500"
                >
                  수정하기
                </button>
                <button
                  onClick={openDeleteModal}
                  className="flex w-full cursor-pointer items-center justify-center px-4 py-2 text-left text-sm text-[#6b7280] transition-colors hover:text-red-500"
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        )}
      </li>

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={executeDelete}
        title="댓글 삭제"
        message="정말로 이 댓글을 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
      />
    </>
  );
}
