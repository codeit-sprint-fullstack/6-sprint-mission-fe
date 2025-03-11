import styles from "./ProductList.module.css";
import unheartIcon from "../assets/images/icon/ic-unheart.svg";
import { Link } from "react-router-dom";

function ProductList({
  order,
  setOrder,
  input,
  setInput,
  currentItems,
  dropdownItems,
  handleDropdown,
}) {
  return (
    <main className={styles.product}>
      <div className={styles.heading}>
        <div className={styles.title}>판매 중인 상품</div>
        <div className={styles.searchBar}>
          <input
            type="text"
            value={input}
            className={styles.input}
            onChange={(e) => setInput(e.target.value)}
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
          <div key={item.id}>
            <ProductListItem item={item} />
          </div>
        ))}
      </div>
    </main>
  );
}

function ProductListItem({ item }) {
  return (
    <div>
      <img className={styles.img} src={item.images} alt={item.name} />
      <div className={styles.description}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.price}>{item.price}원</div>
        <div className={styles.favoriteCount}>
          <img src={unheartIcon} />
          {item.favoriteCount}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
