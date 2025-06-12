"use client";

import { BREAKPOINTS, ITEM_COUNT } from "@/const";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import Pagination from "@/components/ui/Pagination";
import { useViewport } from "@/lib/hooks/useViewport";
import { useQuery } from "@tanstack/react-query";
import Dropdown from "@/components/ui/Dropdown";
import { getProducts } from "@/lib/getApi";

function ItemList() {
  const sortOptions = [
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
  const { data: items } = useQuery({
    queryKey: ["products", { page, pageSize, orderBy, keyword }],
    queryFn: () => getProducts({ page, pageSize, orderBy, keyword }),
    suspense: true,
  });

  const handleSort = (value) => {
    const selected = sortOptions.find((option) => option.value === value);
    setDropdownOption(selected);

    if (selected.value === "recent") {
      setOrderBy("recent");
    } else {
      setOrderBy("favorite");
    }

    setIsDropdownOpen(false);
  };

  return (
    <section>
      <nav className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-bold">판매 중인 상품</h2>
        <Link href="/items/add">
          <button className="btn-base">상품 등록하기</button>
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
      <article className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-[91px] gap-2 md:gap-4 lg:gap-6">
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
        totalCount={items?.totalCount}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </section>
  );
}

export default ItemList;
