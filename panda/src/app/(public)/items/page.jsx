/**
 * 나중에 검색창, 상품 등록 버튼, 정렬 기능, 페이지네이션 구현할 것!
 */
import React from "react";
import BestProducts from "./BestProducts.jsx";
import Product from "./Product.jsx";

function MarketPage() {
  return (
    <main className="py-[32px]">
      <BestProducts />
      <Product />
    </main>
  );
}

export default MarketPage;
