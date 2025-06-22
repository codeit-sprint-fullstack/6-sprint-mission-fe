"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { productService, Product } from "@/lib/services/api/productService";
import ProductCard from "@/app/(main)/(item)/items/_components/ProductCard";
import TitleSection from "../ui/TitleSection";
import SearchBar from "../ui/SearchBar";

// TODO: 디테일 페이지를 위해서 임시로 만든 리스트 페이지. 반푼이.
// 나중에 리액트 쿼리 처리도.
export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchValueState, setSearchValueState] = useState("");
  const [sortButtonState, setSortButtonState] = useState(false);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValueState(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await productService.getProducts(1, 4, "recent", "");
      setProducts(data.list);
    };

    fetchData();
  }, []);

  return (
    <div>
      <section>
        <TitleSection
          titleText={"판매 중인 상품"}
          buttonStyle={
            <Link
              href="/items/create"
              className="w-43 h-11 font-semibold text-gray-100 rounded-lg bg-primary-100 flex justify-center items-center"
            >
              상품 등록하기
            </Link>
          }
        />
      </section>
      <section className="pb-4">
        <SearchBar
          inputValueState={searchValueState}
          onChangeInput={handleChangeSearchValue}
          sortButtonState={sortButtonState}
          setSortButtonState={setSortButtonState}
        />
      </section>

      <section>
        <div className="w-full grid grid-cols-2 grid-rows-2 gap-2 justify-around ">
          {products?.map((product: Product) => {
            return (
              <Link key={product.id} href={`/items/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
