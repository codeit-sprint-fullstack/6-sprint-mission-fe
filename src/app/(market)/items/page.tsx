import React from "react";
import BestItemList from "./_components/BestItemList";
import ItemList from "./_components/ItemList";

async function ItemsPage() {
  return (
    <div>
      <BestItemList />
      <ItemList />
    </div>
  );
}

export default ItemsPage;
