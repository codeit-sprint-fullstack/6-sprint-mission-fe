"use client";

import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { BEST_ITEM_COUNT, BREAKPOINTS } from "@/const";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/getApi";
import { useViewport } from "@/lib/hooks/useViewport";

function BestItemList() {
  const [pageSize, setPageSize] = useState(BEST_ITEM_COUNT.pc);
  const windowWidth = useViewport();

  // 화면 너비 기준 보여줄 베스트 상품 수
  useEffect(() => {
    if (windowWidth >= BREAKPOINTS.lg) {
      setPageSize(BEST_ITEM_COUNT.pc);
    } else if (windowWidth >= BREAKPOINTS.md) {
      setPageSize(BEST_ITEM_COUNT.tablet);
    } else {
      setPageSize(BEST_ITEM_COUNT.mobile);
    }
  }, [windowWidth]);

  // 베스트 상품 목록 가져오기
  const { data: bestItems } = useQuery({
    queryKey: ["products", { page: 1, pageSize, orderBy: "favorite" }],
    queryFn: () => getProducts({ page: 1, pageSize, orderBy: "favorite" }),
    suspense: true,
  });

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">베스트 상품</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-[10px] lg-gap-6">
        {bestItems?.list.map((item) => (
          <article key={item.id}>
            <Link key={item.id} href={`/items/${item.id}`}>
              <ItemCard
                key={item.id}
                name={item.name}
                price={item.price}
                image={item.images[0]}
                favoriteCount={item.favoriteCount}
              />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BestItemList;
