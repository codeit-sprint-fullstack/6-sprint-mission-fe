import Header from "./components/Header";
import BestProduct from "./components/BestProduct";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { getProducts } from "./api/api";
import Pagination from "./components/Pagination";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("recent");
  const [input, setInput] = useState("");
  const [dropdownItems, setDropdownItems] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const updatePageSize = () => {
    if (window.matchMedia("(max-width: 743px)").matches) {
      setPageSize(4);
    } else if (window.matchMedia("(max-width: 1199px)").matches) {
      setPageSize(6);
    } else {
      setPageSize(10);
    }
  };

  const handleLoad = async () => {
    const data = await getProducts(1, 250);
    setItems(data.list);
  };

  const handleDropdown = () => {
    setDropdownItems((prev) => !prev);
  };

  useEffect(() => {
    updatePageSize();
    handleLoad();

    window.addEventListener("resize", updatePageSize);
    return () => {
      window.removeEventListener("resize", updatePageSize);
    };
  }, []);

  const newItems = items
    .filter((item) => item.name.toLowerCase().includes(input.toLowerCase()))
    .sort((a, b) => {
      if (order === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return b.favoriteCount - a.favoriteCount;
      }
    });

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = newItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <Header />
      <BestProduct items={items} />
      <ProductList
        order={order}
        setOrder={setOrder}
        input={input}
        setInput={setInput}
        currentItems={currentItems}
        dropdownItems={dropdownItems}
        handleDropdown={handleDropdown}
      />
      <Pagination
        totalCount={newItems.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Footer />
    </div>
  );
}

export default App;
