"use client";

import Button from "@/components/Button";
import SelectBox from "@/components/SelectBox";
import React, { useEffect, useState } from "react";
import ItemCard from "./_components/ItemCard";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "@/api/items";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Product() {
  const [orderBy, setOrderBy] = useState("최신순");
  const [limit, setLimit] = useState(0);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    function updateLimit() {
      let width = window.innerWidth;

      if (744 > width) {
        setLimit(4);
      } else if (width >= 744 && width < 1200) {
        setLimit(6);
      } else {
        setLimit(10);
      }
    }

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", orderBy, page, limit],
    queryFn: () => getItems({ orderBy, page, limit }),
  });

  if (isPending) return <p>로딩 중…!</p>;
  if (isError) return <p>상품을 불러오지 못 했습니다.</p>;

  return (
    <section className="w-[343px] md:w-[696px] lg:w-[1200px] mx-auto mb-10">
      <div className="flex justify-between items-center h-[42px] mb-6">
        <h2 className="text-gray-900 text-700-20">판매 중인 상품</h2>
        <div className="flex gap-3">
          <Button size="product" onClick={() => router.push("/items/post")}>
            상품 등록하기
          </Button>
          <SelectBox onClick={setOrderBy} />
        </div>
      </div>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-center">
        {data?.products?.map((product) => {
          return (
            <Link href={`/items/${product.id}`} key={product.id}>
              <ItemCard type="normal" product={product} />
            </Link>
          );
        })}
      </section>
    </section>
  );
}

export default Product;
