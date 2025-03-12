import { BestProduct } from "./components/BestProduct";
import { Header } from "./components/Header";
import { SellProduct } from "./components/SellProduct";
import { useState, useEffect } from "react";
import { getProductList } from "./response/ProductService";
import "./App.css";
import { PageButton } from "./components/PageButton";
import { Footer } from "./components/Footer";

function App() {
  const [bestItems, setBestItems] = useState([]);
  const [items, setItems] = useState([]);
  const [orderBy, setOrderBy] = useState("favorite");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleLoad = async (options) => {
    const result = await getProductList(options);
    setItems(result.list);

    const calMaxPage = Math.ceil(result.totalCount / options.pageSize);
    setMaxPage(calMaxPage);
  };
  const updatePageSize = () => {
    const width = window.innerWidth;

    if (width <= 768) {
      setPageSize(4);
    } else if (width <= 1200) {
      setPageSize(6);
    } else {
      setPageSize(10);
    }
  };
  const handleBestLoad = async () => {
    const result = await getProductList({
      pageSize: pageSize / 2 - 1,
      orderBy: "favorite",
    });
    setBestItems(result.list);
  };
  useEffect(() => {
    handleLoad({ orderBy, page, pageSize, keyword: "" });
  }, [orderBy, page, pageSize]);

  useEffect(() => {
    updatePageSize();

    window.addEventListener("resize", updatePageSize);

    return () => {
      window.removeEventListener("resize", updatePageSize);
    };
  }, []);

  useEffect(() => {
    handleBestLoad();
  }, [page, pageSize]);

  return (
    <div className="App">
      <Header />
      <div className="products">
        <BestProduct items={bestItems} />
        <SellProduct items={items} order={orderBy} setOrder={setOrderBy} />
        <div className="page-buttons">
          <PageButton page={page} setPage={setPage} maxPage={maxPage} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
