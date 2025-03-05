import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import "./main.css";

function getPageSize() {
  const width = window.innerWidth;
  if (width >= 1200) return 20;
  if (width >= 744) return 9;
  return 4;
}

const sortByFavorite = (items) => {
  if (!Array.isArray(items)) return [];
  return [...items].sort((a, b) => b.favoriteCount - a.favoriteCount);
};

export const Main = () => {
  const [products, setProducts] = useState([]);
  const [sortProducts, setSortProducts] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://panda-market-api.vercel.app/products?pageSize=${pageSize}`
        );
        const data = await response.json();
        if (Array.isArray(data.list)) {
          setProducts(data.list);
          setSortProducts(
            data.list.sort((a, b) => b.favoriteCount - a.favoriteCount)
          );
        } else {
          console.error("API 응답 오류:", data);
        }
      } catch (error) {
        console.error("데이터 반환 오류:", error);
      }
    };

    fetchProducts();

    const handleResize = () => setPageSize(getPageSize());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [pageSize]);

  return (
    <main className="product-container">
      {sortProducts.map((product, index) => (
        <Card
          key={product.id}
          product={product}
          type={index < 4 ? "best" : "normal"}
        />
      ))}
    </main>
  );
};
