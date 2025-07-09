"use client";

import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { getBestProducts } from "@/api/item.api";
import { Product } from "@/types/product";

const getPageSize = (): number => {
  const width = window.innerWidth;
  if (width < 744) {
    // Mobile viewport
    return 1;
  } else if (width < 1280) {
    // Tablet viewport
    return 2;
  } else {
    // Desktop viewport
    return 4;
  }
};

function BestItemsSection() {
  const [itemList, setItemList] = useState<Product[]>([]);
  const [pageSize, setPageSize] = useState<number>(getPageSize());

  const fetchSortedData = async (limit: number) => {
    // getBestProducts API 사용 (백엔드에서 이미 좋아요 순으로 정렬된 상품을 반환)
    const products: Product[] = await getBestProducts(limit);
    setItemList(products);
  };

  useEffect(() => {
    fetchSortedData(pageSize);
  }, [pageSize]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 744) setPageSize(1);
      else if (width < 1280) setPageSize(2);
      else setPageSize(4);
    };

    handleResize(); // 초기 한 번 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bestItemsContainer">
      <h1 className="sectionTitle">베스트 상품</h1>

      <div className="bestItemsCardSection">
        {itemList?.map((item) => (
          <ItemCard item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
}

export default BestItemsSection;
