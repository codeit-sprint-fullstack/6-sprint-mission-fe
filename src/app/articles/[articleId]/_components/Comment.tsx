"use client";

import React, { useState } from "react";

import useOutsideClick from "@/hook/useOutsideClick";
import { patchComment } from "@/lib/api/comment";
import Dropdown from "@/components/Dropdown";
import { TArticle, TComment } from "@/types";
import Image from "next/image";

interface CommentProps {
  dcontent: TComment["content"];
  commentId: TComment["id"];
  articleId: TArticle["id"];
}

function Comment({ dcontent, commentId, articleId }: CommentProps) {
  const { isOpen, setIsOpen, dropDownRef } = useOutsideClick();
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(dcontent);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };
  const handleClickCancel = () => {
    setIsEdit(false);
  };
  const handleClickEdit = async () => {
    await patchComment(commentId, {
      content,
    });
    setIsEdit(false);
    window.location.reload();
  };
  return (
    <div className="border-b border-gray-200 h-auto pb-3">
      {isEdit ? (
        <textarea
          value={content}
          className="bg-gray-100 w-full h-20 rounded-xl pl-6 pt-4"
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <div className="flex justify-between">
          <p>{dcontent}</p>
          <div className="relative h-4">
            <div className="w-3 h-4 flex justify-center" onClick={handleClick}>
              <Image
                alt="setting"
                className="w-1 h-4"
                src="/assets/ic/ic_setting.png"
              />
            </div>
            {isOpen && (
              <div
                ref={dropDownRef}
                className="absolute right-0 top-full mt-2 z-50"
              >
                <Dropdown
                  type={"article"}
                  id={articleId}
                  commentId={commentId}
                  setIsEdit={setIsEdit}
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div className="mt-6 flex justify-between">
        <div className="flex">
          <Image
            alt="profile"
            src="/assets/ic/ic_profile.png"
            className="w-8 h-8"
          />
          <div className="ml-2">
            <p className="text-gray-600 text-xs">똑똑한 판다</p>
            <p className="text-gray-400 text-xs">1시간 전</p>
          </div>
        </div>
        {isEdit ? (
          <div>
            <button
              onClick={handleClickCancel}
              className="px-5 pb-2 pt-3.5 font-bold text-gray-500"
            >
              취소
            </button>
            <button
              onClick={handleClickEdit}
              className="px-6 py-2 bg-primary-100 rounded-xl text-white font-bold"
            >
              수정 완료
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Comment;
