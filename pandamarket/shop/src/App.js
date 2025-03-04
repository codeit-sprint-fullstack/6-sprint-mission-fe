import { BestProduct } from "./components/BestProduct";
import { Header } from "./components/Header";
import { SellProduct } from "./components/SellProduct";
import { useState, useEffect } from "react";
import { getNumProduct, getProductList } from "./response/ProductService";
import "./App.css";
import { PageButton } from "./components/PageButton";
import { Footer } from "./components/Footer";

const LIMIT = 10;

function App() {
  const [bestItems, setBestItems] = useState([]);
  const [items, setItems] = useState([]);
  const [orderBy, setOrderBy] = useState("favoriteCount");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const handleLoad = async (options) => {
    const result = await getProductList(options);
    // const { products, paging } = result;
    console.log(result.paging);
    setItems(result);
    console.log(result);
    let totalCount = await getNumProduct();

    const calMaxPage = Math.ceil(totalCount / options.pageSize);
    setMaxPage(calMaxPage);
    // const bestresult = await getProductList({
    //   limit: 4,
    //   order: "favoriteCount",
    //   offset: 0,
    // });
    // setBestItems(bestresult);

    // setItems((prevItems) => [...prevItems, ...items]);
  };

  const handleBestLoad = async () => {
    const result = await getProductList({
      pageSize: 4,
      orderBy: "favoriteCount",
    });
    console.log(result);
    setBestItems(result);
  };
  useEffect(() => {
    handleLoad({ orderBy, page, pageSize: LIMIT, keyword: "" });
  }, [orderBy, page]);

  useEffect(() => {
    handleBestLoad();
  }, [page]);

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
