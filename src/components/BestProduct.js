import styles from "./BestProduct.module.css";
import unheartIcon from "../assets/images/icon/ic-unheart.svg";
import { useEffect, useState } from "react";

function BestProduct({ items }) {
  const [pageSize, setPageSize] = useState(4);

  useEffect(() => {
    const updateBestItemCount = () => {
      if (window.matchMedia("(max-width: 743px)").matches) {
        setPageSize(1);
      } else if (window.matchMedia("(max-width: 1199px)").matches) {
        setPageSize(2);
      } else {
        setPageSize(4);
      }
    };

    updateBestItemCount();

    window.addEventListener("resize", updateBestItemCount);
    return () => {
      window.removeEventListener("resize", updateBestItemCount);
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
                <img src={unheartIcon} /> {item.favoriteCount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default BestProduct;
