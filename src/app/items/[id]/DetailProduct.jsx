"use client";

import React, { useEffect, useState } from "react";
import MoreToggle from "../../../components/ui/common-UI/MoreToggle";
import {
  cancelLikeProduct,
  deleteProduct,
  getProduct,
  likeProduct,
} from "@/lib/product";
import { useRouter } from "next/navigation";
import PatchProduct from "@/components/ui/product/PatchProduct";

function DetailProduct({ id, accessToken }) {
  const [productData, setProductData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isLike, setIsLike] = useState(false); //좋아요 버튼

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

  const handleclickLike = async () => {
    try {
      if (isLike) {
        await cancelLikeProduct(id, accessToken);
        setProductData((prevData) => ({
          ...prevData,
          favoriteCount: prevData.favoriteCount - 1,
        }));
      } else {
        await likeProduct(id, accessToken);
        setProductData((prevData) => ({
          ...prevData,
          favoriteCount: prevData.favoriteCount + 1,
        }));
      }

      setIsLike((prev) => !prev);
    } catch (e) {
      console.log("좋아요 토글 실패", e);
    }
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
        <div className="flex flex-row justify-center items-center w-[87px] h-[40px] gap-[4px] border border-seven rounded-[35px]">
          <img
            className="w-[32px] h-[32px]"
            src={
              isLike ? "/image/ui/likedHeart.png" : "/image/ui/likeHeart.png"
            }
            onClick={handleclickLike}
          />
          <div>{productData.favoriteCount}</div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
