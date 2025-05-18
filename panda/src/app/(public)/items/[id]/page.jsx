"use client";

import React, { useEffect, useState } from "react";
import Item from "./_components/item.jsx";
import { useParams } from "next/navigation.js";
import { getItemById } from "@/api/items.js";
import ProductComments from "@/components/layout/ProductComments.jsx";
import Button from "@/components/Button.jsx";
import Link from "next/link.js";
import { useQuery } from "@tanstack/react-query";

function ItemPage() {
  const params = useParams();
  const id = params.id;

  const { data, isPending, isError } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getItemById(id),
    enabled: !!id,
  });

  if (isPending) return <p>로딩 중…!</p>;
  if (isError) return <p>상품을 불러오지 못 했습니다.</p>;

  return (
    <main className="px-[30px] lg:px-[200px] py-[32px] w-[343px] md:w-[696px] lg:w-[1200px] mx-auto flex flex-col gap-[32px] mb-[200px]">
      <Item key={data?.product.id} product={data} />
      <hr className="text-gray-200" />
      <Link href="/items" className="self-center">
        <Button size="xl" rounded reset>
          목록으로 돌아가기
        </Button>
      </Link>
    </main>
  );
}

export default ItemPage;
