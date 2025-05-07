"use client";

import React, { useEffect, useState } from "react";
import ItemInput from "../../_components/ItemInput";
import ItemTextarea from "../../_components/ItemTextarea";
import TagInput from "../../_components/TagInput";
import ImageInput from "../../_components/ImageInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getItem, patchItem } from "@/api/itemApi";
import { useParams, useRouter } from "next/navigation";

const page = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemIntro, setItemIntro] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemTags, setItemTags] = useState([]);

  const { id: productId } = useParams();
  const router = useRouter();

  const { data, isPending, error } = useQuery({
    queryKey: ["product"],
    queryFn: () => getItem(productId),
  });

  const { mutate, isPending: loading } = useMutation({
    mutationFn: patchItem,
    onSuccess: () => {
      router.push(`/items/${productId}`);
    },
    onError: (e) => {
      console.log("실패", e);
    },
  });

  useEffect(() => {
    if (data) {
      setSelectedImg(data.images[0]);
      setItemName(data.name);
      setItemIntro(data.description);
      setItemPrice(data.price);
      setItemTags(data.tags);
    }
  }, [data]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleClick = () => {
    mutate({
      productId,
      data: {
        selectedImg,
        itemTags,
        itemPrice,
        itemIntro,
        itemName,
      },
    });
  };

  return (
    <section className="max-w-[744px] mx-auto pt-[24px] px-[16px] pb-[120px] m:max-w-[1200px]">
      <article className="flex flex-col gap-[24px]">
        <div className="flex items-center justify-between">
          <p className="text-[20px] font-[700] text-[#1f2937]">상품 등록하기</p>
          <button
            className="w-[74px] h-[42px] rounded-[8px] text-white bg-[#9ca3af] cursor-pointer"
            onClick={handleClick}
          >
            등록
          </button>
        </div>
        <ImageInput setState={setSelectedImg} state={selectedImg} />
        <ItemInput
          placeholder="상품명을 입력해주세요"
          name="상품명"
          state={itemName}
          setState={setItemName}
        />
        <ItemTextarea state={itemIntro} setState={setItemIntro} />
        <ItemInput
          placeholder="판매 가격을 입력해주세요"
          name="판매가격"
          state={itemPrice}
          setState={setItemPrice}
        />
        <div>
          <TagInput
            placeholder="태그를 입력해주세요"
            name="태그"
            setState={setItemTags}
            state={itemTags}
          />
        </div>
      </article>
    </section>
  );
};

export default page;
