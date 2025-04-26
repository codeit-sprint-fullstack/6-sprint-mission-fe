import { getProducts } from "@/lib/getApi";
import React from "react";
import BestItemList from "./_components/BestItemList";
import ItemList from "./_components/ItemList";

async function ItemsPage() {
  const data = await getProducts();
  const items = data.list;

  return (
    <div>
      <BestItemList items={items} />
      <ItemList items={items} />
    </div>
  );
}

export default ItemsPage;
