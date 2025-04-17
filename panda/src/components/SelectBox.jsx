"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const options = ["최신순", "좋아요순"];

function SelectBox({ onClick }) {
  const [selected, setSelected] = useState("최신순");
  const [open, setOpen] = useState(false);
  const selectBoxRef = useRef(null);

  // 선택 상자 바깥을 클릭하면 창 닫힘
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectBoxRef.current &&
        !selectBoxRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 옵션 전달
  const handleSelect = (option) => {
    setSelected(option);
    onClick(option); // Articles.jsx로 전달
    setOpen(false); // tablet size 이상일 때만
  };

  // 폰 크기: 아이콘 클릭하면 정렬 변경
  const changeOptions = () => {
    const change = selected === "최신순" ? "좋아요순" : "최신순";
    handleSelect(change);
  };

  // Tablet + PC 크기: 클릭하면 목록 열림
  const selectBoxOpen = () => {
    if (window.innerWidth >= 744) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <div
      ref={selectBoxRef}
      className="border border-gray-200 rounded-[12px] bg-white w-[42px] h-[42px] md:w-[130px] md:h-[42px] flex items-center justify-center cursor-pointer relative"
      onClick={selectBoxOpen}
    >
      {/* 폰 크기: 아이콘 + 누르면 정렬 변경 */}
      <div
        className="md:hidden"
        onClick={(event) => {
          event.stopPropagation(); // toggle과 겹치지 않도록 클릭 이벤트 중단
          changeOptions;
        }}
      >
        <FaSortAmountDown className="scale-x-[-1] text-gray-800" />
      </div>

      {/* Tablet/PC 크기: 누르면 dropdown menu 열림 */}
      <div className="md:flex gap-[10px] items-center text-gray-800 hidden">
        <span>{selected}</span>
        <IoMdArrowDropdown className="text-gray-800" />
      </div>

      {/* dropdown menu */}
      {open && (
        <ul className="hidden absolute w-full bg-white border border-gray-200 rounded-[12px] top-[50px] left-0 md:flex flex-col items-center z-10">
          {options.map((option, lastList) => {
            const isLast = lastList === options.length - 1;

            return (
              <li
                key={option}
                onClick={(event) => {
                  event.stopPropagation();
                  handleSelect(option);
                }}
                className={`text-gray-800 w-full py-[6px] px-[20px] text-center ${
                  !isLast ? "border-b border-gray-200" : ""
                }`}
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SelectBox;
