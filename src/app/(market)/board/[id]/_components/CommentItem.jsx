"use client";

import Dropdown from "@/components/ui/Dropdown";
import { deleteComment, updateComment } from "@/lib/api/commentApi";
import Image from "next/image";
import React, { useState } from "react";

function CommentItem({
  articleId,
  comment,
  setComments,
  editOption,
  getCommentList,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(comment.content);

  // 댓글 편집 핸들러
  const handleEditComment = (action) => {
    if (action === "edit") {
      setIsEdit(true);
      setIsDropdownOpen(false);
    } else if (action === "delete") {
      handleDeleteComment(comment.id);
    }
  };

  // 댓글 수정 핸들러
  const handleUpdateComment = async (commentId, updatedContent) => {
    await updateComment(articleId, comment.id, { content: updatedContent });

    // 수정된 댓글만 찾아서 업데이트
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, content: updatedContent }
          : comment
      )
    );
    setIsEdit(false);
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId) => {
    await deleteComment(articleId, commentId);
    getCommentList();
  };

  return (
    <div className="border-b-1 border-gray-200 mb-4">
      <div className="flex justify-between mb-6">
        {isEdit ? (
          <textarea
            className="text-sm w-full px-3 py-2 outline-1 outline-gray-400 rounded-lg resize-none"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
        ) : (
          <p className="text-sm">{comment.content}</p>
        )}
        <div>
          <Image
            src="/assets/icon/ic_kebab.svg"
            alt="편집 아이콘"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          />
          {isDropdownOpen && (
            <Dropdown items={editOption} onSelect={handleEditComment} />
          )}
        </div>
      </div>
      <div className="text-right mr-5 -translate-y-3">
        {isEdit && (
          <div className="space-x-1">
            <button
              className="btn-base text-sm rounded-4xl px-4 py-1 bg-gray-200 text-black"
              onClick={() => setIsEdit(false)}
            >
              취소
            </button>

            <button
              className="btn-base text-sm rounded-4xl px-4 py-1 bg-gray-400"
              onClick={() => handleUpdateComment(comment.id, updatedContent)}
            >
              저장
            </button>
          </div>
        )}
      </div>
      <div className="flex items-start gap-2 h-10 mb-2">
        <Image
          src="/assets/icon/ic_profile.svg"
          alt="기본 프로필 아이콘"
          width={32}
          height={32}
        />
        <div>
          <div className="text-xs text-gray-600 mb-1">총명한 판다</div>
          <div className="text-xs text-gray-400">1시간 전</div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
