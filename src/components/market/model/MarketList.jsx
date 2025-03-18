import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMarketItems } from "../api/fetchMarketItems";
import Pagination from "./Pagination";
import styles from "./MarketList.module.css";

const DEFAULT_IMAGE = "/images/icons/img_default.svg";

const MarketList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const items = await fetchMarketItems(currentPage, 10);
      setProducts(items);
      setTotalPage(Math.ceil(items.length / 10));
    };

    fetchProducts();
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>판매 중인 상품</h2>

        {/* 검색 & 상품 등록 & 정렬 옵션 */}
        <div className={styles.actions}>
          {/* 검색창 */}
          <div className={styles.searchWrapper}>
            <img
              className={styles.searchIcon}
              src="/images/icons/ic_search.svg"
              alt="검색 아이콘"
            />
            <input
              className={styles.searchInput}
              type="text"
              placeholder="검색할 상품을 입력해주세요."
            />
          </div>

          {/* 상품 등록 버튼 */}
          <button
            className={styles.registerButton}
            onClick={() => navigate("/registration")}
          >
            상품 등록하기
          </button>

          {/* 최신순 정렬 (좋아요순 없음) */}
          <div className={styles.orderDropdown}>
            <span>최신순</span>
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      <ul className={styles.productList}>
        {products.map((item) => (
          <li key={item.id} className={styles.productItem}>
            <img
              src={item.image || DEFAULT_IMAGE}
              alt={item.name}
              className={styles.productImage}
            />
            <h3 className={styles.productName}>{item.name}</h3>
            <p className={styles.productPrice}>
              {item.price.toLocaleString()}원
            </p>
            <span className={styles.likes}>♡ {item.likes || 0}</span>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default MarketList;
