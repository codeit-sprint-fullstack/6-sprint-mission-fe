import "./ProductsList.css";

export const ProductsList = ({ products }) => {
  return (
    <section className="products-container">
      <ul className="products">
        {products.map((product) => {
          return <ProductsListItem key={product.id} product={product} />;
        })}
      </ul>
    </section>
  );
};

const ProductsListItem = ({ product }) => {
  return (
    <article>
      <img className="product-img" src={product.images[0]} alt={product.name} />
      <p className="product-name">{product.name}</p>
      <p className="product-price">{product.price.toLocaleString()}원</p>
      <div className="product-favorite-container">
        <img src="/src/assets/image/market/ic_heart.svg" alt="하트" />
        <p className="product-favorite-count">{product.favoriteCount}</p>
      </div>
    </article>
  );
};
