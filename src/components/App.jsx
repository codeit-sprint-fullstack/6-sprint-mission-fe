import { useEffect, useState } from "react";
import { ReviewList } from "./components/ReviewList";
import { getReviews } from "./api";
import "./App.css";

const LIMIT = 10;

function App() {
  const [order, setOrder] = useState("createdAt"); // 최신순(기본값) or 베스트순
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [loading, setLoading] = useState(false);
  const [originalItems, setOriginalItems] = useState([]); // 원본 리뷰 상태

  const handleOrderChange = (newOrder) => {
    if (order !== newOrder) {
      setOrder(newOrder);
      setCurrentPage(1); // 정렬 변경 시 1페이지로 이동
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async () => {
    setCurrentPage(1); // 검색 후 1페이지부터 시작

    try {
      setLoading(true);
      const { reviews } = await getReviews({
        order,
        offset: 0, // 검색 시 처음부터 데이터 불러오기
        limit: LIMIT,
      });

      // 검색 적용: 제목이 검색어와 일치하는 리뷰를 맨 앞에 배치
      if (searchQuery) {
        const matched = reviews.filter((review) =>
          review.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const unmatched = reviews.filter(
          (review) =>
            !review.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setItems([...matched, ...unmatched]);
      } else {
        setItems(reviews);
      }
    } catch (e) {
      console.error("리뷰를 불러오는 중 오류 발생:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const { reviews } = await getReviews({
          order,
          offset: (currentPage - 1) * LIMIT,
          limit: LIMIT,
        });

        if (searchQuery) {
          // 검색어가 있을 때만 검색을 적용
          const matched = reviews.filter((review) =>
            review.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          const unmatched = reviews.filter(
            (review) =>
              !review.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setItems([...matched, ...unmatched]);
        } else {
          setItems(reviews); // 검색어가 없을 때는 그대로
        }
        setOriginalItems(reviews); // 페이지가 처음 로드될 때 원본 데이터를 저장
      } catch (e) {
        console.error("리뷰를 불러오는 중 오류 발생:", e);
      } finally {
        setLoading(false);
      }
    };

    // 페이지가 바뀔 때마다 리뷰를 불러오는 작업
    if (!searchQuery) {
      fetchReviews();
    } else {
      // 검색어가 있으면 검색된 리뷰를 계속해서 표시
      const matched = originalItems.filter((review) =>
        review.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const unmatched = originalItems.filter(
        (review) =>
          !review.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setItems([...matched, ...unmatched]);
    }
  }, [order, currentPage, searchQuery, originalItems]);

  return (
    <div className="container">
      {/* 상단 네비게이션 바 */}
      <header className="navbar">
        <div className="logo">
          <img src="logo.svg" alt="판다마켓 로고" />
        </div>

        <div className="information">
          <span className="community">자유게시판</span>
          <span className="market">중고마켓</span>
        </div>

        <button
          className="login"
          onClick={() => window.open("login.html", "_blank")}
        >
          로그인
        </button>
      </header>

      <div className="contents">
        {/* 검색창 */}
        <div>
          <input
            type="text"
            placeholder="영화 제목 검색..."
            value={searchQuery}
            onChange={handleSearchChange}
            disabled={loading}
          />
          <button
            onClick={handleSearchSubmit}
            disabled={loading || !searchQuery}
          >
            검색
          </button>
        </div>

        {/* 정렬 버튼 */}
        <div>
          <button
            onClick={() => handleOrderChange("createdAt")}
            disabled={loading || order === "createdAt"}
          >
            최신순
          </button>
          <button
            onClick={() => handleOrderChange("rating")}
            disabled={loading || order === "rating"}
          >
            베스트순
          </button>
        </div>

        {/* 리뷰 리스트 */}
        <ReviewList items={items} />

        {/* 페이지네이션 버튼 */}
        <div>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page || loading}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
