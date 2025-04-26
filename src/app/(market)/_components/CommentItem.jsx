"use client";

import { deleteComment, updateComment } from "@/app/actions/comment";
import Dropdown from "@/components/ui/Dropdown";
import Modal from "@/components/ui/Modal";
import { EDIT_OPTIONS } from "@/const";
import { formatUpdatedAt } from "@/utils/dateUtils";
import Image from "next/image";
import React, { useState } from "react";

function CommentItem({ comment, setComments, getCommentList }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(comment.content);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const timestamp = formatUpdatedAt(comment.createdAt);

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
    const result = await updateComment(commentId, { content: updatedContent });
    if (!result?.success) {
      setError(result.message);
      setIsModalOpen(true);
    } else {
      // 수정된 댓글만 찾아서 업데이트
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: updatedContent }
            : comment
        )
      );
    }
    setIsEdit(false);
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId) => {
    const result = await deleteComment(commentId);
    if (!result?.success) {
      setError(result.message);
      setIsModalOpen(true);
    } else {
      getCommentList();
    }
  };

  return (
    <>
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
              <Dropdown items={EDIT_OPTIONS} onSelect={handleEditComment} />
            )}
          </div>
        </div>
        <div className="text-right mr-5 -translate-y-3">
          {isEdit && (
            <div className="flex justify-end gap-1">
              <button
                className="btn-base text-sm rounded-4xl px-4 h-8 bg-gray-200 text-black"
                onClick={() => setIsEdit(false)}
              >
                취소
              </button>
              <button
                className="btn-base text-sm rounded-4xl px-4 h-8 bg-gray-400"
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
            <div className="text-xs text-gray-600 mb-1">
              {comment.writer.nickname}
            </div>
            <div className="text-xs text-gray-400">{timestamp}</div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal message={error} handleClick={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

export default CommentItem;
