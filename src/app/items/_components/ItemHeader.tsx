import Orders from "@/components/Orders";
import Search from "@/components/Search";
import Link from "next/link";
import React from "react";

interface ItemHeaderProps {
  setOrder: (value: "recent" | "favorite") => void;
  setSearch: (value: string) => void;
}

function ItemHeader({ setOrder, setSearch }: ItemHeaderProps) {
  return (
    <div className="flex relative h-23 w-full">
      <p className="font-bold text-gray-900 text-xl">판매 중인 상품</p>

      <div className="flex flex-col items-end gap-2 absolute top-0 left-0 w-full">
        <Link href="/items/post">
          <button className="bg-primary-100 text-white py-2 px-6 rounded-lg w-34">
            상품 등록하기
          </button>
        </Link>
        <div className="flex gap-3 w-full">
          <Search setSearch={setSearch} />
          <Orders setOrder={setOrder} />
        </div>
      </div>
    </div>
  );
}

export default ItemHeader;
