"use client";

import { useState } from "react";
import Image from "next/image";
import { FaEllipsisV } from "react-icons/fa";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { formatDate } from "@/utils/format";
import { User } from "@/types/user";
import { Comment } from "@/types/comment";

export default function CommentItem({
  comment,
  onUpdateComment,
  onDeleteComment,
  user,
}: {
  comment: Comment;
  onUpdateComment: (commentId: string, content: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  user: User | null;
}) {
  // user 객체에서 id 가져오기 (중첩된 구조)
  const getUserId = () => {
    if (!user) return null;
    return user.user?.id;
  };

  const userId = getUserId();

  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 수정 취소
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  // 댓글 수정 저장
  const handleSaveEdit = async () => {
    if (!editContent.trim() || isSubmitting) return;
    try {
      setIsSubmitting(true);

      await onUpdateComment(comment.id, editContent);
      setIsEditing(false);
      setShowOptions(false);
    } catch (err) {
      console.error("댓글 수정 실패:", err);
      alert("댓글 수정에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 삭제 모달 열기
  const openDeleteModal = () => {
    setShowOptions(false);
    setShowDeleteModal(true);
  };

  // 댓글 삭제 실행
  const executeDelete = async () => {
    try {
      setIsSubmitting(true);
      await onDeleteComment(comment.id);
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
      alert("댓글 삭제에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
      setShowDeleteModal(false);
    }
  };

  // 사용자 닉네임 가져오기
  const getUserNickname = () => {
    if (!user || !user.user) return "사용자";
    return user.user.nickname || "사용자";
  };

  return (
    <>
      <li className="flex w-full border-b border-[#e5e7eb] pb-4">
        <div className="w-full">
          {/* 수정 모드 */}
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
            // 일반 모드
            <p className="text-md mb-6 whitespace-pre-line text-gray-700">
              {comment.content}
            </p>
          )}

          {/* 작성자 정보 */}
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
                  {userId === comment.author.id ? getUserNickname() : "사용자"}
                </span>
                <span className="text-xs text-gray-400">
                  {formatDate(comment.createdAt.toString())}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 옵션 버튼 */}
        {userId === comment.author.id && (
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="cursor-pointer text-[#9ca3af]"
            >
              <FaEllipsisV />
            </button>
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
