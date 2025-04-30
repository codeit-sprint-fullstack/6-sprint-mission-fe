"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { productService } from "@/lib/services/api/productService";
import ProductCard from "@/app/(main)/(item)/items/_components/ProductCard";
import TitleSection from "../ui/TitleSection";
import SearchBar from "../ui/SearchBar";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [searchValueState, setSearchValueState] = useState("");

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
      <section className="pb-4" Z>
        <SearchBar
          inputValueState={searchValueState}
          onChangeInput={setSearchValueState}
        />
      </section>

      <section>
        <div className="w-full grid grid-cols-2 grid-rows-2 gap-2 justify-around ">
          {products?.map((product) => {
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
