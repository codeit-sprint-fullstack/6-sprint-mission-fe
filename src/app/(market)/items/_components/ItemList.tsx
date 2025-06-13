"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import Pagination from "@/components/ui/Pagination";
import { useViewport } from "@/lib/hooks/useViewport";
import { useQuery } from "@tanstack/react-query";
import Dropdown from "@/components/ui/Dropdown";
import { getProducts } from "@/lib/service/getApi";
import { DropdownItem, Product } from "@/types";
import { BREAKPOINTS, ITEM_COUNT } from "@/constant";
import { ArrowDown, SearchIcon, SortIcon } from "@/assets/svgs";

type ItemListResponse = {
  list: Product[];
  totalCount: number;
};

function ItemList() {
  // TODO: 이거 ArticleList꺼랑 하나로 통일
  // -> favorite/like 둘 중 하나만 (백엔드 수정 필요)
  const sortOptions: DropdownItem[] = [
    { label: "최신순", value: "recent" },
    { label: "좋아요순", value: "favorite" },
  ];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(ITEM_COUNT.pc);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [dropdownOption, setDropdownOption] = useState(sortOptions[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const windowWidth = useViewport();

  // 화면 너비 기준 보여줄 상품 수
  useEffect(() => {
    if (windowWidth >= BREAKPOINTS.lg) {
      setPageSize(ITEM_COUNT.pc);
    } else if (windowWidth >= BREAKPOINTS.md) {
      setPageSize(ITEM_COUNT.tablet);
    } else {
      setPageSize(ITEM_COUNT.mobile);
    }
  }, [windowWidth]);

  // 상품 목록 가져오기
  const { data: items } = useQuery<ItemListResponse>({
    queryKey: ["products", { page, pageSize, orderBy, keyword }],
    queryFn: () => getProducts({ page, pageSize, orderBy, keyword }),
  });

  const handleSort = (value: DropdownItem["value"]) => {
    const selected = sortOptions.find((option) => option.value === value);
    setDropdownOption(selected!);

    if (selected?.value === "recent") {
      setOrderBy("recent");
    } else {
      setOrderBy("favorite");
    }

    setIsDropdownOpen(false);
  };

  return (
    <section>
      <nav className="mt-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">판매 중인 상품</h2>
        <Link href="/items/add">
          <button className="btn-base">상품 등록하기</button>
        </Link>
      </nav>
      <nav className="relative my-4 flex h-[42px] items-center justify-between">
        <SearchIcon aria-label="검색 아이콘" className="absolute ml-4" />
        <input
          className="mr-[13px] w-full rounded-xl bg-gray-100 py-[9px] pl-11"
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
                <ArrowDown aria-label="아래 화살표" />
              </div>
            ) : (
              <SortIcon aria-label="정렬 아이콘" />
            )}
          </button>
          {isDropdownOpen && <Dropdown items={sortOptions} onSelect={handleSort} isSort={true} />}
        </div>
      </nav>
      <article className="mb-[91px] grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-5 lg:gap-6">
        {items?.list.map((item) => {
          return (
            <Link key={item.id} href={`/items/${item.id}`}>
              <ItemCard
                key={item.id}
                name={item.name}
                price={item.price}
                image={item.images[0]}
                favoriteCount={item.favoriteCount}
              />
            </Link>
          );
        })}
      </article>
      <Pagination
        totalCount={items?.totalCount!}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </section>
  );
}

export default ItemList;
