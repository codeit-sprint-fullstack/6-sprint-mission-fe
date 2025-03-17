import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getBestProducts } from "../../api/api";
import "./BestProducts.css";

const BestProducts = () => {
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const bestProductsData = await getBestProducts();
        setBestProducts(bestProductsData.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };

    fetchBestProducts();
  }, []);

  return (
    <div>
      <h2>베스트 상품</h2>
      <div className="best-products-grid">
        {bestProducts.length > 0 ? (
          bestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>베스트 상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default BestProducts;
