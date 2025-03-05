import { useState } from "react";
import "./ProductList.css";

function ProductList({ items }) {
  const [order, setOrder] = useState("recent");

  const sortedItems = [...items].sort((a, b) => {
    if (order === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (order === "favoriteCount") {
      return b.favoriteCount - a.favoriteCount;
    }
  });

  const handleOrderChange = (e) => setOrder(e.target.value);

  return (
    <>
      <nav>
        <div>판매 중인 상품</div>
        <input type="text" placeholder="검색할 상품을 입력해주세요"></input>
        <button type="button">상품 등록하기</button>
        <select onChange={handleOrderChange} value={order}>
          <option value="recent">최신순</option>
          <option value="favoriteCount">좋아요순</option>
        </select>
      </nav>
      <div className="product-list">
        {sortedItems.map((item) => (
          <div key={item.id}>
            <ProductListItem item={item} />
          </div>
        ))}
      </div>
    </>
  );
}

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

export default ProductList;
