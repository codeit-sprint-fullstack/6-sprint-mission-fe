"use client";

import Link from "next/link";
import React, { useState } from "react";
import ic_search from "@/assets/images/common/search-box/ic_search.svg";
import ic_arrow_down from "@/assets/images/common/select-sort/ic_arrow_down.svg";
import ic_sort from "@/assets/images/common/select-sort/ic_sort.svg";
import Image from "next/image";
import clsx from "clsx";
import {
  deleteArticle,
  getArticle,
  patchArticle,
  postArticle,
} from "@/lib/api/article.api";
import {
  deleteArticleComment,
  getArticleComments,
  patchArticleComment,
  postArticleComment,
} from "@/lib/api/articleComment.api";

export default function NavBar({ searchLoad, sortLoad }) {
  return (
    <div className="flex justify-center">
      <div className="relative flex flex-col justify-between gap-[16px] items-center w-full mt-[24px] mb-[16px] sm:gap-[24px] sm:mt-[40px] sm:mb-[24px] md:mt-[26px]">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-bold text-[20px]">게시글</h2>
          <Link
            href="/community/create"
            className="flex justify-center items-center bg-primary-100 h-[42px] w-[88px] rounded-[8px] py-3 px-[21px] text-[16px] font-semibold text-white"
          >
            글쓰기
          </Link>
        </div>
        <nav className="flex justify-between items-center w-full gap-[13px] sm:gap-[12px]">
          <SearchBox searchLoad={searchLoad} />
          <SelectSort sortLoad={sortLoad} />
        </nav>
      </div>
    </div>
  );
}

const SearchBox = ({ searchLoad }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchLoad(keyword);
      }}
      className="relative flex w-full"
    >
      <label
        htmlFor="search"
        className="absolute z-1 left-[16px] top-[9px] w-[24px] h-[24px]"
      >
        <Image src={ic_search} alt="돋보기" fill className="object-cover " />
      </label>
      <input
        onChange={(e) => setKeyword(e.target.value)}
        id="search"
        className="flex w-full h-[42px] bg-secondary-gray-100 rounded-[12px] outline-none py-[9px] pr-[20px] pl-[44px] text-[16px] font-normal placeholder-secondary-gray-300"
        type="text"
        placeholder="검색할 게시글을 입력해주세요"
      />
    </form>
  );
};

const SelectSort = ({ sortLoad }) => {
  const [currentSort, setCurrentSort] = useState("최신순");
  const [isSelectSortBtnVisible, setIsSelectSortBtnVisible] = useState(false);

  // 정렬 선택버튼 토글
  const handleSortSelectBtnToggle = async () => {
    setIsSelectSortBtnVisible(!isSelectSortBtnVisible);
    const body = {
      content: "댓글 수정2번째",
    };
    const a = await deleteArticleComment(34, 36);
    console.log(a);
  };

  const handleSortSelectBtnClose = (e, orderBy) => {
    setIsSelectSortBtnVisible(false);
    setCurrentSort(e.target.innerText);
    sortSelect(orderBy);
  };

  // 정렬 선택 시 렌더링
  const sortSelect = (orderBy) => {
    sortLoad(orderBy);
  };

  return (
    <div>
      <button
        onClick={handleSortSelectBtnToggle}
        className="flex justify-center items-center w-[42px] h-[42px] rounded-[12px] border-[1.3px] border-secondary-gray-200 p-[9px] bg-white cursor-pointer sm:hidden "
      >
        <div className="relative w-[24px] h-[24px]">
          <Image src={ic_sort} alt="정렬 버튼" fill className="object-cover" />
        </div>
      </button>
      <button
        onClick={handleSortSelectBtnToggle}
        className="hidden justify-between items-center w-[130px] h-[42px] rounded-[12px] border-[1.3px] border-secondary-gray-200 py-[12px] px-[20px] bg-white font-normal text-[16px] cursor-pointer sm:flex"
      >
        <p>{currentSort}</p>
        <Image src={ic_arrow_down} alt="선택 버튼" />
      </button>
      <div
        className={clsx(
          isSelectSortBtnVisible ? "block" : "hidden",
          "absolute z-1 right-0 top-[108px] sm:top-[116px]"
        )}
      >
        <button
          onClick={(e) => handleSortSelectBtnClose(e, "recent")}
          className="flex justify-center items-center w-[130px] h-[42px] rounded-t-[12px] border-[1.3px] border-secondary-gray-200 border-b-0 py-[20px] px-[12px] gap-[10px] bg-white font-normal text-[16px] cursor-pointer "
        >
          최신순
        </button>
        <button
          onClick={(e) => handleSortSelectBtnClose(e, "favorite")}
          className="flex justify-center items-center w-[130px] h-[42px] rounded-b-[12px] border-[1.3px] border-secondary-gray-200 py-[20px] px-[12px] gap-[10px] bg-white font-normal text-[16px] cursor-pointer "
        >
          좋아요순
        </button>
      </div>
    </div>
  );
};
