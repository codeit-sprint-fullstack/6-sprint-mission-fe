import React from "react";

const ToggleMenu = ({ isGnbActive }) => {
  return (
    <ul
      className={`${
        isGnbActive ? "block" : "hidden"
      } absolute top-[24px] right-[4px] w-[102px] h-[90px] rounded-[8px] border border-[#D1D5DB] bg-white`}
    >
      <li className="h-[50%] text-center leading-[45px] text-[14px] text-[#6B7280] border-b border-[#D1D5DB]">
        수정하기
      </li>
      <li className="h-[50%] text-center leading-[45px] text-[14px] text-[#6B7280]">
        삭제하기
      </li>
    </ul>
  );
};

export default ToggleMenu;
