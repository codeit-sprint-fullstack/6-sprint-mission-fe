"use client";

import Button from "@/components/ui/common-UI/Button";
import Dropdown from "@/components/ui/common-UI/Dropdown";
import Pagination from "@/components/ui/common-UI/Pagination";
import Search from "@/components/ui/common-UI/Search";
import { getBestProducts, getProducts } from "@/lib/product";
import Link from "next/link";
import { checkTokenExp } from "../../../utils/checkTokenExp";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const ItemsPage = () => {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();

  //미인증 시 로그인으로 리다이렉트
  useEffect(() => {
    if (!checkTokenExp()) {
      localStorage.removeItem("accessToken");
      router.push("/login");
      return;
    }

    //상품 목록 가져오기
    const getProductsData = async () => {
      const options = {
        page: page,
        pageSize: 10,
        orderBy: order,
        keyword: keyword,
      };

      try {
        const result = await getProducts(options);

        setProducts(result.list);
        setTotalItems(result.totalCount);
      } catch (e) {
        console.error("상품 불러오기 실패", e);
      }
    };

    //베스트 상품목록 가져오기
    const getBestProductsData = async () => {
      try {
        const result = await getBestProducts();

        setBestProducts(result.list);
      } catch (e) {
        console.error("상품 불러오기 실패", e);
      }
    };

    getProductsData();
    getBestProductsData();
  }, [page, keyword, order]);

  const itemsPerPage = 10;

  return (
    <div className="flex justify-center font-pretendard">
      <div className="flex flex-col items-center w-[1200px] pt-[94px] pb-[140px]">
        <div className="flex flex-row w-[1200px] justify-between mb-6">
          <p className="text-xl font-bold">베스트 상품</p>
        </div>

        <div className="grid grid-cols-4 gap-6 pb-[43px]">
          {bestProducts.map((bestProduct, index) => (
            <Link
              key={index}
              href={`/items/${bestProduct.id}`}
              className="bg-third overflow-hidden rounded-[16px]"
            >
              <div className="flex flex-col gap-[16px]">
                <img
                  className="w-[282px] h-[378px]"
                  src={bestProduct.images[0]}
                  alt={bestProduct.name}
                />
                <div>
                  <div className="text -[14px]"> {bestProduct.name}</div>
                  <div className="text -[16px] font-bold">
                    {" "}
                    {bestProduct.price.toLocaleString()} 원
                  </div>
                  <div className="flex felx-row items-center gap-[4px]">
                    <img
                      className="w-[16px] h-[16px]"
                      src="/image/ui/likeHeart.png"
                    />
                    <div className=""> {bestProduct.favoriteCount}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

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
            <Dropdown order={order} setOrder={setOrder} />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-6 pb-[43px]">
          {products.map((product, index) => (
            <Link
              key={index}
              href={`/items/${product.id}`}
              className="bg-third overflow-hidden rounded-[16px]"
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
