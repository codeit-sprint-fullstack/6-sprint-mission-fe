"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/lib/api/itemApi";
import Image from "next/image";
import DropdownMenu from "@/components/ui/DropdownMenu";
import PaginationBar from "@/components/ui/PaginationBar";

const getPageSize = () => {
  const width = typeof window !== "undefined" ? window.innerWidth : 1200;
  if (width < 768) return 4;
  if (width < 1280) return 6;
  return 10;
};

export default function ItemsPage() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(getPageSize());

  const refresh = searchParams.get("refresh");

  useEffect(() => {
    if (refresh) {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
    }
  }, [refresh]);

  useEffect(() => {
    const handleResize = () => setPageSize(getPageSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", { orderBy, page, pageSize, search }],
    queryFn: () => {
      return getProducts({ orderBy, page, pageSize, keyword: search });
    },
    keepPreviousData: false,
    staleTime: 0,
    refetchOnMount: true,
  });

  const {
    data: bestData,
    isPending: isBestLoading,
    isError: isBestError,
  } = useQuery({
    queryKey: ["products", { orderBy: "favorite", page: 1, pageSize: 4 }],
    queryFn: () => getProducts({ orderBy: "favorite", page: 1, pageSize: 4 }),
    staleTime: 1000 * 60,
  });

  const bestItems = bestData?.list || [];

  const items = data?.list || [];
  const totalPage = Math.ceil((data?.totalCount || 0) / pageSize);
  const isExternalImage = (url) => url?.startsWith("http");

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10 space-y-10">
      <div className="flex flex-col space-y-4 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">베스트 상품</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {bestItems.map((item) => (
            <Link
              href={`/items/${item.id}`}
              key={item.id}
              className="rounded-xl hover:shadow transition"
            >
              <div className="bg-gray-100 rounded-xl aspect-square mb-4 overflow-hidden">
                {item.images?.[0] ? (
                  <img
                    src={
                      isExternalImage(item.images[0])
                        ? item.images[0]
                        : `http://localhost:3000${item.images[0]}`
                    }
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <Image
                    src="/img_default.svg"
                    alt="기본 이미지"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}
              </div>
              <h2 className="text-base font-semibold truncate">{item.name}</h2>
              <p className="text-lg font-bold">
                {item.price.toLocaleString()}원
              </p>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Image
                  src="/images/icons/ic_heart.svg"
                  width={14}
                  height={14}
                  alt="하트"
                />
                <span className="ml-1">{item.favoriteCount}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">판매 중인 상품</h1>

        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 px-4 py-2 rounded-xl w-[325px]">
            <Image
              src="/images/icons/ic_search.svg"
              alt="검색"
              width={20}
              height={20}
            />
            <input
              className="ml-2 bg-transparent outline-none flex-1"
              placeholder="검색할 상품을 입력해 주세요"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link
            href="/items/registration"
            className="bg-[#3692FF] text-white px-6 py-2 rounded-xl hover:bg-blue-600"
          >
            상품 등록하기
          </Link>
          <DropdownMenu
            sortOptions={[
              { key: "recent", label: "최신순" },
              { key: "favorite", label: "인기순" },
            ]}
            selectedKey={orderBy}
            onSortSelection={(key) => setOrderBy(key)}
          />
        </div>
      </div>

      {isPending && <p>불러오는 중...</p>}
      {isError && <p className="text-red-500">상품 목록 불러오기 실패</p>}

      {!isPending && !isError && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {items.map((item) => (
              <Link
                href={`/items/${item.id}`}
                key={item.id}
                className="rounded-xl  hover:shadow transition"
              >
                <div className="bg-gray-100 rounded-xl aspect-square mb-4 overflow-hidden">
                  {item.images?.[0] ? (
                    <img
                      src={
                        isExternalImage(item.images[0])
                          ? item.images[0]
                          : `http://localhost:3000${item.images[0]}`
                      }
                      alt={item.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <Image
                      src="/img_default.svg"
                      alt="기본 이미지"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  )}
                </div>
                <h2 className="text-base font-semibold truncate">
                  {item.name}
                </h2>
                <p className="text-lg font-bold">
                  {item.price.toLocaleString()}원
                </p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Image
                    src="/images/icons/ic_heart.svg"
                    width={14}
                    height={14}
                    alt="하트"
                  />
                  <span className="ml-1">{item.favoriteCount}</span>
                </div>
              </Link>
            ))}
          </div>

          <PaginationBar
            totalPage={totalPage}
            activePage={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      )}
    </div>
  );
}
