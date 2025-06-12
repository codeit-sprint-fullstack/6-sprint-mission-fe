"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import Dropdown from "@/components/ui/Dropdown";
import { ARTICLE_COUNT, BREAKPOINTS } from "@/const";
import { useViewport } from "@/lib/hooks/useViewport";
import { useQuery } from "@tanstack/react-query";
import { getArticles } from "@/lib/getApi";
import Pagination from "@/components/ui/Pagination";

function ArticleList() {
  const sortOptions = [
    { label: "최신순", value: "recent" },
    { label: "좋아요순", value: "like" },
  ];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(ARTICLE_COUNT.pc);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [dropdownOption, setDropdownOption] = useState(sortOptions[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const windowWidth = useViewport();

  // 화면 너비 기준 보여줄 게시글 수
  useEffect(() => {
    if (windowWidth >= BREAKPOINTS.lg) {
      setPageSize(ARTICLE_COUNT.pc);
    } else if (windowWidth >= BREAKPOINTS.md) {
      setPageSize(ARTICLE_COUNT.tablet);
    } else {
      setPageSize(ARTICLE_COUNT.mobile);
    }
  }, [windowWidth]);

  // 게시글 목록 가져오기
  const { data: articles } = useQuery({
    queryKey: ["articles", { page, pageSize, orderBy, keyword }],
    queryFn: () => getArticles({ page, pageSize, orderBy, keyword }),
    suspense: true,
  });

  const handleSort = (value) => {
    const selected = sortOptions.find((item) => item.value === value);
    setDropdownOption(selected);

    if (selected.value === "recent") {
      setOrderBy("recent");
    } else {
      setOrderBy("like");
    }
    setIsDropdownOpen(false);
  };

  return (
    <section>
      <nav className="flex justify-between items-center">
        <h2 className="text-lg font-bold">게시글</h2>
        <Link href="/board/add">
          <button className="btn-base">글쓰기</button>
        </Link>
      </nav>
      <nav className="flex justify-between items-center h-[42px] my-4">
        <input
          className="w-full mr-[13px] py-[9px] pl-11 rounded-xl bg-gray-100 bg-[url('/assets/icon/ic_search.svg')] bg-no-repeat bg-[center_left_1rem]"
          placeholder="검색할 상품을 입력해주세요"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div>
          <button
            className="flex items-center p-[9px] md:py-3 md:px-5 md:w-[130px] md:h-[42px] border-1 border-gray-200 rounded-xl cursor-pointer bg-white hover:bg-gray-100"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            {windowWidth >= BREAKPOINTS.md ? (
              <div className="flex justify-between w-[90px]">
                {dropdownOption.label}
                <Image
                  src="/assets/icon/ic_arrow_down.svg"
                  alt="아래 화살표 아이콘"
                  width={24}
                  height={24}
                />
              </div>
            ) : (
              <Image
                src="/assets/icon/ic_sort.svg"
                alt="정렬 아이콘"
                width={24}
                height={24}
              />
            )}
          </button>
          {isDropdownOpen && (
            <Dropdown items={sortOptions} onSelect={handleSort} isSort={true} />
          )}
        </div>
      </nav>
      <article className="mb-[91px]">
        {articles?.list.map((article) => {
          return (
            <Link key={article.id} href={`/board/${article.id}`}>
              <ArticleCard key={article.id} article={article} />
              <span className="flex border-b-1 border-gray-200 my-6"></span>
            </Link>
          );
        })}
      </article>
      <Pagination
        totalCount={articles?.totalCount}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </section>
  );
}

export default ArticleList;
