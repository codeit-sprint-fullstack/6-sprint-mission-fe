import React from "react";
import ItemContainer from "./_components/ItemContainer";
import GoBackBtn from "@/components/ui/GoBackBtn";
import CommentForm from "../../_components/CommentForm";
import CommentList from "../../_components/CommentList";
import LineDivider from "@/components/ui/LineDivider";

function ItemPage() {
  return (
    <>
      <ItemContainer />
      <LineDivider my={6} />
      <CommentForm isItemPage={true} />
      <CommentList isItemPage={true} />
      <GoBackBtn isItemPage={true} />
    </>
  );
}

export default ItemPage;
