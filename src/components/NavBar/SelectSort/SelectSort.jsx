import { useState } from "react";
import "./SelectSort.css";

export const SelectSort = ({ sortLoad }) => {
  const [currentSort, setCurrentSort] = useState("최신순");
  const [sortBtn, setSortBtn] = useState(false);

  // 정렬 선택버튼 토글
  const sortPopupOn = () => {
    setSortBtn(!sortBtn);
  };

  const sortPopupOff = (e, orderBy) => {
    setSortBtn(false);
    setCurrentSort(e.target.innerText);
    sortSelect(orderBy);
  };

  // 정렬 선택 시 렌더링
  const sortSelect = (orderBy) => {
    sortLoad(orderBy);
  };

  return (
    <div className="select-container">
      <button onClick={sortPopupOn} className="small-select-btn">
        <img src="/src/assets/image/market/ic_sort.svg" alt="정렬 버튼" />
      </button>
      <button onClick={sortPopupOn} className="select-btn">
        <p>{currentSort}</p>
        <img src="/src/assets/image/market/ic_arrow_down.svg" alt="선택 버튼" />
      </button>
      <div className={`sort-btn-container ${sortBtn ? "modal" : ""}`}>
        <button
          onClick={(e) => sortPopupOff(e, "recent")}
          className="sort-newest-btn"
        >
          최신순
        </button>
        <button
          onClick={(e) => sortPopupOff(e, "favorite")}
          className="sort-favorite-btn"
        >
          좋아요순
        </button>
      </div>
    </div>
  );
};
