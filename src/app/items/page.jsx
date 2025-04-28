"use client";

import Button from "@/components/ui/common-UI/Button";
import Dropdown from "@/components/ui/common-UI/Dropdown";
import Pagination from "@/components/ui/common-UI/Pagination";
import Search from "@/components/ui/common-UI/Search";
import { getProducts } from "@/lib/product";
import Link from "next/link";
import { checkTokenExp } from "../../../utils/checkTokenExp";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const ItemsPage = () => {
  // const [saleItems, setSaleItems] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [order, setOrder] = useState("recent");
  // const [keyword, setKeyword] = useState("");
  // const [page, setPage] = useState(null);
  // const [salePageSize, setSalePageSize] = useState(0);

  // const handleSelectChange = (e) => setOrder(e.target.value);
  // const handleSubmit = (e) => setKeyword(e.target.value);

  // useEffect(() => {
  //   if (width >= 1200) setSalePageSize(10);
  //   else if (width >= 744) setSalePageSize(6);
  //   else setSalePageSize(4);
  //   handleSaleItems({ pageSize: salePageSize });
  // }, []);

  // const handleSaleItems = async (data) => {
  //   const result = await api.products.getAllProducts(data);
  //   setSaleItems(result);
  //   const totalItems = result.totalItems;
  //   setTotalPage(Math.ceil(totalItems / 10));
  // };

  // const getSalePageSize = () => {
  //   if (width >= 1200) return 10;
  //   else if (width >= 744) return 6;
  //   return 4;
  // };

  // const handleButtonClick = (e) => {
  //   e.target.classList.add("clicked");
  //   setTimeout(() => e.target.classList.remove("clicked"), 200);
  // };

  // useEffect(() => {
  //   handleSaleItems({ page: 1, pageSize: 10, orderBy: order, keyword: "" });
  // }, [order]);

  // useEffect(() => {
  //   handleSaleItems({ page: 1, pageSize: 10, orderBy: "recent", keyword });
  // }, [keyword]);

  // useEffect(() => {
  //   const reLoad = async () => {
  //     const salepageSize = getSalePageSize();
  //     const saleProducts = await api.products.getAllProducts({
  //       pageSize: salepageSize,
  //     });
  //     setSaleItems(saleProducts);
  //   };
  //   reLoad();
  // }, [page]);

  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();

  //미인증 시 로그인으로 리다이렉트
  useEffect(() => {
    // 디버깅
    console.log("아이템 페이지 렌더링");
    console.log("page", page);

    if (!checkTokenExp()) {
      localStorage.removeItem("accessToken");
      router.push("/login");
      return;
    }

    const getProductsData = async () => {
      const options = {
        page: page,
        pageSize: 10,
        orderBy: orderBy,
        keyword: keyword,
      };

      try {
        const result = await getProducts(options);

        //디버깅
        console.log("totalItems", result.totalCount);

        setProducts(result.list);
        setTotalItems(result.totalCount);
      } catch (e) {
        console.error("상품 불러오기 실패", e);
      }
    };

    getProductsData();
  }, [page, keyword, orderBy]);

  //디버깅
  console.log("products", products);
  console.log("totalItems", totalItems);

  const itemsPerPage = 10;

  return (
    <div className="flex justify-center font-pretendard">
      <div className="flex flex-col items-center w-[1200px] pt-[94px] pb-[140px]">
        <div className="flex flex-row w-[1200px] justify-between mb-6">
          <p className="text-xl font-bold">판매중인 상품</p>
          <div className="flex flex-row gap-[12px]">
            <Search width="w-[325px]" />
            <Link href="/registration">
              <Button
                text="상품 등록하기"
                width="w-[133px]"
                height="h-[42px]"
                // onClick={() => console.log("상품 등록하기 버튼 클릭")}
              />
            </Link>
            <Dropdown />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-6 pb-[43px]">
          {products.map((product, index) => (
            <Link
              key={index}
              href={`/items/${product.id}`}
              className="bg-third"
            >
              <div className="flex flex-col gap-[16px]">
                <img
                  className="w-[220px] h-[220px]"
                  src={product.images[0]}
                  alt={product.name}
                />
                <div>
                  <div className="text -[14px]"> {product.name}</div>
                  <div className="text -[16px] font-bold">
                    {" "}
                    {product.price.toLocaleString()} 원
                  </div>
                  <div className="flex felx-row items-center gap-[4px]">
                    <img
                      className="w-[16px] h-[16px]"
                      src="/image/ui/likeHeart.png"
                    />
                    <div className=""> {product.favoriteCount}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Pagination
          totalProducts={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          setCurrentPage={setPage}
        />
      </div>
    </div>
  );
};

export default ItemsPage;
