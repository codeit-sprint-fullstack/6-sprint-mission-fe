import { useEffect, useState } from "react";
import { getProducts } from "../../api/index";
import { PAGE_SIZE, ORDER } from "../../constants";
// import BestItemList from "./components/BestItemList";
import ItemList from "./components/ItemList";
import Pagination from "../../components/ui/Pagination";

function MarketPage() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState(ORDER.recent);
  const [keyword, setKeyword] = useState("");
  const [dropdownItems, setDropdownItems] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE.desktop);
  const [totalCount, setTotalCount] = useState();

  const updatePageSize = () => {
    if (window.matchMedia("(max-width: 743px)").matches) {
      setPageSize(PAGE_SIZE.mobile);
    } else if (window.matchMedia("(max-width: 1199px)").matches) {
      setPageSize(PAGE_SIZE.tablet);
    } else {
      setPageSize(PAGE_SIZE.desktop);
    }
  };

  const fetchSortedData = async ({ page, pageSize, order, keyword }) => {
    const data = await getProducts({ page, pageSize, order, keyword });
    setItems(data);
    setTotalCount(data.length);
  };

  const handleSearch = () => {
    setPage(1);
    fetchSortedData({ page: 1, pageSize, order, keyword });
  };

  const handleDropdown = () => {
    setDropdownItems((prev) => !prev);
  };

  useEffect(() => {
    updatePageSize();
    fetchSortedData({ page, pageSize, order, keyword });

    window.addEventListener("resize", updatePageSize);
    return () => {
      window.removeEventListener("resize", updatePageSize);
    };
  }, [page, pageSize, order, keyword]);

  const onPageChange = (pageNum) => {
    setPage(pageNum);
    fetchSortedData({ page: pageNum, pageSize, order, keyword });
  };

  return (
    <div>
      {/* <BestItemList items={items} /> */}
      <ItemList
        order={order}
        setOrder={setOrder}
        keyword={keyword}
        setKeyword={setKeyword}
        onChange={handleSearch}
        currentItems={items}
        dropdownItems={dropdownItems}
        handleDropdown={handleDropdown}
      />
      <Pagination
        totalCount={totalCount}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default MarketPage;
