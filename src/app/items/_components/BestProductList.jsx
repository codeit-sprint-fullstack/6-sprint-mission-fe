"use client";

import Product from "./Product";
import { useBestProducts } from "@/hooks/Products/useBestProducts";

const BEST_ITEM_HEIGHT = 300;

const BestProductList = () => {
  const { bestProducts, isLoading, error } = useBestProducts({
    pageSize: 4,
  });

  return (
    <div>
      <span className="text-[1.4rem] font-bold">베스트 상품</span>

      {isLoading ? (
        <div className="mt-5 flex justify-center">로딩 중...</div>
      ) : error ? (
        <div className="mt-5 flex justify-center text-red-500">
          데이터를 불러오는 중 오류가 발생했습니다.
        </div>
      ) : bestProducts.length === 0 ? (
        <div className="mt-5 flex justify-center">베스트 상품이 없습니다.</div>
      ) : (
        <ul className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {bestProducts.map((item) => (
            <Product key={item.id} height={BEST_ITEM_HEIGHT} {...item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default BestProductList;
