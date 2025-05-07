"use client";

import Images from "@/components/ui/Images";
import React from "react";

const ImageInput = ({ setState, state }) => {
  const handleChangeImg = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <p className="text-[18px] font-[700] text-[#1f2937] mb-[16px]">
        상품 이미지
      </p>
      <div className="flex items-center gap-[10px]">
        <input
          type="file"
          accept="image/*"
          onChange={handleChangeImg}
          id="uploadInput"
          className="hidden"
        />
        <label htmlFor="uploadInput" className="cursor-pointer">
          <Images
            src={"/upload.png"}
            w={"w-[168px]"}
            h={"h-[168px]"}
            alt={"upload"}
          />
        </label>
        {state && (
          <div className="relative">
            <img src={state} alt="img" className="w-[168px] h-[168px]" />
            <img
              src="/xBtn.png"
              alt="x"
              className="absolute top-[12px] right-[12px] cursor-pointer"
              onClick={() => setState(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageInput;
