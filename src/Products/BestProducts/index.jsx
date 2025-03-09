import { useEffect, useState } from "react";
import "./index.css";
import { getProductsList } from "../../apis/Products";
import { BestProductsCard } from "../BestProductsCard";

export const BestProducts = () => {
  const [bestProductsState, setBestProductsState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newBestProducts = await getProductsList(1, 4, "favorite", "");
      setBestProductsState(newBestProducts);
    };

    fetchData();
  }, []);

  return (
    <section>
      <h2 className="section-title">베스트 상품</h2>
      <div className="bestProductGrid">
        {bestProductsState.map((product) => (
          <BestProductsCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
