import { useEffect, useState } from "react";
import { getProduct } from "../services/productApi";
import noimg from "../img/img_default.png";
import heartic from "../img/ic_heart.png";
import searchicon from "../img/ic_search.png";
import "../styles/item.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [order, setOrder] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");

  //상품 불러오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProduct(order, 1, 1000, searchTerm);
        console.log("가져온 상품 데이터:", data);
        setProducts(data.list || []);
      } catch (e) {
        console.error("상품 데이터 불러오기 실패:", e);
      }
    };

    fetchProducts();
  }, [order, searchTerm]);

  const sortedProducts = [...products].sort((a, b) => b[order] - a[order]);

  //페이지 버튼
  const LastItem = currentPage * itemsPerPage;
  const FirstItem = LastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(FirstItem, LastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const pageNumbers = [];
  const maxPages = 5;

  let startPage = Math.max(1, currentPage - 2);

  let endPage = Math.min(totalPages, startPage + maxPages - 1);

  if (endPage - startPage < maxPages - 1) {
    startPage = Math.max(1, endPage - maxPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <main>
        <div className="Prodouct-header">
          <h2>상품 목록</h2>
          <div className="Prodouct-header-item">
            <div className="Prodouct-input-container">
              <img src={searchicon} />
              <input
                id="Prodouct-input"
                type="text"
                placeholder="검색할 상품을 입력해주세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button id="Product-register">상품 등록하기</button>
            <select
              id="Product-selsect"
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="createdAt">최신순</option>
              <option value="favoriteCount">좋아요순</option>
            </select>
          </div>
        </div>

        <div className="Product-container">
          {currentItems.length > 0 ? (
            currentItems.map((product) => (
              <div key={product.id} className="Product-item">
                <img
                  className="Product-items"
                  src={product.images?.[0] || noimg}
                  alt={product.name}
                  onError={(e) => (e.target.src = noimg)}
                />
                <p className="Items-header">{product.name}</p>
                <p className="Price-font">{product.price.toLocaleString()}원</p>
                <p>
                  <img src={heartic} alt="favorite" />
                  {product.favoriteCount}
                </p>
              </div>
            ))
          ) : (
            <p>상품이 없습니다.</p>
          )}
        </div>

        <div className="Pagination">
          <button
            id="Page-btn"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {pageNumbers.map((number) => (
            <button
              id="Page-btn"
              key={number}
              onClick={() => paginate(number)}
              className={number === currentPage ? "active" : ""}
            >
              {number}
            </button>
          ))}

          {currentPage < totalPages && (
            <button id="Page-btn" onClick={() => paginate(currentPage + 1)}>
              &gt;
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductList;
