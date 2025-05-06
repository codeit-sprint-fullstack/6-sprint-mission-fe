"use client";

import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { getProducts } from "@/api/item.api.js";

const getPageSize = () => {
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
  const [itemList, setItemList] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize()); // 페이지 크기 초기값을 getPageSize로 설정

  const fetchSortedData = async ({ orderBy, pageSize }) => {
    const products = await getProducts({ orderBy, page: 1, pageSize });
    setItemList(products.list);
  };
  

  useEffect(() => {
    fetchSortedData({ orderBy: "favorite", page: 1, pageSize });
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
