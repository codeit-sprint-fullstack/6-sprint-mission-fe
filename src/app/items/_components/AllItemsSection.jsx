"use client";
import Button from "@/components/ui/Button";
import DropdownMenu from "@/components/ui/DropdownMenu";
import SearchInput from "@/components/ui/SearchInput";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import PaginationBar from "@/components/ui/PaginationBar";
import { getProducts } from "@/api/items";

export default function AllItemsSection() {
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20); // fixed size
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [itemsList, setItemsList] = useState([]);
  const [word, setWord] = useState("");

  const fetchSortedData = async ({ orderBy, page, pageSize, word }) => {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const products = await getProducts({
      orderBy,
      skip,
      take,
      word: word ? word : undefined,
    });

    setItemsList(products.data);
    setTotalPageNum(Math.ceil(products.count / pageSize));
  };

  useEffect(() => {
    fetchSortedData({ orderBy, page, pageSize, word });
  }, [orderBy, page, word]);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 w-full h-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-secondary-900 font-bold text-xl leading-8">
          판매 중인 상품
        </h1>
        <Link href="items/create">
          <Button className="w-[133px]">상품 등록하기</Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <SearchInput value={word} onChange={(e) => setWord(e.target.value)} />
        <DropdownMenu orderBy={orderBy} onSortChange={setOrderBy} />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 w-full">
        {itemsList.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      <PaginationBar
        totalPageNum={totalPageNum}
        activePageNum={page}
        onPageChange={onPageChange}
      />
    </div>
  );
}
