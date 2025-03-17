import React from "react";

const ProductCard = ({ product }) => {
  if (!product) return <p>상품 정보 없음</p>;

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}원</p>
    </div>
  );
};

export default ProductCard;
