import "./BestProduct.css";
import { Item } from "./Item";

export const BestProduct = ({ items }) => {
  return (
    <div className="best-product">
      <p className="sub-title">베스트 상품</p>
      <ul className="best-items">
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};
