"use client";

import Dropdown from "@/components/ui/Dropdown";
import { EDIT_OPTIONS } from "@/constant";

import { useAuth } from "@/providers/AuthProvider";
import { Product } from "@/types";
import Image from "next/image";
import React from "react";

interface ItemHeaderProps {
  item: Product;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditItem: () => void;
}

function ItemHeader({ item, isDropdownOpen, setIsDropdownOpen, handleEditItem }: ItemHeaderProps) {
  const { user } = useAuth();

  return (
    <nav>
      <div className="mb-2 flex justify-between gap-2">
        <h2 className="font-semibold text-gray-800">{item.name}</h2>
        <div>
          {user?.id === item.ownerId && (
            <Image
              src="/assets/icon/ic_kebab.svg"
              alt="편집 아이콘"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            />
          )}
          {isDropdownOpen && <Dropdown items={EDIT_OPTIONS} onSelect={handleEditItem} />}
        </div>
      </div>
      <div className="text-2xl font-semibold">{item.price}원</div>
    </nav>
  );
}

export default ItemHeader;
