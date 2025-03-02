import "./Products.css";
import { SearchProduct } from "./SearchProduct";

import { ItemList } from "./ItemList";

export const SellProduct = ({ items, order, setOrder }) => {
  const handleSort = (e) => {
    setOrder(e.target.value);
  };

  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  return (
    <div className="sell-product">
      <div className="top-sell-product">
        <p className="sub-title">판매 중인 상품</p>
        <SearchProduct />
        <button className="product-button">상품 등록하기</button>
        <select onChange={handleSort} value={order} className="order-button">
          <option value="price">최신순</option>
          <option value="favoriteCount">좋아요순</option>
        </select>
      </div>
      <ItemList items={sortedItems} />
    </div>
  );
};
