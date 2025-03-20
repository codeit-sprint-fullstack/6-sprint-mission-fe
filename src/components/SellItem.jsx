import "./SellItem.css";
import { SearchProduct } from "./SearchItem";
import { useState } from "react";
import { Item } from "./Item";
import { Link } from "react-router-dom";

export const SellProduct = ({ items, order, setOrder }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSort = (e) => {
    setOrder(e.target.value);
  };

  const filteredItems = items
    .filter((item) => item.name.includes(searchKeyword))
    .sort((a, b) => b[order] - a[order]);
  return (
    <div className="sell-product">
      <div className="top-sell-product">
        <p className="sub-title">판매 중인 상품</p>
        <div className="sell-product-contents">
          <SearchProduct onSearch={setSearchKeyword} />
          <Link className="product-button" to="/register">
            상품 등록하기
          </Link>
          <select onChange={handleSort} value={order} className="order-button">
            <option value="recent">최신순</option>
          </select>
        </div>
      </div>
      <ul className="sell-items">
        {filteredItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};
