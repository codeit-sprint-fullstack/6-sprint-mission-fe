"use client";

import React, { useState } from "react";
import BestProduct from "./BestProduct";
import { useQuery } from "@tanstack/react-query";
import { postService } from "@/service/postService";
import useGetDeviceType from "@/hooks/useGetDeviceType";

export default function BestProductList() {
  const [params, setParams] = useState({
    offset: 1,
    limit: null,
    orderBy: "like",
    keyword: "",
  });

  // 반응형 리퀘스트 보내기
  useGetDeviceType(setParams, "bestProducts");

  // 베스트 상품 조회
  const { data: bestProducts, isPending } = useQuery({
    queryKey: ["bestProducts", params],
    queryFn: () => postService.getPosts("products", params),
    enabled: !!params.limit,
  });

  return (
    <div className="flex flex-col gap-[16px]">
      <h2 className="font-bold text-[20px]">베스트 상품</h2>
      {isPending ? (
        <div className="flex justify-center items-center gap-[8px]">
          <div className="size-[20px] border-[3px] border-t-[3px] border-secondary-gray-200 border-t-primary-100 rounded-full animate-spin"></div>
          <p className="font-medium">불러오는 중</p>
        </div>
      ) : !bestProducts?.list.length ? (
        <div className="flex justify-center items-center text-center">
          아직 상품이 없어요,
          <br />
          지금 상품을 등록해보세요!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 md:grid-cols-4 md:gap-[24px]">
          {bestProducts.list.map((bestProduct) => (
            <BestProduct key={bestProduct.id} bestProduct={bestProduct} />
          ))}
        </div>
      )}
    </div>
  );
}
