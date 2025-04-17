"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const INITIAL_BODY = { title: "", content: "" };

export default function CommunityCreatePage() {
  const [body, setBody] = useState(INITIAL_BODY);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  // body 업데이트
  const changeValue = (e) => {
    const { id, value } = e.target;

    setBody((prevBody) => ({ ...prevBody, [id]: value }));
  };

  // 등록 버튼 활성화
  useEffect(() => {
    const { title, content } = body;

    const validation = title && content;

    if (validation) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [body]);

  // 상품 등록
  const createProduct = async (e) => {
    e.preventDefault();

    // const product = await postProduct(body); 이거 대신 postComment로 변경
    setBody(INITIAL_BODY);
    router.push(`/community/${article.id}`);
  };

  return (
    <form onSubmit={createProduct} className="p-[16px] sm:p-[24px]">
      <div className="flex justify-center items-center">
        <div className="flex justify-between items-center w-full max-w-[1200px]">
          <h1 className="h-[32px] font-bold text-[20px]">게시글 작성</h1>
          <button
            type="submit"
            disabled={!isActive}
            className={clsx(
              isActive
                ? "bg-primary-100 cursor-pointer"
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
              className="h-[56px] bg-secondary-gray-100 border-[1.5px] border-transparent rounded-[12px] outline-none py-[16px] px-[24px] text-[16px] font-normal placeholder-secondary-gray-300"
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
              className="h-[200px] bg-secondary-gray-100 border-[1.5px] border-transparent rounded-[12px] outline-none py-[16px] px-[24px] text-[16px] font-normal placeholder-secondary-gray-300 resize-none sm:h-[282px]"
            />
          </section>
        </div>
      </main>
    </form>
  );
}
