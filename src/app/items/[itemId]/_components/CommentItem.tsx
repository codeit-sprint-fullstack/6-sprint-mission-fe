"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { updateProductComment, deleteProductComment } from "@/api/item.api";

interface CommentItemProps {
  comment: {
    id: number;
    content: string;
    author: string;
    time: string;
  };
  productId: string;
  onCommentUpdated?: () => void;
}

export default function CommentItem({
  comment,
  onCommentUpdated,
  productId,
}: CommentItemProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<string>(comment.content);

  const handleUpdate = async () => {
    try {
      await updateProductComment(productId, comment.id, editedContent);
      setIsEditing(false);
      onCommentUpdated?.(); // 댓글 목록 새로고침
    } catch (e: unknown) {
      console.error("댓글 수정 실패", e);
    }
  };

  const handleDelete = async () => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await deleteProductComment(productId, comment.id);
      onCommentUpdated?.(); // 댓글 목록 새로고침
    } catch (e: unknown) {
      console.error("댓글 삭제 실패", e);
    }
  };

  return (
    <div className="relative w-full max-w-[1200px] h-[100px] bg-gray-50 pb-3 border-b border-secondary-200">
      {/* 점 세 개 버튼 */}
      <button
        className="absolute top-1 right-1 text-secondary-400 hover:text-secondary-600"
        aria-label="댓글 옵션 열기"
        onClick={() => setShowMenu(!showMenu)}
      >
        <HiOutlineDotsVertical size={24} />
      </button>

      {/* 옵션 메뉴 */}
      {showMenu && (
        <div className="absolute right-2 top-8 z-10 bg-white border border-gray-200 rounded shadow w-[80px] text-sm">
          <button
            onClick={() => {
              setIsEditing(true);
              setShowMenu(false);
            }}
            className="block w-full px-3 py-2 hover:bg-gray-100 text-left"
          >
            수정하기
          </button>
          <button
            onClick={handleDelete}
            className="block w-full px-3 py-2 hover:bg-gray-100 text-left"
          >
            삭제하기
          </button>
        </div>
      )}

      {/* 댓글 내용 (수정 vs 일반 보기) */}
      {isEditing ? (
        <div className="mb-2">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-[56px] px-4 py-3 rounded-lg bg-gray-100 text-sm resize-none outline-none"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-sm rounded hover:bg-gray-100 text-gray-500"
            >
              취소
            </button>
            <button
              onClick={handleUpdate}
              className="px-3 py-1 text-sm rounded bg-primary-100 text-white hover:bg-primary-200"
            >
              저장
            </button>
          </div>
        </div>
      ) : (
        <div className="text-[14px] font-[400] text-secondary-800 mb-3">
          {comment.content}
        </div>
      )}

      {/* 작성자 정보는 항상 아래에 보여주기 */}
      <div className="flex items-center gap-3 text-xs font-[400] text-secondary-600">
        <div className="relative w-[32px] h-[32px]">
          <Image
            src="/images/profile.png"
            alt="profile"
            className="object-cover"
            fill
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>{comment.author}</span>
          <span className="text-secondary-400">{comment.time}</span>
        </div>
      </div>
    </div>
  );
}
