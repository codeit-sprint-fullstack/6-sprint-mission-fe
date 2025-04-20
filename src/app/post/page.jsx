"use client";

import { postArticle } from "@/api/articleApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();
    const data = { title, content };

    try {
      const result = await postArticle(data);
      router.push("/article");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="max-w-[375px] h-[100vh] m-auto pt-[16px] px-[15px] xs:max-w-[744px] xs:px-[24px] m:max-w-[1200px] m:pt-[24px]">
      <form onSubmit={handleClick}>
        <div className="flex items-center justify-between mb-[24px]">
          <p className="text-[20px] font-[700]">상품 등록하기</p>
          <button className="bg-[var(--color-main-blue)] w-[74px] h-[42px] text-white font-[600] rounded-[8px] cursor-pointer">
            등록
          </button>
        </div>
        <div className="flex flex-col gap-[16px]">
          <label>
            <p className="text-[14px] font-[700] text-[#1F2937] mb-[12px]">
              *제목
            </p>
            <input
              className="w-full h-[56px] bg-[#F3F4F6] rounded-[12px] px-[24px] outline-none"
              type="text"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <p className="text-[14px] font-[700] text-[#1F2937] mb-[12px]">
              *내용
            </p>
            <textarea
              className="w-full h-[200px] bg-[#F3F4F6] px-[24px] pt-[16px] rounded-[12px] resize-none outline-none"
              placeholder="내용을 입력해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
        </div>
      </form>
    </section>
  );
}
