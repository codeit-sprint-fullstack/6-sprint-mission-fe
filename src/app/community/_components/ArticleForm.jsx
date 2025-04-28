"use client";

import {
  getArticle,
  patchArticle,
  postArticle,
} from "@/service/article-service";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// body 초기화
const INITIAL_BODY = { title: "", content: "" };

// 페이지 별 제목 적용
const TITLE_BY_PAGE = {
  create: "게시글 작성",
  edit: "게시글 수정",
};

export default function ArticleForm({ page }) {
  const [body, setBody] = useState(INITIAL_BODY);
  const [isActive, setIsActive] = useState(false);
  const { articleId } = useParams();
  const router = useRouter();

  // 페이지 별 함수 적용
  const FUNC_BY_PAGE = {
    create: (e) => createArticle(e, body),
    edit: (e) => updateArticle(e, articleId, body),
  };

  // 게시글 등록
  const createArticle = async (e, body) => {
    const { title, content } = body;
    e.preventDefault();

    const article = await postArticle({
      title: title.trim(),
      content: content.trim(),
    });
    router.push(`/community/${article.id}`);
  };

  // 게시글 수정
  const updateArticle = async (e, articleId, body) => {
    const { title, content } = body;
    e.preventDefault();

    const article = await patchArticle(articleId, {
      title: title.trim(),
      content: content.trim(),
    });
    router.push(`/community/${article.id}`);
  };

  // 게시글 세부 조회(수정 시 기존 내용 불러오는 용도)
  const articleLoad = async (articleId) => {
    const article = await getArticle(articleId);

    return setBody(article);
  };

  useEffect(() => {
    if (page === "create") return;

    articleLoad(articleId);
  }, []);

  // body 업데이트
  const changeValue = (e) => {
    const { id, value } = e.target;

    setBody((prevBody) => ({ ...prevBody, [id]: value }));
  };

  // 등록 버튼 활성화
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
    <form onSubmit={FUNC_BY_PAGE[page]}>
      <div className="flex justify-center items-center">
        <div className="flex justify-between items-center w-full max-w-[1200px]">
          <h1 className="h-[32px] font-bold text-[20px]">
            {TITLE_BY_PAGE[page]}
          </h1>
          <button
            type="submit"
            disabled={!isActive}
            className={clsx(
              isActive
                ? "bg-primary-100 hover:bg-primary-200 active:bg-primary-300 cursor-pointer"
                : "bg-secondary-gray-300 cursor-default",
              "text-secondary-gray-100 flex justify-center items-center border-none w-[74px] h-[42px] py-[8px] px-[23px] rounded-[8px] text-center font-semibold text-[16px]"
            )}
          >
            등록
          </button>
        </div>
      </div>
      <main className="flex justify-center items-center">
        <div className="flex justify-center flex-col w-full max-w-[1200px] gap-[16px]">
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
              className="h-[200px] bg-secondary-gray-100 border-transparent rounded-[12px] outline-none py-[16px] px-[24px] text-[16px] font-normal placeholder-secondary-gray-300 resize-none sm:h-[282px]"
            />
          </section>
        </div>
      </main>
    </form>
  );
}
