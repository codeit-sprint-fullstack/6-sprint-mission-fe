import Dropdown from "@/components/ui/Dropdown";
import { EDIT_OPTIONS } from "@/const";
import Image from "next/image";
import React from "react";

function ItemHeader({
  item,
  isDropdownOpen,
  setIsDropdownOpen,
  handleEditItem,
}) {
  return (
    <nav>
      <div className="flex justify-between gap-2 mb-2">
        <h2 className="font-semibold text-gray-800">{item.name}</h2>
        <div>
          <Image
            src="/assets/icon/ic_kebab.svg"
            alt="편집 아이콘"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          />
          {isDropdownOpen && (
            <Dropdown items={EDIT_OPTIONS} onSelect={handleEditItem} />
          )}
        </div>
      </div>
      <div className="text-2xl font-semibold">{item.price}원</div>
    </nav>
  );
}

export default ItemHeader;
