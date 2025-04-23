"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PostForm = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const selected = e.target.value;
    setSearch(selected);
    router.push(`/article?search=${selected}`);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-[16px]">
        <p className="text-[18px] font-[700]">게시글</p>
        <Link
          className="block w-[88px] h-[42px] leading-[42px] text-center text-white rounded-[8px] bg-[var(--color-main-blue)]"
          href="/post"
        >
          글쓰기
        </Link>
      </div>
      <div className="flex items-center gap-[13px] mb-[16px] xs:gap-[6px] xs:mb-[40px] m:gap-[16px] m:mb-[24px]">
        <div className="relative w-full">
          <figure className="absolute top-[50%] translate-y-[-50%] left-[16px] w-[24px] h-[24px]">
            <Image
              className="object-cover"
              src="/search.png"
              alt="search"
              fill
            />
          </figure>
          <input
            className="w-full h-[42px] bg-[#F3F4F6] rounded-[12px] pl-[44px] outline-none"
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            value={search}
            onChange={handleChange}
          />
        </div>
        <select
          className="w-[42px] h-[42px] xs:w-[130px] border border-[#E5E7EB] rounded-[12px] outline-none"
          name=""
          id=""
        >
          <option value="recent">최신순</option>
          <option value="best">좋아요 순</option>
        </select>
      </div>
    </>
  );
};

export default PostForm;
