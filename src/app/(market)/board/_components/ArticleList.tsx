"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import Dropdown from "@/components/ui/Dropdown";
import { ARTICLE_COUNT, BREAKPOINTS, SORT_OPTIONS } from "@/constant";
import { useViewport } from "@/hooks/useViewport";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/components/ui/Pagination";
import { ArticleListResponse, DropdownItem } from "@/types";
import SearchIcon from "@/assets/svgs/ic_search.svg";
import SortIcon from "@/assets/svgs/ic_sort.svg";
import ArrowDown from "@/assets/svgs/arrow_down.svg";
import { articleService } from "@/lib/service/articleService";

function ArticleList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(ARTICLE_COUNT.pc);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [dropdownOption, setDropdownOption] = useState(SORT_OPTIONS[0]);
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
  const { data: articles } = useQuery<ArticleListResponse>({
    queryKey: ["articles", { page, pageSize, orderBy, keyword }],
    queryFn: () => articleService.getArticles({ page, pageSize, orderBy: "recent", keyword }),
  });

  const handleSort = (value: DropdownItem["value"]) => {
    const selected = SORT_OPTIONS.find((item) => item.value === value);
    setDropdownOption(selected!);

    if (selected?.value === "recent") {
      setOrderBy("recent");
    } else {
      setOrderBy("like");
    }
    setIsDropdownOpen(false);
  };

  return (
    <section>
      <nav className="flex items-center justify-between">
        <h2 className="text-xl font-bold">게시글</h2>
        <Link href="/board/add">
          <button className="btn-base">글쓰기</button>
        </Link>
      </nav>
      <nav className="relative my-4 flex h-[42px] items-center justify-between gap-[13px]">
        <SearchIcon alt="검색 아이콘" className="absolute ml-4" />
        <input
          className="w-full rounded-xl bg-gray-100 py-[9px] pl-11"
          placeholder="검색할 상품을 입력해주세요"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div>
          <button
            className="flex cursor-pointer items-center rounded-xl border-1 border-gray-200 bg-white p-[9px] hover:bg-gray-100 md:h-[42px] md:w-[130px] md:px-5 md:py-3"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            {windowWidth >= BREAKPOINTS.md ? (
              <div className="flex w-[90px] justify-between">
                {dropdownOption.label}
                <ArrowDown alt="아래 화살표" />
              </div>
            ) : (
              <SortIcon alt="정렬 아이콘" />
            )}
          </button>
          {isDropdownOpen && <Dropdown items={SORT_OPTIONS} onSelect={handleSort} type="sort" />}
        </div>
      </nav>
      <article className="mb-[91px]">
        {articles?.list.map((article) => {
          return (
            <Link key={article.id} href={`/board/${article.id}`}>
              <ArticleCard key={article.id} article={article} />
              <span className="my-6 flex border-b-1 border-gray-200"></span>
            </Link>
          );
        })}
      </article>
      <Pagination
        totalCount={articles?.totalCount!}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </section>
  );
}

export default ArticleList;
