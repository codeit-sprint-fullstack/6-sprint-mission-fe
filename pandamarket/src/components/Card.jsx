import React from "react";
import "./card.css";

const HEART = "../images/heart.png";

export const Card = ({ product, type }) => {
  return (
    <section className={`card-frame ${type}`}>
      <div className="image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <p className="product-title">{product.name}</p>
      <p className="product-price">{product.price}원</p>
      <p className="product-likes">
        <img src={HEART} alt="좋아요" className="heart-icon" />{" "}
        {product.favoriteCount}
      </p>
    </section>
  );
};
