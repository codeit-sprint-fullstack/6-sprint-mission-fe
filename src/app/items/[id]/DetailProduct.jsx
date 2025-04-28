"use client";

import React, { use, useEffect, useState } from "react";
import MoreToggle from "../../../components/ui/common-UI/MoreToggle";
import { deleteProduct, getProduct, getProducts } from "@/lib/product";
import { useRouter } from "next/navigation";
import PatchProduct from "@/components/ui/product/PatchProduct";

function DetailProduct({ id, accessToken, refreshComments }) {
  const [productData, setProductData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const data = await getProduct(id);

      setProductData(data);
    } catch (e) {
      console.error("상품 정보 로딩 실패", e);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleProductPatch = () => {
    setIsEdit(true);
  };

  const handleProductDelete = async () => {
    alert("정말 삭제하시겠습니까?");

    await deleteProduct(id, accessToken);
    router.push("/items");
  };

  if (isPending) return <div> 상품 정보 로딩 중...</div>;

  if (isEdit)
    return (
      <PatchProduct
        data={productData}
        accessToken={accessToken}
        productId={id}
      />
    );

  return (
    <div className="pt-[94px] flex flex-row  gap-[24px]">
      <img src={productData.images} className="w-[486px] h-[486px]" />

      <div className="w-[690px] h-[496px] flex flex-col">
        <div>
          <div>
            <div>{productData.name}</div>
            <MoreToggle
              onPatch={handleProductPatch}
              onDelete={handleProductDelete}
            />
          </div>
          <div>{productData.price}원</div>
        </div>

        <div>상품 소개</div>
        <div>{productData.description}</div>

        <div>상품 태그</div>
        <div>{productData.tag}</div>

        <img src="/image/login/profile.png" className="w-[40px] h-[40px]" />
        <div>
          <div>{productData.ownerNickname}</div>
          <div>{productData.createdAt}</div>
        </div>
        <div>{productData.favoriteCount}</div>
      </div>
    </div>
  );
}

export default DetailProduct;
