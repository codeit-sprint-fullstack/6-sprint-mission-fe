import React from "react";
import "./ProductCard.css";
import defaultImage from "../../public/images/home/feature2-image.png";

const ProductCard = ({ product }) => {
  const imageUrl = product.images?.length ? product.images : defaultImage;

  const handleImageError = (event) => {
    event.target.src = defaultImage; // 이미지 로딩 실패 시 기본 이미지로 변경
    event.target.onerror = null; // onerror 이벤트 제거 (무한 루프 방지)
  };

  return (
    <div className="product-card">
      <img
        src={imageUrl}
        alt={product.name}
        className="product-image"
        onError={handleImageError} // onError 이벤트 핸들러 추가
      />
      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">{product.price}원</p>
      <p className="product-fav">❤️ {product.favoriteCount}</p>
    </div>
  );
};

export default ProductCard;
