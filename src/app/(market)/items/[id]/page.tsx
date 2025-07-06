import React from "react";
import ItemContainer from "./_components/ItemContainer";
import GoBackBtn from "@/components/ui/GoBackBtn";
import LineDivider from "@/components/ui/LineDivider";
import CommentSection from "../../_components/CommentSection";

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const itemId = Number(id);

  return (
    <>
      <ItemContainer id={itemId} />
      <LineDivider my={6} />
      <CommentSection id={itemId} type="product" />
      <GoBackBtn isItemPage={true} />
    </>
  );
}
