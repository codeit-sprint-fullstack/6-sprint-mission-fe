import Image from "next/image";
import React from "react";

function ItemHeader({ item }) {
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
            // onClick={() => setIsDropdownOpen((prev) => !prev)}
          />
          {/* {isDropdownOpen && (
              <Dropdown items={editOption} onSelect={handleEditArticle} />
            )} */}
        </div>
      </div>
      <div className="text-2xl font-semibold">{item.price}원</div>
    </nav>
  );
}

export default ItemHeader;
