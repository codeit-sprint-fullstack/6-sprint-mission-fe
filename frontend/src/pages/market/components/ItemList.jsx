import ItemCard from "./ItemCard";
import styles from "./ItemList.module.css";
import { Link } from "react-router-dom";

function ItemList({
  order,
  setOrder,
  keyword,
  setKeyword,
  currentItems,
  dropdownItems,
  handleDropdown,
}) {
  return (
    <main>
      <div className={styles.heading}>
        <div className={styles.title}>판매 중인 상품</div>
        <div className={styles.searchBar}>
          <input
            type="text"
            value={keyword}
            className={styles.keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색할 상품을 입력해주세요"
          ></input>
        </div>
        <div className={styles.createBtn}>
          <Link to="/registration">
            <button className={styles.button} type="button">
              상품 등록하기
            </button>
          </Link>
        </div>
        <div className={styles.dropdown}>
          <button
            type="button"
            className={styles.dropdownBtn}
            onClick={handleDropdown}
          >
            {order === "recent" ? "최신순" : "좋아요순"}
          </button>
          <div
            className={
              dropdownItems ? `${styles.dropdownItems}` : `${styles.hide}`
            }
          >
            <button
              type="button"
              className={styles.dropdownItem}
              onClick={() => setOrder("recent")}
            >
              최신순
            </button>
            <button
              type="button"
              className={`${styles.dropdownItem} ${styles.line}`}
              onClick={() => setOrder("favoriteCount")}
            >
              좋아요순
            </button>
          </div>
        </div>
      </div>
      <div className={styles.list}>
        {currentItems.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </main>
  );
}

export default ItemList;
