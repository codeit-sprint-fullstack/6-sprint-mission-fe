import { useState } from "react";
import "./index.css";

export const SearchByProducts = ({ setSearchByState }) => {
  const [searchByInputState, setSearchByInputState] = useState("");

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      setSearchByState(searchByInputState);
    }
  };

  const onclickSearchByHandler = () => {
    setSearchByState(searchByInputState);
  };

  return (
    <>
      <div className="search-bar">
        <button className="search-btn" onClick={onclickSearchByHandler}>
          🔍
        </button>
        <input
          type="text"
          value={searchByInputState}
          onChange={(e) => setSearchByInputState(e.target.value)}
          onKeyUp={keyPressHandler}
          placeholder="검색어를 입력하세요"
        />
      </div>
    </>
  );
};
