"use client";
import { deleteArticle } from "@/lib/api/article";
import { deleteComment } from "@/lib/api/comment";
import { TArticle, TComment, TItem } from "@/types";
import { useRouter } from "next/navigation";

import React from "react";

interface DropdownProps {
  type: "article" | "item";
  id: TItem["id"] | TArticle["id"];
  commentId?: TComment["id"] | null;
  setIsEdit?: ((value: boolean) => void) | null;
  setIsModalOpen?: ((value: boolean) => void) | null;
}

function Dropdown({
  type,
  id,
  commentId = null,
  setIsEdit = null,
  setIsModalOpen = null,
}: DropdownProps) {
  const router = useRouter();

  const handleClickDelete = async () => {
    if (!commentId && type === "article") {
      await deleteArticle(id);
      router.push("/articles");
    } else if (!commentId && type === "item") {
      if (setIsModalOpen) setIsModalOpen(true);
    } else {
      if (commentId) await deleteComment(commentId);
      window.location.reload();
    }
  };
  const handleClickPatch = async () => {
    if (!commentId && type === "article") {
      router.push(`/articles/post/${id}`);
    } else if (!commentId && type === "item") {
      router.push(`/items/post/${id}`);
    } else {
      if (setIsEdit) setIsEdit(true);
    }
  };
  return (
    <div className="w-26 h-23 border border-gray-300 rounded-xl flex flex-col items-center justify-evenly text-gray-500 bg-white md:w-35">
      <button onClick={handleClickPatch}>수정하기</button>
      <button onClick={handleClickDelete}>삭제하기</button>
    </div>
  );
}

export default Dropdown;
