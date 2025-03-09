/* eslint-disable react/prop-types */
import "./index.css";

export const BestProductsCard = ({ product }) => {
  return (
    <div className="bestProductCard ">
      <div className="bestProductImageWrapper">
        <img
          className="bestProductImage"
          src={product.images[0]}
          alt={product.name}
        />
      </div>
      <div className="bestProductInfo">
        <p className="bestProductDescription">{product.description}</p>
        <p className="bestProductPrice">{product.price}원</p>
        <p className="bestProductFavoriteCount">♡ {product.favoriteCount}</p>
      </div>
    </div>
  );
};
