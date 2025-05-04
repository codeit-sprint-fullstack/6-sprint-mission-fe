import React from "react";
import SerchInputForm from "../../../components/SerchInputForm";
import SortDropdown from "../../../components/SortDropDown";
import Link from "next/link";

function TopSection({
  widthSize,
  inputValue,
  setInputValue,
  setSortOption,
  sortOption,
}) {
  return (
    <>
      {widthSize >= 744 ? (
        <div className="w-full h-[2.625rem] flex flex-row items-center justify-between gap-4">
          <h1 className="flex-shrink-0 text-xl font-bold whitespace-nowrap">
            판매 중인 상품
          </h1>
          <div className="flex-1 min-w-0 max-w-[600px] flex flex-row items-center justify-between gap-[0.75rem]">
            <SerchInputForm
              inputValue={inputValue}
              setInputValue={setInputValue}
              onSubmit={(value) => {
                setInputValue(value);
                setCurrentPage(1); // 엔터 시 첫 페이지로 이동
              }}
              className="flex-1 min-w-0"
            />
            <Link href={"/items/registration"}>
              <button className="btn-primary flex-shrink-0">
                상품 등록하기
              </button>
            </Link>
            <SortDropdown
              className="flex-shrink-0"
              onChange={(value) => setSortOption(value)}
              value={sortOption}
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-[2.625rem] flex items-center justify-between ">
            <h1 className="text-xl font-bold whitespace-nowrap">
              판매 중인 상품
            </h1>
            <Link href="/registratiopn">
              <button className="h-full btn-primary">상품 등록하기</button>
            </Link>
          </div>
          <div className="w-full h-[2.625rem] flex items-center justify-between gap-[1rem]">
            <SerchInputForm
              inputValue={inputValue}
              setInputValue={setInputValue}
              onSubmit={(value) => {
                setInputValue(value);
                setCurrentPage(1);
              }}
            />
            <SortDropdown
              onChange={(value) => setSortOption(value)}
              value={sortOption}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default TopSection;
