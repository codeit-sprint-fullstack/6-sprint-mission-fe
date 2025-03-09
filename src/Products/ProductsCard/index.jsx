/* eslint-disable react/prop-types */
import "./index.css";

export const ProductsCard = ({ product }) => {
  return (
    <div className="productCard ">
      <div className="productImageWrapper">
        <img
          className="productImage"
          src={product.images[0]}
          alt={product.name}
        />
      </div>
      <div className="productInfo">
        <p className="productName">{product.name}</p>
        <p className="productPrice">{product.price}</p>
        <p className="productFavoriteCount">♡ {product.favoriteCount}</p>
      </div>
    </div>
  );
};
