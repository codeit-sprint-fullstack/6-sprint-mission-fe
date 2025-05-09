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

function DetailProduct({ id, accessToken, currentUser }) {
  const [productData, setProductData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isLike, setIsLike] = useState(null); //좋아요 버튼

  const router = useRouter();

  const fetchData = async () => {
    try {
      const data = await getProduct(id);

      setProductData(data);

      //디버깅
      console.log("data", data.product.price);

      setIsLike(data.isFavorite);
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

  //createdAt prettier
  const formattedCreatedAt =
    // new Intl.DateTimeFormat("ko-KR", {
    //   year: "numeric",
    //   month: "2-digit",
    //   day: "2-digit",
    // }).format(new Date(productData.createdAt));
    productData.createdAt && !isNaN(new Date(productData.createdAt))
      ? new Intl.DateTimeFormat("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(productData.createdAt))
      : "날짜 없음";

  return (
    <div className="flex flex-row pb-[40px] border-b-1 border-seven gap-[24px] font-pretendard">
      <img
        src={productData.images}
        className="w-[486px] h-[486px] rounded-[16px] by-[5px]"
      />

      <div className="w-[690px] h-[496px] flex flex-col justify-between">
        <div className="flex flex-col h-[112px] justify-between pb-[16px] border-b-1 border-seven">
          <div className="flex flex-row justify-between">
            <div className="text-[24px] font-semibold">{productData.name}</div>
            {productData.ownerId === Number(currentUser) && (
              <MoreToggle
                onPatch={handleProductPatch}
                onDelete={handleProductDelete}
              />
            )}
          </div>
          <div className="text-[40px] font-semibold">
            {productData.product.price.toLocaleString()}원
          </div>
        </div>

        <div className="flex flex-col justify-center pt-[24px] pb-[62px]">
          <div className="text-[16px] font-semibold pb-[16px]">상품 소개</div>
          <div>{productData.description}</div>

          <div className="text-[16px] font-semibold pt-[24px] pb-[16px]">
            상품 태그
          </div>
          <div className="flex flex-row gap-[8px] h-[36px]">
            {productData.product.tags.map((tag, index) => (
              <div
                key={`${tag}-${index}`}
                className="flex items-center rounded-[26px] bg-third px-[16px] py-[5px]"
              >
                # {tag}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div className="flex justify-center gap-[16px]">
            <img src="/image/login/profile.png" className="w-[40px] h-[40px]" />
            <div className="flex flex-col justify-between">
              <div>{productData.ownerNickname}</div>
              <div>{formattedCreatedAt}</div>
            </div>
          </div>

          <div className="border-l-1 border-seven  pl-[24px]">
            <div className="flex flex-row justify-center items-center w-[87px] h-[40px] gap-[4px] border border-seven rounded-[35px]">
              <img
                className="w-[32px] h-[32px] cursor-pointer"
                src={
                  isLike
                    ? "/image/ui/likedHeart.png"
                    : "/image/ui/likeHeart.png"
                }
                onClick={handleclickLike}
              />
              <div>{productData.favoriteCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
