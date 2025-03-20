import { SellProduct } from "../components/SellItem";
import { useState, useEffect } from "react";
import api from "../api/index.api";
import "./ItemPage.css";
import { PageButton } from "../components/PageButton";

function SellProductPage() {
  const [items, setItems] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleLoad = async (options) => {
    const result = await api.items.getItemList(options);
    setItems(result.items);

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

  useEffect(() => {
    handleLoad({ orderBy, page, pageSize, keyWord: "" });
  }, [orderBy, page, pageSize]);

  useEffect(() => {
    updatePageSize();

    window.addEventListener("resize", updatePageSize);

    return () => {
      window.removeEventListener("resize", updatePageSize);
    };
  }, []);

  return (
    <div className="App">
      <div className="products">
        <SellProduct items={items} order={orderBy} setOrder={setOrderBy} />
        <div className="page-buttons">
          <PageButton page={page} setPage={setPage} maxPage={maxPage} />
        </div>
      </div>
    </div>
  );
}

export default SellProductPage;
