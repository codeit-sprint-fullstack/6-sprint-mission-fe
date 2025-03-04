import "./SearchProduct.css";
import { useState } from "react";
export const SearchProduct = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const handleSearch = (e) => {
    setKeyword(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <div>
      <input
        className="search-product"
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        value={keyword}
        onChange={handleSearch}
      />
    </div>
  );
};
