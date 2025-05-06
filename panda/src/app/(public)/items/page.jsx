/**
 * 나중에 검색창, 상품 등록 버튼, 정렬 기능, 페이지네이션 구현할 것!
 */
"use client";

import React from "react";
import ItemCard from "./_components/ItemCard";
import { getItems } from "@/api/items";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

function MarketPage() {
  // 리액트 쿼리로 api 불러옴
  const { data, isPending, isError } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  if (isPending) return <p>로딩 중…!</p>;
  if (isError) return <p>상품을 불러오지 못 했습니다.</p>;

  return (
    <main className="w-[344px] md:w-[696px] lg:w-[1200px] my-0 mx-auto py-[20px] mb-[200px]">
      {/* 상단 부분 */}
      <div className="mb-[20px]">
        <h3 className="font-[700] text-[20px] text-gray-900">판매 중인 상품</h3>
        {/* 나중에 검색창, 상품 등록 버튼, 정렬 기능 구현할 것! */}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[24px]">
        {data.map((item) => (
          <Link href={`/items/${item.id}`} key={item.id}>
            <ItemCard item={item} />
          </Link>
        ))}
      </div>
    </main>
  );
}

export default MarketPage;
