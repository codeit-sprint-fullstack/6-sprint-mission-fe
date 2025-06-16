"use client";

import { FaCaretDown, FaSortAmountDown } from "react-icons/fa";
import Link from "next/link";
import useDeviceType from "@/hooks/common/useDeviceType";
import Pagination from "@/components/common/Pagination";
import { useProducts } from "@/hooks/Products/useProducts";
import type { Product as ProductType } from "@/types/product";
import Product from "./Product";

const COMMON_ITEM_HEIGHT = 220;

const ORDER_LIST = ["최신순", "좋아요순"];

const CommonProductList = () => {
  const { isMobile } = useDeviceType();

  const {
    products,
    isLoading,
    error,
    pagination,
    orderBy,
    keyWord,
    isDropdownOpen,
    handleKeywordChange,
    handleOrderChange,
    toggleDropdown,
  } = useProducts({
    pageSize: 10,
    orderBy: ORDER_LIST[0] === "최신순" ? "recent" : "likes",
  });

  return (
    <div className="relative h-full w-full">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className={isMobile ? "mb-2.5 flex w-full justify-between" : ""}>
          <span className="self-center text-[1.4rem] font-bold">
            판매 중인 상품
          </span>
          {isMobile && (
            <Link href="/registration">
              <button className="flex h-full w-[150px] cursor-pointer items-center justify-center rounded-lg border-none bg-[#3692ff] p-[15px] text-[#ffffff] transition-colors duration-200 hover:bg-[#1967d6]">
                상품 등록하기
              </button>
            </Link>
          )}
        </div>
        <div className="flex h-[42px] w-full justify-end gap-2.5 md:w-1/2">
          <input
            className="h-full w-full rounded-xl border-none bg-[#f3f4f6] p-5 focus:outline-none md:w-[330px]"
            value={keyWord}
            onChange={handleKeywordChange}
            type="text"
            placeholder="검색어를 입력해주세요."
          />
          {!isMobile && (
            <Link href="/items/registration">
              <button className="flex h-full w-[150px] min-w-[120px] cursor-pointer items-center justify-center rounded-lg border-none bg-[#3692ff] p-[15px] text-[#ffffff] transition-colors duration-200 hover:bg-[#1967d6]">
                상품 등록하기
              </button>
            </Link>
          )}
          <div className="relative">
            <button
              className="flex h-full w-[60px] cursor-pointer items-center justify-center rounded-lg border border-[#e5e7eb] bg-[#ffffff] p-5 md:w-[130px] md:justify-between"
              onClick={toggleDropdown}
            >
              {isMobile ? (
                <FaSortAmountDown />
              ) : (
                <>
                  <span className="text-base">
                    {orderBy === "recent" ? "최신순" : "좋아요순"}
                  </span>
                  <FaCaretDown className="text-[1.2rem]" />
                </>
              )}
            </button>
            {isDropdownOpen && (
              <ul className="absolute right-0 z-10 mt-2.5 rounded-xl border border-[#e5e7eb] bg-[#ffffff]">
                <li
                  onClick={() => handleOrderChange("recent")}
                  className="flex h-[42px] w-[130px] cursor-pointer items-center justify-center border-b border-[#e5e7eb]"
                >
                  최신순
                </li>
                <li
                  onClick={() => handleOrderChange("likes")}
                  className="flex h-[42px] w-[130px] cursor-pointer items-center justify-center"
                >
                  좋아요순
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-5 flex justify-center">로딩 중...</div>
      ) : error ? (
        <div className="mt-5 flex justify-center text-red-500">
          데이터를 불러오는 중 오류가 발생했습니다.
        </div>
      ) : products.length === 0 ? (
        <div className="mt-5 flex justify-center">상품이 없습니다.</div>
      ) : (
        <ul className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {products.map((item: ProductType) => (
            <Product key={item.id} height={COMMON_ITEM_HEIGHT} {...item} />
          ))}
        </ul>
      )}

      <Pagination
        totalPage={pagination.totalPages}
        currentPage={pagination.currentPage}
        setCurrentPage={pagination.setCurrentPage}
        loading={isLoading}
      />
    </div>
  );
};

export default CommonProductList;
