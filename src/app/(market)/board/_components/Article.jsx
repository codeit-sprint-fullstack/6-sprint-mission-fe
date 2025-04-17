"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import ArticleCard from "./ArticleCard";
import Dropdown from "@/components/ui/Dropdown";

function Article({ articles }) {
  const sortOption = [
    { label: "최신순", value: "latest" },
    { label: "오래된순", value: "oldest" },
  ];
  const [searchInput, setSearchInput] = useState("");
  const [dropdownOption, setDropdownOption] = useState(sortOption[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredArticles = useMemo(() => {
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (dropdownOption.value == "latest") {
      return filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (dropdownOption.value == "oldest") {
      return filtered.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
  }, [articles, searchInput, dropdownOption]);

  const handleSort = (value) => {
    const selected = sortOption.find((item) => item.value === value);
    setDropdownOption(selected);
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
          {isDropdownOpen && (
            <Dropdown items={sortOption} onSelect={handleSort} />
          )}
        </div>
      </div>
      <article className="mb-[91px]">
        {filteredArticles.map((article) => {
          return (
            <Link key={article.id} href={`/board/${article.id}`}>
              <ArticleCard
                key={article.id}
                title={article.title}
                createdAt={article.createdAt}
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
