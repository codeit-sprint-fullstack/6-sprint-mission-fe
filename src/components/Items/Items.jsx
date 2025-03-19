import { useEffect, useState } from "react";
import ProductsList from "./ProductsList/ProductsLIst.jsx";
import Pagination from "./Pagination/Pagination.jsx";
import NavBar from "./NavBar/NavBar.jsx";
import useGetDeviceType from "../../hooks/useGetDeviceType.js";
import { Helmet } from "react-helmet";
import { getProducts } from "../../backend/API/productApi.js";

const Items = () => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const [params, setParams] = useState({
    offset: 1,
    limit: null,
    orderBy: "recent",
    keyword: "",
  });

  // 반응형 리퀘스트 보내기
  useGetDeviceType(setParams);

  // 렌더링(판매중인 상품)
  useEffect(() => {
    if (!params.limit) return;
    productsLoad(params);
  }, [params]);

  const productsLoad = async (params) => {
    const { list, totalCount } = await getProducts(params);
    setProducts(list);
    setTotalCount(totalCount);
  };

  // 렌더링(정렬 선택)
  const sortLoad = (orderBy) => {
    if (params.orderBy === orderBy) return;
    setParams((prevParams) => ({ ...prevParams, offset: 1, orderBy }));
  };

  // 렌더링(검색)
  const searchLoad = (keyword) => {
    if (params.keyword === keyword) return;
    setParams((prevParams) => ({ ...prevParams, offset: 1, keyword }));
  };

  // 렌더링(현재 페이지 변경)
  const pageLoad = (offset) => {
    if (params.offset === offset) return;
    setParams((prevParams) => ({ ...prevParams, offset }));
  };

  return (
    <div>
      <Helmet>
        <title>판다마켓 | 상품 목록</title>
      </Helmet>
      <NavBar sortLoad={sortLoad} searchLoad={searchLoad} />
      <ProductsList products={products} />
      <Pagination pageLoad={pageLoad} params={params} totalCount={totalCount} />
    </div>
  );
};

export default Items;
