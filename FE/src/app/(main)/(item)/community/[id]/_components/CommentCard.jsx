"use client";

import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { articleService } from "@/lib/services/api/articleService";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ProfileImage from "@/components/ui/ProfileImage";
import Dropdown from "@/app/(main)/(item)/_components/Dropdown";
import kebabImage from "@/assets/images/icons/ic_kebab.png";

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
        <ProfileImage className={"w-8 h-8"} />
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
          confirmType={"confirm"}
          confirmText={"정말로 댓글을 삭제하시겠어요?"}
          handleOnClick={handleDelete(id)}
          handleOnCloseModal={hadleModalOpen}
        />
      )}
    </div>
  );
}
