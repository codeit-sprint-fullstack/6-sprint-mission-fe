import Image from "next/image";
import React from "react";
import InputIcon from "../../assets/돋보기.png";

const SerchInputForm = ({ inputValue, setInputValue, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(inputValue); // Market으로 최종 검색어 넘기기
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex items-center bg-secondary pl-4 py-2 rounded-md">
        <Image src={InputIcon} width={16} height={16} alt="돋보기" />
        <input
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full bg-transparent outline-none ml-1 text-base leading-[26px] font-normal font-pretendard placeholder:text-gray-400"
        />
      </div>
    </form>
  );
};

export default SerchInputForm;
