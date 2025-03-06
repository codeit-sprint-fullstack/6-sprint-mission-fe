import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={product.images[0]}
        alt={product.name}
        className="product-image"
      />
      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">{product.price}원</p>
      <p className="product-fav">❤️ {product.favoriteCount}</p>
    </div>
  );
};

export default ProductCard;
