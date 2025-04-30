"use client";

import Button from "@/components/ui/common-UI/Button";
import InputField from "@/components/ui/login-signup/InputField";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { checkTokenExp } from "../../../../utils/checkTokenExp";
import DetailProduct from "./DetailProduct";
import ProductComments from "@/components/ui/product/productComments";
import { postProductComment } from "@/lib/commentProduct";

function ItemDetail() {
  const [askContent, setAskContent] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const accessToken = localStorage.getItem("accessToken");

  // 미인증은 로그인으로 리다이렉트
  useEffect(() => {
    const isTokenValid = checkTokenExp();
    if (isTokenValid) {
      setIsTokenChecked(true);
    } else {
      localStorage.removeItem("accessToken");
      router.push("/login");
    }
  }, []);

  //Author만 UD 기능 사용할 수 있도록
  const currentUser = localStorage.getItem("userId");

  //CUD시 화면 반영을 위한 트리거
  const refreshComments = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  if (!id || !isTokenChecked) {
    return <div>상품 불러오는 중...</div>;
  }

  const handlePost = async () => {
    try {
      await postProductComment(id, accessToken, askContent);
      setAskContent("");
      refreshComments();
    } catch (e) {
      console.error("댓글 등록 중 에러 발생", e);
    }
  };

  return (
    <div className="flex flex-col items-center mt-[94px]">
      <div className="flex-1">
        <DetailProduct
          id={id}
          accessToken={accessToken}
          refreshComments={refreshComments}
          currentUser={currentUser}
        />

        <div className="flex flex-col items-end gap-[10px] mt-[40px]">
          <InputField
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            height="h-[104px]"
            width="w-[1200px]"
            label="문의하기"
            value={askContent}
            onChange={(e) => setAskContent(e.target.value)}
          />

          <Button
            text={"등록"}
            onClick={handlePost}
            disabled={!askContent}
            width={"w-[74px]"}
            height={"h-[42px]"}
          />
        </div>

        <ProductComments
          productId={id}
          accessToken={accessToken}
          refreshTrigger={refreshTrigger}
          limit={4}
        />

        <div className="flex justify-center mt-[64px] mb-[173px]">
          <Button
            text={"목록으로 돌아가기"}
            disabled={false}
            onClick={() => {
              router.push("/items");
            }}
            width={"w-[240px]"}
            height={"h-[48px]"}
            rounded={"rounded-[40px]"}
            image="/image/ui/goBack.png"
          />
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
