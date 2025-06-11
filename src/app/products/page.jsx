import React from "react";
import BestProductList from "./_components/BestProducts/BestProductList";
import ProductList from "./_components/Products/ProductList";

export default function ProductsPage() {
  return (
    <>
      <BestProductList />
      <ProductList />
    </>
  );
}
