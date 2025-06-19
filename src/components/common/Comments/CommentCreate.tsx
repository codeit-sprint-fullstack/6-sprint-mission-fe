"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentService } from "@/service/commentService";

type TCreateArticleComment = {
  id: number;
  createdAt: Date;
  authorId: string;
  articleId: number;
  content: string;
};

type TCreateProductComment = {
  id: number;
  createdAt: Date;
  authorId: string;
  productId: number;
  content: string;
};

type TCreateCommentBody = { content: string };

export default function CommentCreate() {
  const [body, setBody] = useState<{ content: string }>({ content: "" });
  const [isActive, setIsActive] = useState<boolean>(false);

  const { articleId, productId } = useParams<{
    articleId: string;
    productId: string;
  }>();
  const queryClient = useQueryClient();

  const type = articleId ? "articles" : "products";
  const id = articleId || productId;

  // 댓글 작성 API
  const { mutate: createComment } = useMutation<
    TCreateArticleComment | TCreateProductComment,
    Error,
    { type: string; id: string; body: TCreateCommentBody }
  >({
    mutationFn: ({ type, id, body }) =>
      commentService.createComment(type, id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    },
  });

  // 댓글 작성
  const handleCreateComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { content } = body;

    createComment({ type, id, body: { content: content.trim() } });
    setBody({ content: "" });
  };

  // body 변경
  const changeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    setBody((prevBody) => ({ ...prevBody, [id]: value }));
  };

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

  return (
    <form
      onSubmit={handleCreateComment}
      className="flex flex-col w-full gap-[16px]"
    >
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
