import { useEffect, useState } from "react";
import { getProducts } from "./api";
import { ItemCard } from "./ItemCard";
import { PageBar } from "./PageBar";
import "./style/products.css";
import SearchIcon from "./img/ic_search.svg";

export const Products = () => {
  const [orderBy, setOrderBy] = useState("recent");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const dataLoad = async ({ orderBy, page, pageSize, keyword }) => {
    const products = await getProducts({ orderBy, page, pageSize, keyword });
    setItems(products.list);
    setMaxPage(Math.ceil(products.tatalCount / pageSize));
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    dataLoad({ orderBy, page: 1, pageSize, keyword });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleNewestClick = () => setOrderBy("recent");

  const handleFavoriteClick = () => setOrderBy("favorite");

  useEffect(() => {
    dataLoad({ orderBy, page, pageSize, keyword });
  }, [orderBy, page, pageSize, keyword]);

  const pageChange = (pageNumber) => {
    setPage(pageNumber);
    dataLoad({ orderBy, page: pageNumber, pageSize, keyword });
  };

  return (
    <div className="products">
      <div className="productsHeader">
        <h2>판매 중인 상품</h2>
        <div className="navigaition">
          <div className="search">
            <img src={SearchIcon} alt="Search Icon" />
            <input
              placeholder="검색할 상품을 입력해 주세요"
              value={keyword}
              onChange={handleInputChange}
              onKeyDown={handleEnter}
            />
          </div>
          <a href="/additem" className="createItemButton">
            상품 등록하기
          </a>
          <button disabled={isLoading} onClick={handleNewestClick}>
            최신순
          </button>
          <button disabled={isLoading} onClick={handleFavoriteClick}>
            좋아요순
          </button>
        </div>
      </div>

      <div className="allProducts">
        {items?.map((item) => (
          <ItemCard item={item} key={`market-item-${item.id}`} />
        ))}
      </div>
      <div className="pageBar">
        {/* <PageBar maxPage={maxPage} currentPage={page} pageChange={pageChange} /> */}
      </div>
    </div>
  );
};
