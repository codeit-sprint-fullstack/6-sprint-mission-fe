"use client";

import React, { useEffect, useState } from "react";
import ic_profile from "@/assets/images/common/ic_profile.svg";
import img_reply_empty from "@/assets/images/community/img_reply_empty.svg";
import ic_back from "@/assets/images/community/ic_back.svg";
import Image from "next/image";
import Link from "next/link";
import DropDownToggle from "@/components/ui/DropDownToggle";

export default function CommentList() {
  const [isLoading, setIsLoading] = useState(true);

  const comments = [
    {
      id: "1",
      content: "혹시 사용기간이 어떻게 되실까요?",
      createdAt: "1시간 전",
    },
    {
      id: "2",
      content: "혹시 사용기간이 어떻게 되실까요?",
      createdAt: "1시간 전",
    },
    {
      id: "3",
      content: "혹시 사용기간이 어떻게 되실까요?",
      createdAt: "1시간 전",
    },
  ];

  // 댓글 조회
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full gap-[40px] sm:gap-[48px]">
      {isLoading ? (
        <div className="flex flex-col gap-[16px]">
          <div className="relative w-[140px] h-[140px]">
            <Image
              src={img_reply_empty}
              alt="댓글 대체 기본 이미지"
              fill
              className="object-cover"
            />
          </div>
          <p className="font-normal text-[16px]/[26px] text-center text-secondary-gray-300">
            아직 댓글이 없어요,
            <br />
            지금 댓글을 달아보세요!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-y-[16px] w-full sm:gap-y-[24px]">
          {comments.map((comment) => {
            return <CommentsLoad key={comment.id} comment={comment} />;
          })}
        </div>
      )}

      <Link
        href="/community"
        className="flex justify-center items-center rounded-[40px] py-[11px] px-[39.5px] gap-[8px] bg-primary-100 font-semibold text-[18px]/[26px] text-secondary-gray-100"
      >
        목록으로 돌아가기
        <div className="relative w-[24px] h-[24px]">
          <Image src={ic_back} alt="뒤로 가기" fill className="object-cover" />
        </div>
      </Link>
    </div>
  );
}

function CommentsLoad({ comment }) {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  // 정렬 선택버튼 토글
  const handleDropDownToggle = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  const handleDropDownClose = () => {
    setIsDropDownVisible(false);
  };

  return (
    <>
      <div className="flex flex-col gap-y-[8px] sm:gap-y-[12px]">
        <div className="flex flex-col gap-y-[24px]">
          <div className="relative flex justify-between gap-[8px]">
            <p className="font-normal text-[14px]/[24px]">{comment.content}</p>
            <DropDownToggle
              handleDropDownToggle={handleDropDownToggle}
              handleDropDownClose={handleDropDownClose}
              isDropDownVisible={isDropDownVisible}
            />
          </div>
          <div className="flex justify-start items-center font-normal text-[12px]/[18px]">
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
                <p className="text-secondary-gray-300">{comment.createdAt}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-[1.3px] border-secondary-gray-200"></div>
      </div>
    </>
  );
}
