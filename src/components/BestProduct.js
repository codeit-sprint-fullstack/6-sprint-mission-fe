import "./ProductList.css";

function BestProduct({ items }) {
  const bestItems = items
    .sort((a, b) => b.favoriteCount - a.favoriteCount)
    .slice(0, 4);

  return (
    <>
      <nav>
        <div>베스트 상품</div>
      </nav>
      <div className="best-product-list">
        {bestItems.map((item) => (
          <div key={item.id}>
            <img
              className="best-product-list__img"
              src={item.images}
              alt={item.name}
            />
            <div>
              <div>{item.name}</div>
              <div>{item.price}원</div>
              <div>좋아요 {item.favoriteCount}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BestProduct;
