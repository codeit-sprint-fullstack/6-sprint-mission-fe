"use client";

import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import kebabImage from "@/assets/images/icons/ic_kebab.png";
import defaultProfileImage from "@/assets/images/logo/defaultProfileImage.png";
import Image from "next/image";
import { useState } from "react";
import Dropdown from "@/app/(main)/(item)/_components/Dropdown";
import { useParams, useRouter } from "next/navigation";
import DeleteModal from "@/app/(main)/(item)/_components/DeleteModal";
import { deleteArticleCommentById } from "@/lib/services/api/article";

export default function CommentCard({ comment }) {
  const { id } = useParams();
  const router = useRouter();
  const [isToggleDropdownState, setIsToggleDropdownState] = useState(false);
  const [isToggleDeleteModalState, setIsToggleDeleteModalState] =
    useState(false);

  const handleDelete = async (id) => {
    const data = await deleteArticleCommentById(id, comment.id);
    // data 가지고 확인 처리.
    setIsToggleDeleteModalState(false);
  };

  const hadleToggleDeleteModal = () => {
    setIsToggleDeleteModalState(false);
  };

  const dropdownItems = [
    { label: "수정하기", onClick: () => router.push(`/community/${id}/edit`) },
    { label: "삭제하기", onClick: () => setIsToggleDeleteModalState(true) },
  ];

  const hadleToggleDropdown = () => {
    setIsToggleDropdownState(!isToggleDropdownState);
  };

  return (
    <div className="px-4 my-4 bg-FC">
      <div className="flex justify-between">
        <p className="text-sm text-gray-800">{comment.content}</p>
        <div className="relative">
          <Image
            src={kebabImage}
            alt="kebabImage"
            onClick={hadleToggleDropdown}
          />
          {isToggleDropdownState && (
            <Dropdown
              items={dropdownItems}
              containerClassName="right-0 top-full bg-FF"
              className="w-33 text-gray-500 text-md-regular border-gray-300 border-2 rounded-lg"
            />
          )}
        </div>
      </div>
      <div className="h-15 flex items-center gap-2 border-b border-gray-100 ">
        <Image
          src={defaultProfileImage}
          alt="userProfileImage"
          className="w-8 h-8"
        />
        <div>
          <p className="text-sm text-gray-600">{comment.user.username}</p>
          <p className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
              locale: ko,
            })}
          </p>
        </div>
      </div>
      {isToggleDeleteModalState && (
        <DeleteModal
          confirmText={"정말로 댓글을 삭제하시겠어요?"}
          handleDeleteProps={handleDelete}
          handleOnCloseProps={hadleToggleDeleteModal}
        />
      )}
    </div>
  );
}
