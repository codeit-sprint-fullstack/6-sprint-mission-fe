"use client";

import { postService } from "@/service/postService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ArticleForm({ title }) {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [body, setBody] = useState({ title: "", content: "" });

  const { articleId } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  // 게시글 상세 조회
  const {
    data: article,
    isPending,
    error,
  } = useQuery({
    queryKey: ["articles", articleId],
    queryFn: () => postService.getPost("articles", articleId),
    enabled: !!articleId,
  });

  // 게시글 등록 API
  const { mutate: createArticle } = useMutation({
    mutationFn: (body) => postService.createPost("articles", body),
    onSuccess: (data) => {
      router.push(`/community/${data.id}`);
    },
  });

  // 게시글 수정 API
  const { mutate: updateArticle } = useMutation({
    mutationFn: ({ id, body }) => postService.updatePost("articles", id, body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["articles", articleId] });
      router.push(`/community/${data.id}`);
    },
  });

  // 게시글 수정 시 초기 값 세팅
  useEffect(() => {
    if (isPending) return;
    const { title, content } = article;

    setBody((prev) => ({ ...prev, title, content }));
  }, [isPending]);

  // 게시글 등록
  const handleCreateArticle = (e) => {
    e.preventDefault();

    setIsLoading(true);
    // TODO: body에 trim해서 보내기
    // const { title, content } = body;
    // createArticle({title: title.trim(), content: content.trim()})
    createArticle(body);
  };

  // 게시글 수정
  const handleUpdateArticle = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    // TODO: body에 trim해서 보내기
    // const { title, content } = body;
    // createArticle({title: title.trim(), content: content.trim()})
    updateArticle({ id: articleId, body });
  };

  // body 변경
  const changeValue = (e) => {
    const { id, value } = e.target;

    setBody((prev) => ({ ...prev, [id]: value }));
  };

  // 게시글 등록버튼 활성화
  useEffect(() => {
    const { title, content } = body;
    const validation = title && content;

    if (!title.trim() || !content.trim()) return setIsActive(false);

    if (validation) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [body]);

  return (
    <form onSubmit={articleId ? handleUpdateArticle : handleCreateArticle}>
      <div className="flex justify-center items-center">
        <div className="flex justify-between items-center w-full max-w-[1200px]">
          <h1 className="h-[32px] font-bold text-[20px]">{title}</h1>
          <button
            type="submit"
            disabled={!isActive || isLoading}
            className={clsx(
              isActive
                ? "bg-primary-100 hover:bg-primary-200 active:bg-primary-300 cursor-pointer"
                : "bg-secondary-gray-300 cursor-default",
              "text-secondary-gray-100 flex justify-center items-center border-none w-[74px] h-[42px] py-[8px] px-[23px] rounded-[8px] text-center font-semibold text-[16px]"
            )}
          >
            {isLoading ? (
              <div className="flex justify-center items-center gap-[8px]">
                <div className="size-[20px] border-[3px] border-t-[3px] border-secondary-gray-300 border-t-white rounded-full animate-spin"></div>
              </div>
            ) : (
              "등록"
            )}
          </button>
        </div>
      </div>
      <div className="flex justify-center flex-col w-full max-w-[1200px] gap-[16px]">
        {/* now TODO: 컴포넌트 재활용 가능할 것 같으면 productInput, productTextArea에서 product 빼고 여기에서도 적용 */}
        <section className="flex flex-col mt-[24px] gap-[12px]">
          <p className="font-bold text-[14px] sm:text-[18px]">*제목</p>
          <input
            onChange={changeValue}
            value={body.title}
            type="text"
            name="title"
            id="title"
            placeholder="제목을 입력해주세요"
            className="h-[56px] bg-secondary-gray-100 border-transparent rounded-[12px] outline-none py-[16px] px-[24px] text-[16px] font-normal placeholder-secondary-gray-300"
          />
        </section>
        <section className="flex flex-col gap-[12px]">
          <p className="font-bold text-[14px] sm:text-[18px]">*내용</p>
          <textarea
            onChange={changeValue}
            value={body.content}
            name="content"
            id="content"
            placeholder="내용을 입력해주세요"
            className="h-[282px] bg-secondary-gray-100 border-transparent rounded-[12px] outline-none py-[16px] px-[24px] text-[16px] font-normal placeholder-secondary-gray-300 resize-none"
          />
        </section>
      </div>
    </form>
  );
}
