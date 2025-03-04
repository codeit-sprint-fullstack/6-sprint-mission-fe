import "./Item.css";
import heart from "../asset/image/ic_heart.png";
export const Item = ({ item }) => {
  return (
    <div className="item">
      <img className="item-img" src={item.images} alt={item.name}></img>
      <div className="item-text">
        <p className="item-name">{item.name}</p>
        <p className="item-price">{item.price}원</p>
        <div className="item-favorite">
          <img className="heart" src={heart} alt="heart" />
          <p className="favorite-count">{item.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
};
