"use client";

import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { FaSort, FaAngleDown, FaSearch } from "react-icons/fa"; // ← react-icons 사용
import DropdownList from "./DropdownList";
import PaginationBar from "./PaginationBar";
import Link from "next/link";
import { getProducts } from "@/api/item.api";
import { Product } from "@/types/product";

const getPageSize = (): number => {
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile viewport
    return 4;
  } else if (width < 1280) {
    // Tablet viewport
    return 6;
  } else {
    // Desktop viewport
    return 10;
  }
};

function AllItemsSection(): JSX.Element {
  const [orderBy, setOrderBy] = useState<"recent" | "favorite">("recent");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(getPageSize());
  const [itemList, setItemList] = useState<Product[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [totalPageNum, setTotalPageNum] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");

  const fetchSortedData = async ({
    orderBy,
    page,
    pageSize,
    keyword,
  }: {
    orderBy: "recent" | "favorite";
    page: number;
    pageSize: number;
    keyword: string;
  }) => {
    // orderBy를 백엔드가 이해하는 sort로 변환
    const sortMap = {
      recent: "latest",
      favorite: "likes",
    };
    const sort = sortMap[orderBy] || "latest";

    // API 호출 - 파라미터명 변경
    const products = await getProducts({ sort, page, pageSize, keyword });

    // 백엔드 응답이 배열인지 객체인지 확인하여 처리
    if (Array.isArray(products)) {
      setItemList(products);
      setTotalPageNum(Math.ceil(products.length / pageSize));
    } else if ("list" in products && Array.isArray(products.list)) {
      setItemList(products.list as Product[]);
      setTotalPageNum(Math.ceil(products.totalCount / pageSize));
    } else if ("data" in products && Array.isArray(products.data)) {
      setItemList(products.data);
      setTotalPageNum(Math.ceil(products.totalCount / pageSize || 1));
    } else {
      // fallback
      setItemList([]);
      setTotalPageNum(1);
    }
  };
  const handleSortSelection = (sortOption: "recent" | "favorite") => {
    setOrderBy(sortOption);
    setPage(1);
    setIsDropdownVisible(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    fetchSortedData({ orderBy, page: 1, pageSize, keyword });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const convertToKorean = (order: "recent" | "favorite") => {
    switch (order) {
      case "recent":
        return "최신순";
      case "favorite":
        return "좋아요순";
      default:
        return "최신순";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };
    // 최초 진입 시 페이지 크기 설정
    setPageSize(getPageSize());
    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy, page, pageSize, keyword });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBy, page, pageSize, keyword]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
    fetchSortedData({ orderBy, page: pageNumber, pageSize, keyword });
  };

  return (
    <div>
      <div className="allItemsSectionHeader">
        <h1 className="sectionTitle">판매 중인 상품</h1>

        <div className="searchBarWrapper">
          <FaSearch />
          <input
            className="searchBarInput"
            placeholder="검색할 상품을 입력해 주세요"
            value={keyword}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <Link
          href="/items/new"
          className="createItemButton button bg-primary-100 text-white font-semibold text-[16px] py-2 px-4 radius-[8px]"
        >
          상품 등록하기
        </Link>
        <div className="sortButtonWrapper">
          <button
            className="sortDropdownTriggerButton"
            onClick={toggleDropdown}
          >
            <div className="sortBtn">
              <span>{convertToKorean(orderBy)}</span>
              <FaAngleDown />
            </div>
            <FaSort className="mobileSortBtn" />
          </button>
          {isDropdownVisible && (
            <DropdownList onSortSelection={handleSortSelection} />
          )}
        </div>
      </div>

      <div className="allItemsCardSection">
        {itemList?.map((item) => (
          <ItemCard item={item} key={`market-item-${item.id}`} />
        ))}
      </div>

      <div className="paginationBarWrapper">
        <PaginationBar
          totalPageNum={totalPageNum}
          activePageNum={page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default AllItemsSection;
