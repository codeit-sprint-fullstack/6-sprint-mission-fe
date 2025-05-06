"use client";

import React, { useEffect, useState } from "react";
import Item from "./_components/item.jsx";
import { useParams } from "next/navigation";
import { getItemById } from "@/api/items.js";
import ProductComments from "@/components/layout/ProductComments.jsx";
import Button from "@/components/Button.jsx";
import Link from "next/link.js";

function ItemPage() {
  const [item, setItem] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItemById(id);
        setItem(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchItem();
  }, [id]);

  return (
    <main className="p-[32px] lg:px-[200px] flex flex-col gap-[32px] mb-[200px]">
      <Item key={item.id} item={item} />
      <hr className="text-gray-200" />
      {item.id && <ProductComments itemId={item.id?.toString()} />}
      <Link href="/items" className="self-center">
        <Button size="xl" rounded reset>
          목록으로 돌아가기
        </Button>
      </Link>
    </main>
  );
}

export default ItemPage;
