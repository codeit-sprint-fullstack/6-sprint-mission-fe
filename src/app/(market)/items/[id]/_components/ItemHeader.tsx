"use client";

import Dropdown from "@/components/ui/Dropdown";
import React from "react";
import EditIcon from "@/assets/svgs/ic_kebab.svg";
import { EDIT_OPTIONS } from "@/constant";
import { useAuth } from "@/providers/AuthProvider";
import { Product } from "@/types";

interface ItemHeaderProps {
  item: Product;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditItem: (action: "edit" | "delete") => void;
}

function ItemHeader({ item, isDropdownOpen, setIsDropdownOpen, handleEditItem }: ItemHeaderProps) {
  const { user } = useAuth();

  return (
    <nav>
      <div className="mb-2 flex justify-between gap-2">
        <h2 className="font-semibold text-gray-800">{item.name}</h2>
        <div>
          {user?.id === item.ownerId && (
            <button onClick={() => setIsDropdownOpen((prev) => !prev)}>
              <EditIcon alt="편집 아이콘" />
            </button>
          )}
          {isDropdownOpen && <Dropdown items={EDIT_OPTIONS} onSelect={handleEditItem} />}
        </div>
      </div>
      <div className="text-2xl font-semibold">{item.price}원</div>
    </nav>
  );
}

export default ItemHeader;
