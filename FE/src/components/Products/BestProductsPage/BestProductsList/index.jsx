import { useEffect, useState } from "react";
import "./index.css";
import { getProductsList } from "../../apis/Products";
import { BestProductsCard } from "../BestProductsCard";

export const BestProductsList = () => {
  const [bestProductsState, setBestProductsState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const page = 1;
      const pageSize = 4;
      const orderBy = "favorite";
      const keyword = "";

      const newBestProducts = await getProductsList(
        page,
        pageSize,
        orderBy,
        keyword
      );
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
