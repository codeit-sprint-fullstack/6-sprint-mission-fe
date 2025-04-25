"use client";

import Button from "@/components/ui/common-UI/Button";
import InputField from "@/components/ui/login-signup/InputField";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { checkTokenExp, ckTokenExp } from "../../../../utils/ckTokenExp";
import DetailProduct from "./DetailProduct";

function ItemDetail() {
  // 미인증은 로그인으로 리다이렉트
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const isTokenValid = checkTokenExp();
    if (!isTokenValid) {
      router.push("/login");
    }

    //디버깅
    console.log("isTokenValid", isTokenValid);
  }, []);

  return (
    <div className="flex flex-col items-center mt-[94px]">
      <div className="flex-1">
        <DetailProduct id={id} />
        <div className="flex flex-col items-end">
          <InputField
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            height="h-[104px]"
            width="w-[1200px]"
            label="문의하기"
            // value={content}
            // onChange={handleContent}
          />

          <Button
            text={"등록"}
            // onClick={handlePost}
            // disabled={!content}
            width={"w-[74px]"}
            height={"h-[42px]"}
          />
        </div>
        {/* <Comments
          articleId={articleId}
        refreshTrigger={refreshTrigger}
        /> */}
        <div className="flex justify-center mt-[64px]">
          <Button
            text={"목록으로 돌아가기"}
            disabled={false}
            width={"w-[240px]"}
            height={"h-[48px]"}
            rounded={"rounded-[40px]"}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
