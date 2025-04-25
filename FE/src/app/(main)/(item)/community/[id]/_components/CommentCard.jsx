"use client";

import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import kebabImage from "@/assets/images/icons/ic_kebab.png";
import defaultProfileImage from "@/assets/images/logo/defaultProfileImage.png";
import Image from "next/image";
import { useState } from "react";
import Dropdown from "@/app/(main)/(item)/_components/Dropdown";
import { useParams, useRouter } from "next/navigation";
import ConfirmModal from "@/app/(main)/(item)/_components/ConfirmModal";
import { articleService } from "@/lib/services/api/articleService";

export default function CommentCard({ comment }) {
  const { id } = useParams();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    const data = await articleService.deleteArticleComment(id, comment.id);
    // data 가지고 확인 처리.
    setIsModalOpen(false);
  };

  const hadleModalOpen = () => {
    setIsModalOpen(false);
  };

  const dropdownItems = [
    { label: "수정하기", onClick: () => router.push(`/community/${id}/edit`) },
    { label: "삭제하기", onClick: () => setIsModalOpen(true) },
  ];

  const hadleDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="px-4 my-4 bg-FC">
      <div className="flex justify-between">
        <p className="text-sm text-gray-800">{comment.content}</p>
        <div className="relative">
          <Image
            src={kebabImage}
            alt="kebabImage"
            onClick={hadleDropdownOpen}
          />
          {isDropdownOpen && (
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
      {isModalOpen && (
        <ConfirmModal
          modalTheme={"red"}
          modalType={confirmChoice}
          confirmText={"정말로 댓글을 삭제하시겠어요?"}
          handleOnClick={handleDelete(id)}
          handleOnCloseModal={hadleModalOpen}
        />
      )}
    </div>
  );
}
