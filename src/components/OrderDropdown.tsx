import React from "react";

interface OrderDropdownProps {
  setOrder: (value: "recent" | "favorite") => void;
}

function OrderDropdown({ setOrder }: OrderDropdownProps) {
  return (
    <div className="w-32 h-21 border border-gray-300 rounded-xl flex flex-col justify-evenly items-center text-gray-500 bg-white">
      <button
        className="flex mx-5 my-2 justify-center flex-col"
        onClick={() => setOrder("recent")}
      >
        최신순
      </button>
      <div className="w-full border-t border-gray-300" />
      <button
        className="flex mx-5 my-2 justify-center flex-col "
        onClick={() => setOrder("favorite")}
      >
        좋아요순
      </button>
    </div>
  );
}

export default OrderDropdown;
