"use client";
import { useState } from "react";
import TopSection from "./components/TopSection";
import { useWindowSize } from "../../components/useWindowSize";
import { fetchProducts } from "@/src/api/Product/Product";
import { useQuery } from "@tanstack/react-query";
import Item from "./components/Item";
import Link from "next/link";

export default function Market() {
  const width = useWindowSize();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOption, setSortOption] = useState("latest");

  const itemsPerPage = width < 768 ? 4 : width < 1024 ? 6 : 10;

  const { data, isPending, error } = useQuery({
    queryKey: ["items"],
    queryFn: () => fetchProducts(),
    meta: { name: "모든 상품 정보 가져오기" },
  });

  if (isPending) return <p>불러오는 중...</p>;
  if (error) return <p>오류 발생!</p>;

  // ✅ 1️⃣ 검색 + 정렬
  const filteredAndSortedItems = data.list
    .filter((item) =>
      item.name.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt); // 최신순
      } else if (sortOption === "likes") {
        return b.favoriteCount - a.favoriteCount; // 좋아요순
      }
      return 0;
    });

  // ✅ 2️⃣ 페이지네이션 계산
  const totalItems = filteredAndSortedItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleItems = filteredAndSortedItems.slice(startIndex, endIndex);
  console.log("현재 sortOption:", sortOption);
  console.log("정렬 후 데이터 (첫 3개):", filteredAndSortedItems.slice(0, 3));
  return (
    <div className="flex flex-col w-full gap-[1rem] mx-auto p-[1rem] max-w-[75rem] justify-center items-center md:gap-[2rem]">
      {/* ✅ TopSection에 상태 props로 넘기기 */}
      <TopSection
        widthSize={width}
        inputValue={searchKeyword}
        setInputValue={(value) => {
          setSearchKeyword(value);
          setCurrentPage(1); // 검색 시 첫 페이지로
        }}
        sortOption={sortOption}
        setSortOption={(value) => {
          setSortOption(value);
          setCurrentPage(1); // 정렬 변경 시 첫 페이지로
        }}
      />

      {/* ✅ 상품 리스트 */}
      <div
        className="grid w-full gap-y-8 md:gap-y-10
                grid-cols-2                 
                md:grid-cols-3 
                lg:grid-cols-5"
      >
        {visibleItems.map((item) => (
          <Link key={item.id} href={`/items/${item.id}`} className="w-full">
            <Item key={item.id} data={item} />
          </Link>
        ))}
      </div>

      {/* ✅ 페이지네이션 */}
      <div className="flex flex-row gap-1 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="w-[2.5rem] h-[2.5rem] rounded-full border border-[#E5E7EB] font-semibold text-[#6B7280]"
        >
          {"<"}
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-[2.5rem] h-[2.5rem] rounded-full border border-[#E5E7EB] font-semibold ${
              currentPage === page
                ? "bg-[#2F80ED] text-white"
                : "text-[#6B7280] bg-white"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="w-[2.5rem] h-[2.5rem] rounded-full border border-[#E5E7EB] font-semibold text-[#6B7280]"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
