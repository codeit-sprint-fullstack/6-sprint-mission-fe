import styles from "./ProductListItem.module.css";
import unheartIcon from "../assets/images/icon/ic-unheart.svg";
import defaultImg from "../assets/images/icon/img-default.png"

function ProductListItem({ item }) {
  return (
    <div>
      <img className={styles.img} src={defaultImg} alt={item.name} />
      <div className={styles.description}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.price}>{item.price}원</div>
        <div className={styles.favoriteCount}>
          <img src={unheartIcon} alt="좋아요 아이콘" />
          {item.favoriteCount}
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
