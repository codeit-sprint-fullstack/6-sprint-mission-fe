import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import ProductCard from "../../components/Product/ProductCard";
import { CiSearch } from "react-icons/ci";
import styles from './Home.module.css';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";
import { GoSortDesc } from "react-icons/go";

export default function Home() {
  const [sortBy, setSortBy] = useState('createdAt');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filter, setFilter] = useState('최신순');

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1200) setItemsPerPage(10); // Desktop
      else if (window.innerWidth >= 744) setItemsPerPage(6); // Tablet
      else setItemsPerPage(4); // Mobile
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const { isLoading: isBestLoading, error: bestError, data: bestProducts } = useQuery(['bestProducts'], async () => {
    const url = 'https://panda-market-api.vercel.app/products?orderBy=favorite&pageSize=4';
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.list;
  });

  const { isLoading: isAllLoading, error: allError, data: totalCountData } = useQuery(
    ['totalCount'],
    async () => {
      const url = 'https://panda-market-api.vercel.app/products';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.totalCount;
    }
  );

  const { isLoading: isAllProductsLoading, error: productsError, data: allProducts } = useQuery(
    ['allProducts', totalCountData],
    async () => {
      const url = `https://panda-market-api.vercel.app/products?orderBy=favorite&pageSize=${totalCountData}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.list;
    },
    { enabled: !!totalCountData }
  );

  if (isBestLoading || isAllLoading || isAllProductsLoading) return <div className="container">Loading....</div>;
  if (bestError || allError || productsError) return <div className="container">{bestError?.message || allError?.message || productsError?.message}</div>;

  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortBy === 'favorite') return b.favorite - a.favorite;
    if (sortBy === 'createdAt') return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  const filteredProducts = sortedProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const maxButtonsToShow = 5;
  let startButton = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
  let endButton = Math.min(totalPages, startButton + maxButtonsToShow - 1);
  const pageButtons = Array.from({ length: endButton - startButton + 1 }, (_, index) => startButton + index);

  const handleDropdownToggle = () => setIsDropdownOpen(prevState => !prevState);

  return (
    <section className={`${styles.productsSection} container`}>
      <div className={styles.bestProductsContent}>
        <div className={styles.bestProductsInner}>
          <h2 className={`${styles.bestProductsTitle} ${styles.ProductsTitle}`}>베스트 상품</h2>
          <ul className={styles.bestProductsList}>
            {bestProducts?.map(product => <ProductCard key={product.id} product={product} />)}
          </ul>
        </div>

        <div className={styles.sellProductsInner}>
          <div className={styles.sellProductsHeader}>
            <h2 className={`${styles.sellProductsTitle} ${styles.ProductsTitle}`}>판매 중인 상품</h2>
            <div className={styles.searchContainer}>
              <CiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="검색할 상품을 입력해 주세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>                    
            <div className={styles.registerButtonContainer}>
              <button className={styles.registerButton}>상품등록하기</button>
            </div>
            <div className={styles.sortButtonsContainer} onClick={handleDropdownToggle}>
              <div className={styles.defaultButtons}>
                <button className={styles.defaultButton}>{filter}</button>
                <IoMdArrowDropdown className={styles.pcDropDown} />
                <GoSortDesc className={styles.mobileDropDown} />
              </div>
              <ul className={styles.dropdownButtons} style={{ display: isDropdownOpen ? "flex" : "none" }}>
                <button className={styles.dropdownButton} onClick={() => {setSortBy('createdAt'); setFilter('최신순')}}>최신순</button> 
                <button className={styles.dropdownButton} onClick={() => {setSortBy('favorite'); setFilter('좋아요')}}>좋아요</button> 
              </ul>
            </div>
          </div>
          <ul className={styles.sellProductsList}>
            {paginatedProducts?.map(product => <ProductCard key={product.id} product={product} />)}
          </ul>

          <div className={styles.pagination}>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              <GrFormPrevious />
            </button>
            {pageButtons.map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? styles.activePage : ""}
              >
                {page}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              <GrFormNext />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
