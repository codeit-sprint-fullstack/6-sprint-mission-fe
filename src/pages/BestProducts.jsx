import React from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

const BestProducts = () => {
  const { products, loading } = useProducts("favorite", 1, 4);

  return (
    <section className="best-products">
      <h2>베스트 상품</h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div className="product-grid best-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BestProducts;
