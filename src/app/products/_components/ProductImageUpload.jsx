import Image from "next/image";
import React from "react";
import ic_plus from "@/assets/images/products/ic_plus.svg";

export default function ProductImageUpload() {
  {
    /* TODO: 이미지 미리보기 작업 
      const [preview, setPreview] = useState(null);

      const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const imageUrl = URL.createObjectURL(file); // 미리보기용 URL 생성
      setPreview(imageUrl);
      };*/
  }
  return (
    <div className="flex flex-col gap-[16px]">
      <p className="font-bold text-[18px]/[26px]">상품 이미지</p>
      <label
        htmlFor="image"
        className="flex justify-center items-center w-[168px] h-[168px] rounded-[12px] bg-secondary-gray-100 hover:bg-secondary-gray-200 cursor-pointer md:w-[282px] md:h-[282px]"
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
          type="file"
          accept="image/*"
          className="hidden h-[56px] bg-secondary-gray-100 border-transparent rounded-[12px] outline-none py-[16px] px-[24px] text-[16px] font-normal placeholder-secondary-gray-300"
        />
      </label>
      {/* <img src={preview} alt="이미지 미리보기" /> */}
    </div>
  );
}
