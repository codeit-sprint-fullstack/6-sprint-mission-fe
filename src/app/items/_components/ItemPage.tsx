"use client";
import React, { useState } from "react";
import ItemHeader from "./ItemHeader";
import ItemList from "./ItemList";
import BestItemList from "./BestItemList";

function ItemPage() {
  const [order, setOrder] = useState<"recent" | "favorite">("recent");
  const [search, setSearch] = useState<string>("");
  return (
    <div className="flex flex-col gap-2">
      <BestItemList />
      <ItemHeader setOrder={setOrder} setSearch={setSearch} />
      <ItemList order={order} search={search} />
    </div>
  );
}

export default ItemPage;
