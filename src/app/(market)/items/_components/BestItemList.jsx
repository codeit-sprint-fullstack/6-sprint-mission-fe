"use client";

import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { BEST_ITEM_COUNT, BREAKPOINTS } from "@/const";
import Link from "next/link";

function BestItemList({ items }) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 화면 너비 기준 보여줄 개수 결정
  const itemCount =
    windowWidth >= BREAKPOINTS.lg
      ? BEST_ITEM_COUNT.pc
      : windowWidth >= BREAKPOINTS.md
      ? BEST_ITEM_COUNT.tablet
      : BEST_ITEM_COUNT.mobile;
  const bestItems = items
    ?.sort((a, b) => b.favoriteCount - a.favoriteCount)
    .slice(0, itemCount);

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">베스트 상품</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-[10px] lg-gap-6">
        {bestItems.map((item) => (
          <article key={item.id}>
            <Link key={item.id} href={`/items/${item.id}`}>
              <ItemCard
                key={item.id}
                name={item.name}
                price={item.price}
                image={item.images[0]}
                favoriteCount={item.favoriteCount}
                isBest={true}
              />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BestItemList;
