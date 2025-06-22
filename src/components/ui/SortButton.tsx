import Image from "next/image";
import React from "react";
import toggleMiniImage from "@/assets/images/icons/ic_toggle_mini.png";

interface SortButtonProps {
  sortButtonState: boolean;
  setSortButtonState: (value: boolean) => void;
}

export default function SortButton({ sortButtonState, setSortButtonState }: SortButtonProps) {
  // TODO: 모달 구현 예정.
  return (
    <>
      <Image src={toggleMiniImage} alt="togglebutton" className="w-6 h-6" />
      {/* 반응형 이후 구현 예정.
       <button>
        {sortButtonState}
        {sortButtonState === "최신순" ? "▲" : "▼"}
      </button> */}
    </>
  );
}
