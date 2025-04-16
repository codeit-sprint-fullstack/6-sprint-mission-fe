"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import ArticleCard from "./ArticleCard";
import dayjs from "dayjs";
import Dropdown from "@/components/ui/Dropdown";

function Article({ articles }) {
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredArticles = useMemo(() => {
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (sortOption == "latest") {
      return filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortOption == "oldest") {
      return filtered.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
  }, [articles, searchInput, sortOption]);

  const handleSort = (type) => {
    setSortOption(type);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">게시글</h2>
        <Link href="/board/article">
          <button className="btn-base">글쓰기</button>
        </Link>
      </div>
      <div className="flex justify-between items-center h-[42px] my-4">
        <input
          className="w-full mr-[13px] py-[9px] pl-11 rounded-xl bg-gray-100 bg-[url('/assets/icon/ic_search.svg')] bg-no-repeat bg-[center_left_1rem]"
          placeholder="검색할 상품을 입력해주세요"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div>
          <button
            className="p-[9px] border-1 border-gray-100 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <Image
              src="/assets/icon/ic_sort.svg"
              alt="정렬 아이콘"
              width={24}
              height={24}
            />
          </button>
          {isDropdownOpen && <Dropdown handleSort={handleSort} />}
        </div>
      </div>
      <article className="mb-[91px]">
        {filteredArticles.map((article) => {
          const date = article.createdAt;
          const formattedDate = dayjs(date).format("YYYY. MM. DD");

          return (
            <Link key={article.id} href={`/board/${article.id}`}>
              <ArticleCard
                key={article.id}
                title={article.title}
                createdAt={formattedDate}
              />
              <span className="flex border-b-1 border-gray-200 my-6"></span>
            </Link>
          );
        })}
      </article>
    </div>
  );
}

export default Article;
