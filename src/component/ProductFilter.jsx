import React from "react";
import "./ProductFilter.css"; // 스타일 파일 추가
import Vector from "../img/Vector.png";

const ProductFilter = ({ search, setSearch, sort, setSort, onRegister }) => {
  return (
    <div className="filter-container">
      <h3 className="sell-title">판매 중인 상품</h3>
      <div className="search-container">
        <img src={Vector} alt="검색 아이콘" className="search-icon" />
        <input
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          className="search-input"
        />
      </div>
      <button className="register-btn" onClick={onRegister}>
        상품 등록하기
      </button>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="sort-select"
      >
        <option value="createdAt">최신순</option>
        <option value="likes">좋아요순</option>
      </select>
    </div>
  );
};

export default ProductFilter;
