"use client";

import React from "react";
import img_reply_empty from "@/assets/images/community/img_reply_empty.svg";
import ic_back from "@/assets/images/community/ic_back.svg";
import Image from "next/image";
import Link from "next/link";
import CommentsLoad from "./CommentsLoad";

export default function CommentList({
  isLoading,
  comments,
  updateArticleComment,
  removeArticleComment,
}) {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-[40px] sm:gap-[48px]">
      {isLoading ? (
        "댓글 불러오는 중..."
      ) : !comments.length ? (
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
            return (
              <CommentsLoad
                key={comment.id}
                comment={comment}
                updateArticleComment={updateArticleComment}
                removeArticleComment={removeArticleComment}
              />
            );
          })}
        </div>
      )}

      <Link
        href="/community"
        className="flex justify-center items-center rounded-[40px] py-[11px] px-[39.5px] gap-[8px] bg-primary-100 hover:bg-primary-200 active:bg-primary-300 font-semibold text-[18px]/[26px] text-secondary-gray-100"
      >
        목록으로 돌아가기
        <div className="relative w-[24px] h-[24px]">
          <Image src={ic_back} alt="뒤로 가기" fill className="object-cover" />
        </div>
      </Link>
    </div>
  );
}
