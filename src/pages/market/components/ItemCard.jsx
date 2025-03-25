import styles from "./ItemCard.module.css";
import unheartIcon from "../../../assets/images/icon/ic_unheart.svg";
import defaultImg from "../../../assets/images/img/img_default.svg";
import { Link } from "react-router-dom";

function ItemCard({ item }) {
  return (
    <div>
      <Link to={`/items/${item._id}`}>
        <img className={styles.img} src={defaultImg} alt={item.name} />
      </Link>
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

export default ItemCard;
