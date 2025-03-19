import { useState } from "react";
import style from "./SearchBox.module.scss";

const SearchBox = ({ searchLoad }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchLoad(keyword);
      }}
      className={style.searchBoxContainer}
    >
      <label htmlFor="search">
        <img
          className={style.searchIcon}
          src="/assets/image/items/nav-bar/search-box/ic_search.svg"
          alt="돋보기"
        />
      </label>
      <input
        onChange={(e) => setKeyword(e.target.value)}
        id="search"
        className={style.searchBox}
        type="text"
        placeholder="검색할 상품을 입력해주세요"
      />
    </form>
  );
};

export default SearchBox;
