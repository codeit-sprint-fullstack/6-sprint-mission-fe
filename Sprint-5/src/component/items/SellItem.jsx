import { useState, useEffect } from "react";
import ItemFetch from "../../api/itemFetch.js";
import { ItemCard } from "./ItemCard";
import Search from "/ic_search.png";
import "./SellItem.css";
import { Pagination } from "../UI/Pagination.jsx";
import { Dropdown } from "../UI/DropDown.jsx";

export const SellItem = () => {
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetchItem = async () => {
      const data = await ItemFetch({
        page,
        pageSize,
        orderBy,
        keyword,
      });
      setItems(data.list);
      setTotalPage(data.list.length);
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
            <Dropdown orderBy={orderBy} setOrderBy={setOrderBy} /> {/* 드롭다운 추가 */}
          </div>
        </div>
        <div className="sell-list">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        <Pagination 
          totalPage={totalPage} // ⚠️ API 응답 데이터에 따라 동적으로 설정해야 함
          currentPage={page}
          onPageChange={setPage} // 현재 페이지 변경 함수 전달
        />
      </div>
    </div>
  );
};
