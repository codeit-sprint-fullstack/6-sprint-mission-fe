import NavigationBar from "../../Common/NavigationBar";
import Footer from "../../Common/Footer";
import { BestProducts } from "../../Products/BestProducts";
import { ProductsList } from "../../Products/ProductsList";
import "./index.css";

export const BestProductsPage = () => {
  return (
    <>
      <NavigationBar />
      <div className="termDiv" />
      <BestProducts />
      <ProductsList />
      <Footer />
    </>
  );
};
