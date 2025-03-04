import "./Products.css";
import { ItemList } from "./ItemList";

export const BestProduct = ({ items }) => {
  return (
    <div className="best-product">
      <p className="sub-title">베스트 상품</p>
      <ItemList items={items} />
    </div>
  );
};
