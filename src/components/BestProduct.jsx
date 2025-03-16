import styles from "./BestProduct.module.css";
import unheartIcon from "../assets/images/icon/ic-unheart.svg";
import { useEffect, useState } from "react";
import { BEST_PAGE_SIZE } from "../constants";

function BestProduct({ items }) {
  const [pageSize, setPageSize] = useState(BEST_PAGE_SIZE.desktop);

  useEffect(() => {
    const updatePageSize = () => {
      if (window.matchMedia("(max-width: 743px)").matches) {
        setPageSize(BEST_PAGE_SIZE.mobile);
      } else if (window.matchMedia("(max-width: 1199px)").matches) {
        setPageSize(BEST_PAGE_SIZE.tablet);
      } else {
        setPageSize(BEST_PAGE_SIZE.desktop);
      }
    };

    updatePageSize();

    window.addEventListener("resize", updatePageSize);
    return () => {
      window.removeEventListener("resize", updatePageSize);
    };
  }, []);

  const bestItems = items
    .sort((a, b) => b.favoriteCount - a.favoriteCount)
    .slice(0, pageSize);

  return (
    <main>
      <div className={styles.title}>베스트 상품</div>
      <div className={styles.list}>
        {bestItems.map((item) => (
          <div key={item.id}>
            <img className={styles.img} src={item.images} alt={item.name} />
            <div className={styles.description}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.price}>{item.price}원</div>
              <div className={styles.favoriteCount}>
                <img src={unheartIcon} alt="좋아요 아이콘" />{" "}
                {item.favoriteCount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default BestProduct;
