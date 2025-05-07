import React from "react";
import ItemContainer from "./_components/ItemContainer";
import GoBackBtn from "@/components/ui/GoBackBtn";
import LineDivider from "@/components/ui/LineDivider";
import CommentSection from "../../_components/CommentSection";

async function ItemPage({ params }) {
  const { id } = await params;

  return (
    <>
      <ItemContainer id={id} />
      <LineDivider my={6} />
      <CommentSection id={id} type="product" />
      <GoBackBtn isItemPage={true} />
    </>
  );
}

export default ItemPage;
