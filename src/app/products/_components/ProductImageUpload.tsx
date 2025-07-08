import Image from "next/image";
import React, { ChangeEvent } from "react";
import ic_plus from "@/assets/images/products/ic_plus.svg";
import ic_cancel from "@/assets/images/products/ic_cancel.svg";
import img_default_product from "@/assets/images/products/img_default_product.svg";

type TProductImageUploadBody = {
  images: { file: File; url: string }[];
  name: string;
  description: string;
  price: string | number;
  tags: string[];
};

interface IProductImageUploadProps {
  body: TProductImageUploadBody;
  changeValue: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  deleteImage: (value: { file: File; url: string }) => void;
}

export default function ProductImageUpload({
  body,
  changeValue,
  deleteImage,
}: IProductImageUploadProps) {
  return (
    <div className="flex flex-col gap-[16px]">
      <p className="font-bold text-[18px]/[26px]">상품 이미지</p>
      <div className="flex justify-start items-center overflow-auto gap-[7px] sm:gap-[10px] md:gap-[24px]">
        <label
          htmlFor="image"
          className="flex justify-center items-center min-w-[168px] min-h-[168px] rounded-[12px] bg-secondary-gray-100 hover:bg-secondary-gray-200 cursor-pointer md:min-w-[282px] md:min-h-[282px]"
        >
          <div className="flex flex-col justify-center items-center gap-[12px]">
            <div className="relative w-[48px] h-[48px]">
              <Image src={ic_plus} alt="업로드" fill className="object-cover" />
            </div>
            <p className="font-normal text-[16px]/[26px] text-secondary-gray-300">
              이미지 등록
            </p>
          </div>
          <input
            id="image"
            name="imageFiles"
            type="file"
            multiple
            accept="image/*"
            onChange={changeValue}
            className="hidden h-[56px] bg-secondary-gray-100 border-transparent rounded-[12px] outline-none py-[16px] px-[24px] text-[16px] font-normal placeholder-secondary-gray-300"
          />
        </label>
        {body.images.length !== 0 &&
          body.images.map((image, i) => (
            <div className="relative" key={`${i}_${image}`}>
              <div className="relative min-w-[168px] min-h-[168px] max-w-[168px] max-h-[168px] md:min-w-[282px] md:min-h-[282px]">
                <Image
                  src={!!image.url ? image.url : img_default_product}
                  alt="이미지 미리보기"
                  fill
                  className="object-cover rounded-[12px]"
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteImage(image);
                }}
                className="absolute top-[14px] right-[14px] flex justify-center items-center w-[20px] h-[20px] rounded-full bg-secondary-gray-300 hover:bg-primary-100 cursor-pointer"
              >
                <div className="relative w-[10px] h-[10px]">
                  <Image
                    src={ic_cancel}
                    alt="취소"
                    fill
                    className="object-cover"
                  />
                </div>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
