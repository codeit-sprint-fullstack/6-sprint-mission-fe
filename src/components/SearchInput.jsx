"use client";

export default function SearchInput({
  value,
  onChange,
  placeholder = "검색할 상품을 입력해주세요",
}) {
  return (
    <div className="flex items-center bg-gray-100 px-4 h-[42px] w-[1054px] rounded-full">
      <img
        src="/icons/ic_search.svg"
        alt="검색 아이콘"
        className="w-5 h-5 mr-2 opacity-60"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
}
