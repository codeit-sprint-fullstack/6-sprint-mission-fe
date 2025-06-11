"use client";

import React, { useState } from "react";
import ProductNavBar from "../ProductNavBar/ProductNavBar";
import Product from "./Product";
import { useQuery } from "@tanstack/react-query";
import { postService } from "@/service/postService";
import useGetDeviceType from "@/hooks/useGetDeviceType";
import Pagination from "../Pagination";

export default function ProductList() {
  const [params, setParams] = useState({
    offset: 1,
    limit: null,
    orderBy: "recent",
    keyword: "",
  });

  // 반응형 리퀘스트
  const [currentDevice] = useGetDeviceType(setParams, "products");

  // 상품 목록 조회
  const { data: products, isPending } = useQuery({
    queryKey: ["products", params],
    queryFn: () => postService.getPosts("products", params),
    enabled: !!params.limit,
  });

  // 렌더링(검색)
  const changeKeywordInParams = (keyword) => {
    if (params.keyword === keyword) return;
    setParams((prevParams) => ({ ...prevParams, offset: 1, keyword }));
  };

  // 렌더링(정렬 선택)
  const changeOrderByInParams = (orderBy) => {
    if (params.orderBy === orderBy) return;
    setParams((prevParams) => ({ ...prevParams, offset: 1, orderBy }));
  };

  // 렌더링(현재 페이지 변경)
  const changeOffsetInParams = (offset) => {
    if (params.offset === offset) return;
    setParams((prevParams) => ({ ...prevParams, offset }));
  };

  return (
    <>
      <ProductNavBar
        changeKeywordInParams={changeKeywordInParams}
        changeOrderByInParams={changeOrderByInParams}
      />
      {isPending ? (
        <div className="flex justify-center items-center gap-[8px]">
          <div className="size-[20px] border-[3px] border-t-[3px] border-secondary-gray-200 border-t-primary-100 rounded-full animate-spin"></div>
          <p className="font-medium">불러오는 중</p>
        </div>
      ) : !products?.list.length ? (
        <div className="flex justify-center items-center text-center">
          아직 상품이 없어요,
          <br />
          지금 상품을 등록해보세요!
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 grid-rows-2 justify-center items-center gap-[8px] gap-y-[32px] sm:grid-cols-3 sm:gap-[16px] sm:gap-y-[40px] md:grid-cols-5 md:gap-[24px]">
            {products.list.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            currentDevice={currentDevice}
            params={params}
            totalCount={products.totalCount}
            changeOffsetInParams={changeOffsetInParams}
          />
        </>
      )}
    </>
  );
}
