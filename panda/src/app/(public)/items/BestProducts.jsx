"use client";

import { getBestItems } from "@/api/items";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ItemCard from "./_components/ItemCard";

function BestProducts() {
  const [limit, setLimit] = useState(0);

  // 게시글 수 - 반응형
  useEffect(() => {
    function updateLimit() {
      let width = window.innerWidth;

      if (744 > width) {
        setLimit(1);
      } else if (width >= 744 && width < 1200) {
        setLimit(2);
      } else {
        setLimit(4);
      }
    }

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  // 데이터 소환
  const {
    data: products,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["products", limit],
    queryFn: () => getBestItems(limit),
  });

  if (isPending) return <p>로딩 중…!</p>;
  if (isError) return <p>상품을 불러오지 못 했습니다.</p>;

  return (
    <section className="w-[343px] md:w-[696px] lg:w-[1200px] mx-auto mb-10">
      <h2 className="mb-4 text-gray-900 text-700-20">베스트 상품</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[12px] justify-items-center">
        {products?.map((product) => {
          return (
            <Link key={product.id} href={`/items/${product.id}`}>
              <ItemCard product={product} type="best" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default BestProducts;
