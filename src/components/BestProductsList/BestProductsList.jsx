import "./BestProductsList.css";

export const BestProductsList = ({ bestProducts }) => {
  return (
    <>
      <div className="txt-container">
        <h1 className="txt best">베스트 상품</h1>
      </div>
      <section className="best-products-container">
        <ul className="best-products">
          {bestProducts.map((bestProduct) => {
            return (
              <BestProductsListItem
                key={bestProduct.id}
                bestProduct={bestProduct}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
};

const BestProductsListItem = ({ bestProduct }) => {
  return (
    <article>
      <img
        className="best-product-img"
        src={bestProduct.images}
        alt={bestProduct.name}
      />
      <p className="best-product-name">{bestProduct.name}</p>
      <p className="best-product-price">
        {bestProduct.price.toLocaleString()}원
      </p>
      <div className="best-product-favorite-container">
        <img src="/src/assets/image/market/ic_heart.svg" alt="하트" />
        <p className="best-product-favorite-count">
          {bestProduct.favoriteCount}
        </p>
      </div>
    </article>
  );
};
