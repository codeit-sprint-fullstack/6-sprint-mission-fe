"use client";

import React, { useEffect, useState } from "react";
import MarketProduct from "./MarketProduct";
import { getMarketArticles } from "@/lib/api";

export default function MaketProductList({ sortOption, searchKeyword }) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const data = await getMarketArticles();
      setProducts(data.list);
    } catch (err) {
      console.error("상품 데이터를 불러오는 데 실패했습니다", err);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOption === "favorite") {
      return b.likeCount - a.likeCount;
    }
    return 0;
  });

  useEffect(() => {
    getProducts();
  }, [sortOption]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-5 grid-rows-2 gap-4">
        {sortedProducts.map((product) => (
          <MarketProduct
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            favoriteCount={product.favoriteCount}
          />
        ))}
      </div>
    </div>
  );
}
