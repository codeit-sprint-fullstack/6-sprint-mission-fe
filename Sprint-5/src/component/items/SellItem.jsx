import { useState, useEffect } from "react";
import ItemFetch from "../../api/itemFetch.js";
import { ItemCard } from "./ItemCard";
import Search from '/ic_search.png'
import './SellItem.css'

export const SellItem = () => {
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const pazeSize = 10;

  useEffect(() => {
    const fetchItem = async () => {
      const data = await ItemFetch({
        page,
        pazeSize,
        orderBy,
        keyword,
      });
      setItems(data.list);
    };
    fetchItem();
  }, [keyword, orderBy, page]);

  return (
    <div className="sell-items-container">
      <div>
        <div className="sell-bar">
          <h2 className="sell-title">판매중인 상품</h2>
          <div className="sell-sub">
            <div className="search-bar">
              <img src={Search} width={24} height={24} />
              <input
                type="text"
                placeholder="검색할 상품을 입력해주세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="search-input"
              />
            </div>
            <button className="registration">상품 등록하기</button>
          </div>
          
        </div>
        <div className="sell-list">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
};
