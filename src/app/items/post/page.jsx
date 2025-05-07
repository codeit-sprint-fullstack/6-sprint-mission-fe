import React from "react";

const page = () => {
  return (
    <div className="max-w-[1200px] w-full mt-6 mx-auto">
      <div className="flex items-center justify-between">
        <p className="text-[20px] font-bold">상품 등록하기</p>
        <button className="w-[74px] h-[42px] bg-gray-400 text-white rounded-lg cursor-pointer">
          등록
        </button>
      </div>

      <div className="flex flex-col gap-8 my-6 mb-40">
        <label className="flex flex-col gap-4">
          <p className="text-[18px] font-bold">상품명</p>
          <input
            type="text"
            placeholder="상품명을 입력해주세요"
            className="w-full h-[56px] rounded-xl bg-gray-100 pl-6 outline-none"
          />
        </label>

        <label className="flex flex-col gap-4">
          <p className="text-[18px] font-bold">상품 소개</p>
          <textarea
            placeholder="상품 소개를 입력해주세요"
            className="w-full h-[282px] rounded-xl bg-gray-100 resize-none p-4 pt-4 pl-6 outline-none"
          />
        </label>

        <label className="flex flex-col gap-4">
          <p className="text-[18px] font-bold">판매가격</p>
          <input
            type="text"
            placeholder="판매 가격을 입력해주세요"
            className="w-full h-[56px] rounded-xl bg-gray-100 pl-6 outline-none"
          />
        </label>

        <label className="flex flex-col gap-4">
          <p className="text-[18px] font-bold">태그</p>
          <input
            type="text"
            placeholder="태그를 입력해주세요"
            className="w-full h-[56px] rounded-xl bg-gray-100 pl-6 outline-none"
          />
        </label>
      </div>
    </div>
  );
};

export default page;
