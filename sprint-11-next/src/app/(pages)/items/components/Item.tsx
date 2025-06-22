import React from "react";
import defalutItem from "../../../../assets/defalut-item.png";
import likebt from "../../../../assets/likebt.png";
import Image from "next/image";

interface Data {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  favoriteCount: number;
  ownerId: number;
  ownerNickname: string;
  createdAt: string;
}

function Item({ data }: { data: Data }) {
  const firstImage = data.images?.[0];

  // ✅ 유효한 이미지인지 체크
  const isValidImage =
    typeof firstImage === "string" &&
    firstImage.trim() !== "" &&
    !firstImage.includes("example.com"); // 🔥 예시 도메인은 무시

  // ✅ 절대 URL인지 확인
  const isAbsoluteUrl = isValidImage && /^https?:\/\//.test(firstImage);

  const imageUrl = isValidImage
    ? isAbsoluteUrl
      ? firstImage // 절대 URL은 그대로 사용
      : `http://localhost:5000${firstImage}` // 상대 경로면 백엔드 도메인 붙이기
    : defalutItem; // 없으면 기본 이미지
  return (
    <div className="flex flex-col gap-[1rem] items-center w-[10.5rem] md:w-[13.75rem]">
      <Image
        src={imageUrl} //data.images?.[0]??
        width={220}
        height={220}
        alt={"디폴트이미지"}
      />

      <div className="w-full flex flex-col gap-[0.5rem] items-start">
        <p className="text-sm font-semibold h-[1.5rem]">{data.name}</p>
        <p className="h-[1.5rem] font-extrabold">
          {new Intl.NumberFormat("ko-KR").format(data.price)}원
        </p>
        <div className="flex flex-row gap-[0.25rem]">
          <Image src={likebt} width={16} height={10} alt={"디폴트조아요"} />
          <p>{data.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Item;
