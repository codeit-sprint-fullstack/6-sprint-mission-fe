"use client";

import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import Image from "next/image";
import ProfileImage from "@/components/ui/ProfileImage";
import Dropdown from "../../_components/Dropdown";
import kebabImage from "@/assets/images/icons/ic_kebab.png";
import InputBox from "@/components/ui/InputBox";
import { productService } from "@/lib/services/api/productService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CommentCard({ comment, productId }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpenEditBox, setIsOpenEditBox] = useState(false);
  const [editCommentContent, setEditCommentContent] = useState(comment.content);

  const queryClient = useQueryClient();

  const editCommentMutation = useMutation({
    mutationFn: (newContent) =>
      productService.updateProductComment(comment.id, { content: newContent }),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", productId]);
      handleCloseEditBox();
      setIsDropdownOpen(false);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: () => productService.deleteProductComment(comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", productId]);
      setIsDropdownOpen(false);
    },
  });

  const handleSubmitEditComment = (e) => {
    e.preventDefault();
    editCommentMutation.mutate(editCommentContent);
  };

  const handleDeleteComment = () => {
    deleteCommentMutation.mutate();
  };

  const handleOnChangeCommentInput = (e) => {
    setEditCommentContent(e.target.value);
  };

  const handleOpenEditBox = () => {
    setIsOpenEditBox(true);
  };

  const handleCloseEditBox = () => {
    setIsOpenEditBox(false);
    setEditCommentContent(comment.content);
  };

  const dropdownItems = [
    {
      label: "수정하기",
      onClick: () => handleOpenEditBox(),
    },
    { label: "삭제하기", onClick: () => handleDeleteComment() },
  ];

  const hadleDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex flex-col border-b-1 border-gray-300 py-3">
      {isOpenEditBox ? (
        <form onSubmit={handleSubmitEditComment}>
          <InputBox
            placeHolderText={"수정하실 내용을 입력해주세요."}
            inputValueState={editCommentContent}
            onChangeInput={handleOnChangeCommentInput}
            inputType={"textarea"}
          />
          <div className="relative">
            <div className="absolute z-50 right-0 top-full mt-3 flex gap-2 items-center">
              <button
                className=" w-17 h-12 font-semibold text-gray-500 rounded-lg"
                onClick={handleCloseEditBox}
              >
                취소
              </button>
              <button
                className="bg-primary-100 w-26 h-11 font-semibold text-gray-100 rounded-lg"
                type="submit"
              >
                수정 완료
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex justify-between text-gray-800 text-sm ">
          <p>{comment.content}</p>
          <div className="relative">
            <Image
              src={kebabImage}
              alt="editComment"
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
      )}

      <div className="flex items-center gap-2 py-2">
        <ProfileImage className={"w-8 h-auto object-cover "} />
        <div className="text-xs flex flex-col gap-y-1 mt-2">
          <p className="text-gray-600 ">{comment.writer.nickname}</p>
          <p className="text-gray-400 ">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
              locale: ko,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
