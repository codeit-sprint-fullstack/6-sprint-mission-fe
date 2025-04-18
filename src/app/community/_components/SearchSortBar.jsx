"use client";

import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { FaCaretDown, FaSortAmountDown } from "react-icons/fa";
import useDeviceType from "@/hooks/useDeviceType";

// 정렬 옵션 목록
const ORDER_LIST = ["최신순", "좋아요순"];

/**
 * 검색 및 정렬 기능을 제공하는 컴포넌트
 * @param {string} searchTerm - 검색어
 * @param {function} onSearchChange - 검색어 변경 핸들러 (디바운싱은 부모 컴포넌트에서 처리)
 * @param {function} onSearch - 검색 제출 핸들러
 * @param {function} onOrderChange - 정렬 방식 변경 핸들러
 */
export default function SearchSortBar({
  searchTerm,
  onSearchChange,
  onOrderChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(ORDER_LIST[0]);
  const [inputValue, setInputValue] = useState(searchTerm);
  const { isMobile } = useDeviceType();

  // 입력값 변경 처리
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSearchChange(value); // 상위 컴포넌트에서 디바운싱 처리
  };

  // 검색 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  // 드롭다운 토글
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 정렬 옵션 변경 처리
  const handleOrderChange = (selectedOrder) => {
    setOrder(selectedOrder);
    setIsOpen(false);
    if (onOrderChange) {
      onOrderChange(selectedOrder);
    }
  };

  // searchTerm prop이 외부에서 변경될 경우 로컬 상태 동기화
  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-[42px] w-full items-center gap-4"
    >
      {/* 검색 입력 영역 */}
      <div className="relative w-full">
        <IoSearch className="absolute top-1/2 left-4 h-[20px] w-[20px] -translate-y-1/2 text-gray-400" />
        <input
          className="w-full rounded-xl border-none bg-gray-100 py-3 pr-4 pl-12 text-[16px] focus:outline-none"
          type="text"
          placeholder="검색할 상품을 입력해주세요."
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      {/* 정렬 옵션 드롭다운 */}
      <div className="flex items-center gap-2">
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
                <span className="text-[1rem]">{order}</span>
                <FaCaretDown className="text-[1.2rem]" />
              </>
            )}
          </button>

          {/* 드롭다운 목록 */}
          {isOpen && (
            <ul className="absolute right-0 z-10 mt-2 w-[120px] rounded-xl border border-gray-200 bg-white shadow-md">
              {ORDER_LIST.map((item, index) => (
                <li
                  key={item}
                  onClick={() => handleOrderChange(item)}
                  className={`flex h-[42px] w-full cursor-pointer items-center justify-center transition-all duration-300 hover:text-blue-400 ${
                    index < ORDER_LIST.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </form>
  );
}
