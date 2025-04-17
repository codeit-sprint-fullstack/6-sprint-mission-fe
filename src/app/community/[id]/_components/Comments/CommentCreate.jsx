"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const INITIAL_BODY = { content: "" };

export default function CommentCreate() {
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
    const { content } = body;

    const validation = content;

    if (validation) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [body]);

  // 상품 등록
  const createProduct = async (e) => {
    // comment로 변경
    e.preventDefault();

    // const product = await postProduct(body); 이거 대신 postComment로 변경
    setBody(INITIAL_BODY);
    router.refresh();
  };

  return (
    <form onSubmit={createProduct} className="flex flex-col w-full gap-[16px]">
      <section className="flex flex-col gap-[12px]">
        <p className="font-semibold text-[16px] sm:text-[18px]">
          댓글 작성하기
        </p>
        <textarea
          onChange={changeValue}
          value={body.content}
          name="content"
          id="content"
          placeholder="댓글을 입력해주세요"
          className="h-[104px] bg-secondary-gray-100 border-[1.5px] border-transparent rounded-[12px] outline-none py-[16px] px-[24px] text-[16px] font-normal placeholder-secondary-gray-300 resize-none"
        />
      </section>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!isActive}
          className={clsx(
            isActive
              ? "bg-primary-100 cursor-pointer"
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
