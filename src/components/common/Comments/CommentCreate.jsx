"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useParams } from "next/navigation";

export default function CommentCreate({
  body,
  createArticleComment,
  changeValue,
}) {
  const [isActive, setIsActive] = useState(false);
  const { articleId, productId } = useParams();

  // 등록 버튼 활성화
  useEffect(() => {
    const { content } = body;
    if (!content.trim()) return setIsActive(false);

    if (content) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [body]);

  // 게시글 댓글 작성
  const handleSubmit = async (e) => {
    e.preventDefault();

    createArticleComment(articleId, body);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-[16px]">
      <section className="flex flex-col gap-[12px]">
        <p className="font-semibold text-[16px] sm:text-[18px]">
          {articleId ? "댓글 작성하기" : "문의하기"}
        </p>
        <textarea
          onChange={changeValue}
          value={body.content}
          name="content"
          id="content"
          placeholder={
            articleId
              ? "댓글을 입력해주세요"
              : "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          }
          className={clsx(
            articleId
              ? "text-[16px]/[26px] h-[104px]"
              : "text-[14px]/[24px] h-[129px] sm:h-[104px]",
            "bg-secondary-gray-100 border-transparent rounded-[12px] outline-none py-[16px] px-[24px] font-normal placeholder-secondary-gray-300 resize-none"
          )}
        />
      </section>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!isActive}
          className={clsx(
            isActive
              ? "bg-primary-100 hover:bg-primary-200 active:bg-primary-300 cursor-pointer"
              : "bg-secondary-gray-300 cursor-default",
            "flex justify-center items-center text-secondary-gray-100 border-none w-[74px] h-[42px] py-[8px] px-[23px] rounded-[8px] text-center font-semibold text-[16px]"
          )}
        >
          등록
        </button>
      </div>
    </form>
  );
}
