"use client";

import { deleteComment, updateComment } from "@/lib/actions/comment";
import Dropdown from "@/components/ui/Dropdown";
import Modal from "@/components/ui/Modal";

import { formatUpdatedAt } from "@/lib/utils/dateUtils";
import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { EDIT_OPTIONS } from "@/constant";
import { Comment } from "@/types";
import { CommentProps } from "./Comment.types";

interface CommentItemProps extends CommentProps {
  comment: Comment;
}

function CommentItem({ comment, setComments, getCommentList }: CommentItemProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(comment.content);
  const [modalMsg, setModalMsg] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const timestamp = formatUpdatedAt(comment.createdAt);
  const { user } = useAuth();

  // 댓글 편집 핸들러
  const handleEditComment = (action: string) => {
    if (action === "edit") {
      setIsEdit(true);
      setIsDropdownOpen(false);
    } else if (action === "delete") {
      setIsModalOpen(true);
      setModalMsg("정말로 삭제하시겠어요?");
      setIsDelete(true);
    }
  };

  // 댓글 수정 핸들러
  const handleUpdateComment = async (
    commentId: Comment["id"],
    updatedContent: Comment["content"]
  ) => {
    const result = await updateComment({ commentId, content: updatedContent });
    if (!result?.success) {
      setIsModalOpen(true);
    } else {
      // 수정된 댓글만 찾아서 업데이트
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? { ...comment, content: updatedContent } : comment
        )
      );
    }
    setIsEdit(false);
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId: Comment["id"]) => {
    const result = await deleteComment({ commentId });
    if (!result?.success) {
      setIsModalOpen(true);
      setModalMsg(result.message);
    } else {
      getCommentList();
    }
  };

  return (
    <>
      <div className="mb-4 border-b-1 border-gray-200">
        <div className="mb-6 flex justify-between">
          {isEdit ? (
            <textarea
              className="w-full resize-none rounded-lg px-3 py-2 text-sm outline-1 outline-gray-400"
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
            />
          ) : (
            <p className="text-sm">{comment.content}</p>
          )}
          <div>
            {user?.id === comment.writer.id && (
              <Image
                src="/assets/icon/ic_kebab.svg"
                alt="편집 아이콘"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              />
            )}
            {isDropdownOpen && <Dropdown items={EDIT_OPTIONS} onSelect={handleEditComment} />}
          </div>
        </div>
        <div className="mr-5 -translate-y-3 text-right">
          {isEdit && (
            <div className="flex justify-end gap-1">
              <button
                className="btn-base h-8 rounded-4xl bg-gray-200 px-4 text-sm text-black"
                onClick={() => setIsEdit(false)}
              >
                취소
              </button>
              <button
                className="btn-base h-8 rounded-4xl bg-gray-400 px-4 text-sm"
                onClick={() => handleUpdateComment(comment.id, updatedContent)}
              >
                저장
              </button>
            </div>
          )}
        </div>
        <div className="mb-2 flex h-10 items-start gap-2">
          <Image
            src="/assets/icon/ic_profile.svg"
            alt="기본 프로필 아이콘"
            width={32}
            height={32}
          />
          <div>
            <div className="mb-1 text-xs text-gray-600">{comment.writer.nickname}</div>
            <div className="text-xs text-gray-400">{timestamp}</div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          message={modalMsg}
          handleClick={() => setIsModalOpen(false)}
          isDelete={isDelete}
          itemId={comment.id}
          handleDelete={handleDeleteComment}
        />
      )}
    </>
  );
}

export default CommentItem;
