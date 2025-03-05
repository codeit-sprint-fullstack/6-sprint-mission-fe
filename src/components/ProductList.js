import "./ProductList.css";

function ProductListItem({ item }) {
  return (
    <div className="product-list-item">
      <img
        className="product-list-item__img"
        src={item.images}
        alt={item.name}
      />
      <div>
        <div>{item.name}</div>
        <div>{item.price}원</div>
        <div>좋아요 {item.favoriteCount}</div>
      </div>
    </div>
  );
}

function ProductList({ items }) {
  return (
    <div className="product-list">
      {items.map((item) => (
        <div key={item.id}>
          <ProductListItem item={item} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
