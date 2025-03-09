import "./App.css";
import "./reset.css";
import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { ProductsList } from "./components/ProductsList/ProductsLIst.jsx";
import { getProducts } from "./api.js";
import { Pagination } from "./components/Pagination/Pagination.jsx";
import { NavBar } from "./components/NavBar/NavBar.jsx";
import { BestProductsList } from "./components/BestProductsList/BestProductsList.jsx";
import { useGetDeviceType } from "./hooks/useGetDeviceType.js";

function App() {
  const [bestProducts, setBestProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    pageSize: null,
    orderBy: "recent",
    keyword: "",
  });
  const [bestParams, setBestParams] = useState({
    page: 1,
    pageSize: null,
    orderBy: "favorite",
    keyword: "",
  });

  // 반응형 리퀘스트 보내기
  useGetDeviceType(setParams, setBestParams);

  // 렌더링(판매중인 상품)
  useEffect(() => {
    if (!params.pageSize) return;
    productsLoad(params);
  }, [params]);

  const productsLoad = async (params) => {
    const { list, totalCount } = await getProducts(params);
    setProducts(list);
    setTotalCount(totalCount);
  };

  // 렌더링(베스트 상품)
  useEffect(() => {
    if (!bestParams.pageSize) return;
    bestProductsLoad(bestParams);
  }, [bestParams]);

  const bestProductsLoad = async (bestParams) => {
    const { list } = await getProducts(bestParams);
    setBestProducts(list);
  };

  // 렌더링(정렬 선택)
  const sortLoad = (orderBy) => {
    if (params.orderBy === orderBy) return;
    setParams((prevParams) => ({ ...prevParams, page: 1, orderBy }));
  };

  // 렌더링(검색)
  const searchLoad = (keyword) => {
    if (params.keyword === keyword) return;
    setParams((prevParams) => ({ ...prevParams, page: 1, keyword }));
  };

  // 렌더링(현재 페이지 변경)
  const pageLoad = (page) => {
    if (params.page === page) return;
    setParams((prevParams) => ({ ...prevParams, page }));
  };

  return (
    <div>
      <Header />
      <BestProductsList bestProducts={bestProducts} />
      <NavBar sortLoad={sortLoad} searchLoad={searchLoad} />
      <ProductsList products={products} />
      <Pagination pageLoad={pageLoad} params={params} totalCount={totalCount} />
      <Footer />
    </div>
  );
}

export default App;
