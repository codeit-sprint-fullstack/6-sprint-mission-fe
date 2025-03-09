import React from "react";
import Layout from "../components/Layout/Layout";
import BestProducts from "../components/Products/BestProducts";
import ProductList from "../components/Products/ProductList";

const Home = () => {
  return (
    <Layout>
      <BestProducts />

      <ProductList />
    </Layout>
  );
};

export default Home;
