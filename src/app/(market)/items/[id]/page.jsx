import React from "react";
import ItemContainer from "./_components/ItemContainer";
import GoBackBtn from "@/components/ui/GoBackBtn";
import LineDivider from "@/components/ui/LineDivider";
import CommentSection from "../../_components/CommentSection";
import { getProduct } from "@/lib/getApi";

async function ItemPage({ params }) {
  const { id } = await params;
  const data = await getProduct(id);

  return (
    <>
      <ItemContainer id={id} data={data} />
      <LineDivider my={6} />
      <CommentSection id={id} type="product" />
      <GoBackBtn isItemPage={true} />
    </>
  );
}

export default ItemPage;
