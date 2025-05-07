"use client";

import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaCaretDown, FaSortAmountDown } from "react-icons/fa";
import useDeviceType from "@/hooks/common/useDeviceType";

const ORDER_LIST = ["최신순", "좋아요순"];

/**
 * 검색 및 정렬 기능을 제공하는 컴포넌트
 * @param {function} onSearchChange - 디바운싱 적용된 검색어 변경 핸들러
 * @param {function} onOrderChange - 정렬 방식 변경 핸들러
 */
export default function SearchSortBar({ onSearchChange, onOrderChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(ORDER_LIST[0]);
  const [inputValue, setInputValue] = useState("");
  const { isMobile } = useDeviceType();

  /** 검색어 입력 핸들러 (디바운싱은 상위에서 처리) */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSearchChange(value);
  };

  /** 정렬 드롭다운 toggle */
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  /** 정렬 방식 선택 핸들러 */
  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setIsOpen(false);
    onOrderChange?.(order);
  };

  return (
    <div className="flex h-[42px] w-full items-center gap-4">
      {/* 검색 입력창 */}
      <div className="relative w-full">
        <IoSearch className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={inputValue}
          onChange={handleSearchChange}
          placeholder="검색할 상품을 입력해주세요."
          className="w-full rounded-xl border-none bg-gray-100 py-3 pr-4 pl-12 text-[16px] focus:outline-none"
        />
      </div>

      {/* 정렬 드롭다운 */}
      <div className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white px-4 md:w-[120px] md:justify-between"
        >
          {isMobile ? (
            <FaSortAmountDown className="scale-125 scale-x-[-1]" />
          ) : (
            <>
              <span className="text-[1rem]">{selectedOrder}</span>
              <FaCaretDown className="text-[1.2rem]" />
            </>
          )}
        </button>

        {isOpen && (
          <ul className="absolute right-0 z-10 mt-2 w-[120px] rounded-xl border border-gray-200 bg-white shadow-md">
            {ORDER_LIST.map((order, idx) => (
              <li
                key={order}
                onClick={() => handleSelectOrder(order)}
                className={`flex h-[42px] w-full cursor-pointer items-center justify-center transition-all duration-300 hover:text-blue-400 ${
                  idx < ORDER_LIST.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                {order}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
