"use client";

import React, { useEffect, useState } from "react";
import ItemHeader from "./ItemHeader";
import ItemDetail from "./ItemDetail";
import UserInfo from "@/components/ui/UserInfo";
import LineDivider from "@/components/ui/LineDivider";
import { getProduct } from "@/lib/productApi";
import { useParams } from "next/navigation";
import defaultImg from "../../../../../../public/assets/img/img_item_default.svg";

function ItemContainer() {
  const [item, setItem] = useState();
  const params = useParams();

  const getProductById = async () => {
    try {
      const data = await getProduct(params.id);
      setItem(data);
    } catch (error) {
      console.error("상품 조회 실패:", error);
    }
  };

  useEffect(() => {
    if (params?.id) {
      getProductById();
    }
  }, [params]);

  return (
    <section className="md:grid grid-cols-2 gap-4 lg:grid-cols-[1fr_2fr]">
      <img
        src={
          item?.images?.[0] && item.images[0].length > 0
            ? item.images[0]
            : defaultImg.src
        }
        alt="상품 이미지"
        className="rounded-xl mb-4 w-full"
      />
      {item && (
        <div>
          <ItemHeader item={item} />
          <LineDivider />
          <ItemDetail item={item} />
          <UserInfo item={item} isItemPage={true} />
        </div>
      )}
    </section>
  );
}

export default ItemContainer;
