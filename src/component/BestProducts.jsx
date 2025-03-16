import React from "react";
import "./BestProducts.css";

const BestProducts = ({ bestProducts }) => {
  return (
    <div>
      <h3 className="best-title">베스트 상품</h3>
      <div className="best-products">
        {bestProducts.map((product) => (
          <div key={product.id} className="product-card best-card">
            {product.images?.length > 0 && (
              <img src={product.images[0]} alt={product.name} />
            )}
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">{product.price}원</p>
              <div className="product-likes">♡ {product.likes}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestProducts;
