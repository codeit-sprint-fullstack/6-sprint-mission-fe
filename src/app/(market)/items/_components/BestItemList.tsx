"use client";

import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { BEST_ITEM_COUNT, BREAKPOINTS } from "@/constant";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useViewport } from "@/lib/hooks/useViewport";
import { Product } from "@/types";
import { productService } from "@/lib/service/productService";

type TBestItemList = {
  list: Product[];
};

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
  const { data: bestItems } = useQuery<TBestItemList, Error>({
    queryKey: ["products", { page: 1, pageSize, orderBy: "favorite" }],
    queryFn: () => productService.getProducts({ page: 1, pageSize, orderBy: "favorite" }),
  });

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">베스트 상품</h2>
      <div className="lg-gap-6 grid grid-cols-1 md:grid-cols-2 md:gap-[10px] lg:grid-cols-4">
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
