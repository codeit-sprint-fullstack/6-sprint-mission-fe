import { useEffect, useState } from "react";
import { getProductList } from "../api";

export const useFetchProductList = ({ page, pageSize, orderBy }) => {
  const options = {
    page,
    pageSize,
    orderBy,
  };
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const products = await getProductList(options);
        setProducts(products);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductList();
  }, [page, pageSize, orderBy]);

  return { products, isLoading };
};
