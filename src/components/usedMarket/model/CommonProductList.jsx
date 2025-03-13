import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productFetch } from "../api/productFetch";
import Product from "../ui/Product";
import styles from "./CommonProductList.module.css";
import { FaCaretDown } from "react-icons/fa";
import Pagination from "./Pagination";
import useDeviceType from "../hooks/useDeviceType";

const COMMON_ITEM_HEIGHT = 220;
const PAGE_SIZE = 10;
const ORDER_LIST = ["좋아요순", "최신순"];

const COMMON_ITEM_DATA_PARAM = {
  page: 1,
  pageSize: PAGE_SIZE,
  orderBy: "favorite",
  keyword: "",
};

const CommonProductList = () => {
  const navigate = useNavigate();
  const [commonItems, setCommonItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(ORDER_LIST[0]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { isMobile } = useDeviceType();

  useEffect(() => {
    const fetchItems = async () => {
      const response = await productFetch({
        ...COMMON_ITEM_DATA_PARAM,
        page: currentPage,
        orderBy: order === "좋아요순" ? "favorite" : "recent",
      });
      setCommonItems(response.list);
      setTotalPage(Math.ceil(response.totalCount / PAGE_SIZE));
    };

    fetchItems();
  }, [currentPage, order]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOrderChange = (selectedOrder) => {
    setOrder(selectedOrder);
    setCurrentPage(1);
    setIsOpen(false);
  };

  return (
    <div>
      <div className={styles.header}>
        <span className={styles.title}>판매 중인 상품</span>
        <div className={styles.search_action_wrapper}>
          {/* 검색창 */}
          <div className={styles.search_wrapper}>
            <img
              className={styles.search_icon}
              src="/images/icons/ic_search.svg"
              alt="검색 아이콘"
            />
            <input
              className={styles.search_input}
              type="text"
              placeholder="검색할 상품을 입력해주세요."
            />
          </div>

          {/* 상품 등록 버튼 */}
          <button
            className={styles.register_button}
            onClick={() => navigate("/register")}
          >
            상품 등록하기
          </button>

          {/* 정렬 옵션 */}
          <div className={styles.order_dropdown_wrapper}>
            <button className={styles.order_dropdown} onClick={toggleDropdown}>
              <span>{order}</span>
              <FaCaretDown />
            </button>
            {isOpen && (
              <ul className={styles.order_dropdown_list}>
                <li onClick={() => handleOrderChange("최신순")}>최신순</li>
                <li onClick={() => handleOrderChange("좋아요순")}>좋아요순</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <ul className={styles.list}>
        {commonItems.map((item) => (
          <Product key={item.id} height={COMMON_ITEM_HEIGHT} {...item} />
        ))}
      </ul>

      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default CommonProductList;
