import React from "react";

const ProductList = ({ products = [] }) => {
  if (!Array.isArray(products)) {
    console.error("❌ products is not an array:", products);
    return <p>상품 데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img
            src={
              product.images?.length > 0
                ? product.images[0]
                : "https://via.placeholder.com/300"
            }
            alt={product.name || "상품 이미지"}
          />
          <div className="product-info">
            <h2>{product.name || "상품명 없음"}</h2>
            <p>{product.price ? `${product.price}원` : "가격 미정"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
