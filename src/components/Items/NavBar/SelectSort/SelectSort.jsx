import { useState } from "react";
import style from "./SelectSort.module.scss";

const SelectSort = ({ sortLoad }) => {
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
    <div className={style.selectContainer}>
      <button onClick={sortPopupOn} className={style.smallSelectBtn}>
        <img
          src="/assets/image/items/nav-bar/select-sort/ic_sort.svg"
          alt="정렬"
        />
      </button>
      <button onClick={sortPopupOn} className={style.selectBtn}>
        <p>{currentSort}</p>
        <img
          src="/assets/image/items/nav-bar/select-sort/ic_arrow_down.svg"
          alt="아래 화살표"
        />
      </button>
      <div
        className={`${style.sortBtnContainer} ${sortBtn ? style.modal : ""}`}
      >
        <button
          onClick={(e) => sortPopupOff(e, "recent")}
          className={style.sortNewestBtn}
        >
          최신순
        </button>
        <button
          onClick={(e) => sortPopupOff(e, "favorite")}
          className={style.sortFavoriteBtn}
        >
          좋아요순
        </button>
      </div>
    </div>
  );
};

export default SelectSort;
