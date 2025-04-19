"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ic_profile from "@/assets/images/common/ic_profile.svg";
import DropDownToggle from "@/components/ui/DropDownToggle";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import clsx from "clsx";
import { patchArticleComment } from "@/lib/api/articleComment.api";

export default function CommentsLoad({
  comment,
  updateArticleComment,
  removeArticleComment,
}) {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [body, setBody] = useState({ content: comment.content });
  const { articleId } = useParams();

  // body 업데이트
  const changeValue = (e) => {
    const content = e.target.value;

    setBody({ content });
  };

  // 정렬 선택버튼 토글
  const handleDropDownToggle = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  // 게시글 댓글 수정모드
  const handleEditMode = () => {
    setIsEditMode(true);
  };

  // 게시글 댓글 수정모드 취소
  const handleCancelEditMode = () => {
    setIsEditMode(false);
    setBody({ content: comment.content });
  };

  // 수정 버튼 활성화
  useEffect(() => {
    const { content } = body;

    if (!content.trim()) return setIsActive(false);
    if (content) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [body]);

  return (
    <>
      <div className="flex flex-col gap-y-[8px] sm:gap-y-[12px]">
        <div className="flex flex-col gap-y-[24px]">
          <div className="relative flex justify-between items-center gap-[8px]">
            {isEditMode ? (
              <input
                type="text"
                value={body.content}
                onChange={changeValue}
                placeholder="댓글을 입력해주세요"
                className="flex w-full bg-secondary-gray-100 border-transparent rounded-[12px] outline-none py-[8px] px-[12px] font-normal text-[14px]/[24px] placeholder-secondary-gray-300"
              />
            ) : (
              <p className="flex font-normal text-[14px]/[24px]">
                {comment.content}
              </p>
            )}
            <DropDownToggle
              remove={() => removeArticleComment(articleId, comment.id)}
              handleDropDownToggle={handleDropDownToggle}
              isDropDownVisible={isDropDownVisible}
              handleEditMode={handleEditMode}
            />
          </div>
          <div className="flex justify-between items-center font-normal text-[12px]/[18px]">
            <div className="flex justify-center items-center gap-[8px]">
              <div className="relative w-[32px] h-[32px]">
                <Image
                  src={ic_profile}
                  alt="프로필"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-y-[4px] ">
                <p className="text-secondary-gray-500">똑똑한 판다</p>
                <p className="text-secondary-gray-300">
                  {dayjs(comment.createdAt).format("YYYY. MM. DD")}
                </p>
              </div>
            </div>
            {isEditMode && (
              <div className="flex justify-center items-center gap-[8px]">
                <button
                  type="button"
                  onClick={handleCancelEditMode}
                  className="flex justify-center items-center text-secondary-gray-100 border-none w-[74px] h-[42px] py-[8px] px-[23px] rounded-[8px] text-center font-semibold text-[16px] bg-primary-100 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateArticleComment(articleId, comment.id, body);
                    setIsEditMode(false);
                  }}
                  disabled={!isActive}
                  className={clsx(
                    isActive
                      ? "bg-primary-100 cursor-pointer"
                      : "bg-secondary-gray-300 cursor-default",
                    "flex justify-center items-center text-secondary-gray-100 border-none w-[74px] h-[42px] py-[8px] px-[23px] rounded-[8px] text-center font-semibold text-[16px]"
                  )}
                >
                  수정
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="border-t-[1.3px] border-secondary-gray-200"></div>
      </div>
    </>
  );
}
