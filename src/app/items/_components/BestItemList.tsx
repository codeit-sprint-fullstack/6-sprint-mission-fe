"use client";

import React, { useEffect, useState } from "react";
import { getAllItems } from "@/lib/api/item";
import BestItem from "./BestItem";
import Link from "next/link";
import { TItem } from "@/types";

function BestItemList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<TItem[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const fetchItems = async () => {
    const search = "";
    const order = "favorite";
    const data: TItem[] = await getAllItems(search, order);
    setItems(data);
    setIsLoading(false);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const getCount = () => {
    if (windowWidth >= 1280) return 4;
    if (windowWidth >= 768) return 2;
    return 1;
  };

  useEffect(() => {
    fetchItems();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-xl">베스트 아이템</p>
      <div className="flex gap-6 justify-center">
        {isLoading ? (
          <p>로딩중...</p>
        ) : (
          items.slice(0, getCount()).map((item) => (
            <Link href={`/items/${item.id}`} key={item.id}>
              <BestItem item={item} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default BestItemList;
