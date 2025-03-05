import Header from "./components/Header";
import BestProduct from "./components/BestProduct";
import Product from "./components/Product";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { getProducts } from "./api/api";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    handleLoad();
  }, []);

  const handleLoad = async () => {
    const { list } = await getProducts();
    setItems(list);
  };

  return (
    <div>
      <Header />
      <BestProduct items={items} />
      <Product />
      <ProductList items={items} />
      <Footer />
    </div>
  );
}

export default App;
