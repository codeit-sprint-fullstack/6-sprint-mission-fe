import HeartIcon from "./img/ic_heart.svg";
import "./style/products.css";

export const ItemCard = ({ item }) => {
  return (
    <div className="itemCard">
      <img className="itemCardImg" src={item.images[0]} alt={item.name} />
      <div className="itemInfo">
        <h3 className="itemName">{item.name}</h3>
        <p className="itemPrice">{item.price}원</p>
        <div className="favoriteCount">
          <img src={HeartIcon} alt="Heart Icon" />
          {item.favoriteCount}
        </div>
      </div>
    </div>
  );
};
