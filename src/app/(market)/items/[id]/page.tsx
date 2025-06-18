import React from "react";
import ItemContainer from "./_components/ItemContainer";
import GoBackBtn from "@/components/ui/GoBackBtn";
import LineDivider from "@/components/ui/LineDivider";
import CommentSection from "../../_components/CommentSection";

export default async function ItemPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  return (
    <>
      <ItemContainer id={id} />
      <LineDivider my={6} />
      <CommentSection id={id} type="product" />
      <GoBackBtn isItemPage={true} />
    </>
  );
}
