import { useEffect, useState } from "react";
import { ItemCard } from "./ItemCard";
import { getProducts } from "./api";
import "./style/products.css";

export const BestProducts = () => {
  const [itmes, setItems] = useState([]);
  const [pageSize, setPageSize] = useState(4);

  const dataLoad = async ({ orderBy, pageSize }) => {
    const products = await getProducts({ orderBy, pageSize });
    setItems(products.list);
  };

  useEffect(() => {
    dataLoad({ orderBy: "favorite", pageSize });
  }, []);

  return (
    <div className="bestProducts">
      <h2>베스트 상품</h2>
      <div className="bestProductsList">
        {itmes?.map((item) => (
          <ItemCard item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
};
