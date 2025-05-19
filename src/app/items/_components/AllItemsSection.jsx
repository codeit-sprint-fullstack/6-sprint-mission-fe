"use client";

import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { FaSort, FaAngleDown, FaSearch } from "react-icons/fa"; // ← react-icons 사용
import DropdownList from "./DropdownList";
import PaginationBar from "./PaginationBar";
import Link from "next/link";
import { getProducts } from "@/api/item.api.js";

const getPageSize = () => {
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

function AllItemsSection() {
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [itemList, setItemList] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [totalPageNum, setTotalPageNum] = useState();
  const [keyword, setKeyword] = useState("");

  const fetchSortedData = async ({ orderBy, page, pageSize, keyword }) => {
    // orderBy를 백엔드가 이해하는 sort로 변환
    const sortMap = {
      "recent": "latest",
      "favorite": "likes"
    };
    const sort = sortMap[orderBy] || "latest";

    // API 호출 - 파라미터명 변경
    const products = await getProducts({ sort, page, pageSize, keyword });
    
    // 백엔드 응답이 배열인지 객체인지 확인하여 처리
    if (Array.isArray(products)) {
      setItemList(products);
      setTotalPageNum(Math.ceil(products.length / pageSize));
    } else if (products.list) {
      setItemList(products.list);
      setTotalPageNum(Math.ceil(products.totalCount / pageSize));
    } else {
      // products 자체가 데이터 배열인 경우
      setItemList(products);
      setTotalPageNum(1);
    }
  };

  const handleSortSelection = (sortOption) => {
    setOrderBy(sortOption);
    setPage(1);
    setIsDropdownVisible(false);
  };

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    fetchSortedData({ orderBy, page: 1, pageSize, keyword });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const convertToKorean = (orderBy) => {
    switch (orderBy) {
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

  const onPageChange = (pageNumber) => {
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
        <Link href="/items/new" className="createItemButton button bg-primary-100 text-white font-semibold text-[16px] py-2 px-4 radius-[8px]">
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