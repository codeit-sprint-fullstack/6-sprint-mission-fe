import style from "./SelectSort.module.scss";
import useSelectSort from "../../../../hooks/useSelectSort";

const SelectSort = ({ sortLoad }) => {
  const [currentSort, sortBtn, sortPopupOn, sortPopupOff] =
    useSelectSort(sortLoad);

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
