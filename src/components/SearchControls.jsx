import React from "react";
import "./SearchControls.css";
const SearchControls = ({
  searchInput,
  setSearchInput,
  onSearch,
  sort,
  setSort,
  onRegisterClick, // 상품 등록 버튼 클릭 이벤트 props로 받음
}) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };
  return (
    <div className="sale-header">
      <h2>판매 중인 상품</h2>
      <div className="sale-controls">
        <div className="search">
          <input
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyPress} // 엔터 키 이벤트 추가
          />

          <button onClick={onSearch}>검색</button>
        </div>
        <button className="register-btn" onClick={onRegisterClick}>
          상품 등록하기
        </button>{" "}
        {/* 클릭 이벤트 연결 */}
        <div className="sale-sorting">
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchControls;
