import style from "./ProductsList.module.scss";

const ProductsList = ({ products }) => {
  return (
    <section className={style.productsContainer}>
      <ul className={style.products}>
        {products.map((product) => {
          return <ProductsListItem key={product._id} product={product} />;
        })}
      </ul>
    </section>
  );
};

const ProductsListItem = ({ product }) => {
  return (
    <article>
      <img
        className={style.productImg}
        src="/assets/image/items/product-list/img_default_product.svg"
        alt={product.name}
      />
      <p className={style.productName}>{product.name}</p>
      <p className={style.productPrice}>{product.price.toLocaleString()}원</p>
      <div className={style.productLikeContainer}>
        <img src="/assets/image/items/product-list/ic_heart.svg" alt="하트" />
        <p className={style.productLike}>{product.like}</p>
      </div>
    </article>
  );
};

export default ProductsList;
