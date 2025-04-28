"use client";

import React, { useEffect, useState } from "react";
import MoreToggle from "../../../components/ui/common-UI/MoreToggle";
import { deleteProduct, getProduct, getProducts } from "@/lib/product";
import { useRouter } from "next/navigation";

function DetailProduct({ id, accessToken, refreshComments }) {
  const [productData, setProductData] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const router = useRouter();

  //디버깅
  console.log("id", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct(id);

        //디버깅
        console.log("data", data);

        setProductData(data);
      } catch (e) {
        console.error("상품 정보 로딩 실패", e);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [id]);

  const handleProductPatch = () => {
    //디버깅
    console.log("patched");
    // refreshComments();

    router.push(`items/${id}/edit`);
  };

  const handleProductDelete = async () => {
    //디버깅
    console.log("dleted");
    alert("정말 삭제하시겠습니까?");

    await deleteProduct(id, accessToken);
    router.push("/items");
  };

  if (isPending) return <div> 상품 정보 로딩 중...</div>;

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
