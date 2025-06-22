"use client";

import React, { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/productApi";
import BestProduct from "./BestProducts";

interface Product {
  id: number;
  name: string;
  price: number;
  favoriteCount: number;
}

export default function BestProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("상품 데이터를 불러오는 데 실패했습니다", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex gap-4">
      {products.slice(0, 4).map((product) => (
        <BestProduct
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          favoriteCount={product.favoriteCount}
        />
      ))}
    </div>
  );
}
