"use client";

import React, { useEffect, useState } from "react";
import img_reply_empty from "@/assets/images/community/img_reply_empty.svg";
import ic_back from "@/assets/images/community/ic_back.svg";
import Image from "next/image";
import Link from "next/link";
import CommentsLoad from "./CommentsLoad";

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
