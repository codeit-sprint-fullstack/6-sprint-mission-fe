import { useState } from "react";
import "./SearchBox.css";

export const SearchBox = ({ searchLoad }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchLoad(keyword);
      }}
      className="search-box-container"
    >
      <label htmlFor="search">
        <img
          className="search-icon"
          src="/src/assets/image/market/ic_search.svg"
          alt="돋보기"
        />
      </label>
      <input
        onChange={(e) => setKeyword(e.target.value)}
        id="search"
        className="search-box"
        type="text"
        placeholder="검색할 상품을 입력해주세요"
      />
    </form>
  );
};
