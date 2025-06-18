"use client";

import React from "react";

interface DropdownProps {
  order?: string;
  setOrder?: (value: string) => void;
}

function Dropdown({ order, setOrder }: DropdownProps) {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value);
  };

  return (
    <select
      className="w-[130px] h-[42px] rounded-[12px] border border-[#E5E7EB] px-[20px] text-[16px]"
      value={order}
      onChange={handleSelectChange}
    >
      <option value="recent"> 최신순 </option>
      <option value="favorite"> 좋아요 순 </option>
    </select>
  );
}

export default Dropdown;
