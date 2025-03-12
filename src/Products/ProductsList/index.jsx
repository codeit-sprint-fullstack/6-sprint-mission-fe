import "./index.css";
import { useEffect, useState } from "react";
import { SearchByProducts } from "../SearchByProducts";
import { RegistProductButton } from "../RegistProductButton";
import { Pagination } from "../Pagination";
import { ProductsCard } from "../ProductsCard";
import { OrderByToggleButton } from "../OrderByToggleButton";
import { getProductsList } from "../../apis/Products";

export const ProductsList = () => {
  const [allProductsState, setAllProductsState] = useState([]);
  const [orderByState, setOrderByState] = useState("recent");
  const [pageState, setPageState] = useState(1);
  const [searchByState, setSearchByState] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const newProducts = await getProductsList(
        pageState,
        10,
        orderByState,
        searchByState
      );
      setAllProductsState(newProducts);
    };

    fetchData();
  }, [pageState, orderByState, searchByState]);

  return (
    <section className="wrapperSection">
      <div className="titleSection">
        <h2 className="productsTitle">판매중인 상품</h2>
        <div className="controlProducts">
          <SearchByProducts setSearchByState={setSearchByState} />
          <RegistProductButton />
          <OrderByToggleButton
            orderByState={orderByState}
            setOrderByState={setOrderByState}
          />
        </div>
      </div>

      <div className="productGrid">
        {allProductsState.map((product) => (
          <ProductsCard
            className="productCard"
            key={product.id}
            product={product}
          />
        ))}
      </div>

      <Pagination
        className="pagination"
        totalPages={5}
        currentPage={pageState}
        onPageChange={setPageState}
      />
    </section>
  );
};
