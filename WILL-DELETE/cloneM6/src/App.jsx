import "./App.css";
import miniPandeFace from "../main-page/작은 판다 얼굴.png";
import PandeMarket from "../main-page/판다마켓.png";
import Group from "../main-page/Group.png";
import twitter from "../main-page/ic_twitter.png";
import youtube from "../main-page/ic_youtube.png";
import instagram from "../main-page/ic_instagram.png";
import {
  GetProduct,
  GetProductList,
  CreateProduct,
  PatchProduct,
  DeleteProduct,
} from "./api/ProductService";
import { useState, useEffect } from "react";
import { BestProductList, SaleProductList } from "./component/ProductList";
import magnifier from "./img/돋보기.png";
import profile from "./img/Frame 2609463.png";
import { useWindowDimensions } from "./component/hooks/useWindowdementions";

export const App = () => {
  const [bestItems, setBestItems] = useState([]);
  const [saleItems, setSaleItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(null);
  const [bestPageSize, setBestPageSize] = useState();
  const [salePageSize, setSalePageSize] = useState();
  const [totalPage, setTotalPage] = useState(1);

  const { width } = useWindowDimensions();

  useEffect(() => {
    handleSaleItems({ page: 1, pageSize: 10, orderBy: order, keyword: "" });
  }, [order]);

  //최신순으로, 좋아요순으로 버튼클릭
  const handleSelectChange = (e) => {
    setOrder(e.target.value);
  };

  //검색어 입력
  const handleSubmit = (e) => setKeyword(e.target.value);
  useEffect(() => {
    handleSaleItems({
      page: 1,
      pageSize: 10,
      orderBy: "recent",
      keyword: keyword,
    });
  }, [keyword]);

  //베스트아이템을 초기 페이지에 로드
  useEffect(() => {
    if (width >= 1200) {
      setBestPageSize(4);
    } else if (width >= 744) {
      setBestPageSize(2);
    } else setBestPageSize(1);
    handleBestItems({ pageSize: bestPageSize });
  }, []);

  //판매중아이템을 초기 페이지 로드
  useEffect(() => {
    if (width >= 1200) {
      setSalePageSize(10);
    } else if (width >= 744) {
      setSalePageSize(6);
    } else setSalePageSize(4);
    handleSaleItems({ pageSize: salePageSize });
  }, []);

  //아이템 로드 핸들러
  const handleBestItems = async (data) => {
    const result = await GetProductList(data);
    setBestItems(result.list);
  };
  const handleSaleItems = async (data) => {
    const result = await GetProductList(data);
    setSaleItems(result.list);
    //전체 페이지 확인
    const totalItems = result.totalItems;
    setTotalPage(Math.ceil(totalItems / 10));
  };

  //pageSize에 따른 베스트 상품 갯수
  function getBestPageSize() {
    const width = window.innerWidth;
    if (width >= 1200) {
      return 4; // pc화면
    } else if (width >= 744) {
      return 2; // 태블릿 화면
    } else {
      return 1; // 모바일 화면
    }
  }

  //pageSize에 따른 판매중 상품 갯수
  function getSalePageSize() {
    const width = window.innerWidth;
    if (width >= 1200) {
      return 10; // pc화면
    } else if (width >= 744) {
      return 6; // 태블릿 화면
    } else {
      return 4; // 모바일 화면
    }
  }

  //브라우저 크기가 바뀔때마다 page 상태 변경
  useEffect(() => {
    if (width >= 1200) {
      setPage("PC");
    } else if (width >= 744) {
      setPage("tablet");
    } else setPage("mobile");
  }, [width]);

  //page가 바뀔때마다 불러오는 상품 갯수 변경
  useEffect(() => {
    const reLoad = async () => {
      const BestpageSize = getBestPageSize();
      const SalepageSize = getSalePageSize();
      const bestProducts = await GetProductList({ pageSize: BestpageSize });
      const saleProducts = await GetProductList({ pageSize: SalepageSize });
      setBestItems(bestProducts.list);
      setSaleItems(saleProducts.list);
    };
    reLoad();
  }, [page]);

  //페이지네이션 버튼 클릭 시
  const handleClick = (e, num) => {
    setCurrentPage(num);
    handleButtonClick(e);
  };
  //페이지네이션 이전버튼 클릭 시
  const handleClickPrev = (e) => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
    handleButtonClick(e);
  };

  //페이지네이션 특정 페이지 로드
  useEffect(() => {
    handleSaleItems({ page: currentPage });
  }, [currentPage]);

  //페이지네이션 이후버튼 클릭 시
  const handleClicknext = (e) => {
    if (currentPage === totalPage) {
      return;
    }
    setCurrentPage((prevPage) => prevPage + 1);
    handleButtonClick(e);
  };

  //페이지네이션 버튼을 클릭 시시'click' css가 추가되는 핸들러
  const handleButtonClick = (e) => {
    e.target.classList.add("clicked");
    //추가된 클래스가 0.2초 뒤에 사라짐
    setTimeout(() => {
      e.target.classList.remove("clicked");
    }, 200);
  };

  return (
    <div>
      <header className="header">
        <div className="header-container">
          <div className="header-bundle">
            <a className="image" href="/">
              <img className="face-img" src={miniPandeFace} />
              <img className="header-text" src={PandeMarket} />
            </a>
            <div className="in-header-bundle1"> 자유게시판 </div>
            <div className="in-header-bundle2"> 중고마켓 </div>
          </div>

          <a>
            <button className="header-login">로그인</button>
          </a>
          <img className="profile" src={profile} />
        </div>
      </header>

      <div className="content">
        <div className="body-content">
          <div className="body-content-upper">
            <p> 베스트 상품 </p>
          </div>
          <div>
            <BestProductList items={bestItems} />
          </div>

          <div className="body-content-under1">
            <p> 판매중인 상품 </p>
            <button className="shadow-regist-product"> 상품 등록하기 </button>
            <div className="body-content-under2">
              <img className="magnifier" src={magnifier} />
              <input
                className="search-product"
                placeholder="검색할 상품을 입력해주세요"
                onChange={handleSubmit}
              />

              <button className="regist-product"> 상품 등록하기 </button>
              <select
                className="select"
                value={order}
                onChange={handleSelectChange}
              >
                <option value="recent"> 최신순 </option>
                <option value="favorite"> 좋아요 순 </option>
              </select>
            </div>
          </div>

          <div className="shadow-body-content-under2">
            <img className="shadow-magnifier" src={magnifier} />
            <input
              className="shadow-search-product"
              placeholder="검색할 상품을 입력해주세요"
              onChange={handleSubmit}
            />
            <select
              className="shadow-select"
              value={order}
              onChange={handleSelectChange}
            >
              <option value="recent"> 최신순 </option>
              <option value="favorite"> 좋아요 순 </option>
            </select>
          </div>

          <div>
            <SaleProductList items={saleItems} />
          </div>
        </div>

        <div className="page-buttons">
          <button onClick={(e) => handleClickPrev(e)}> &lt; </button>
          <button onClick={(e) => handleClick(e, 1)}>1</button>
          <button onClick={(e) => handleClick(e, 2)}> 2 </button>
          <button onClick={(e) => handleClick(e, 3)}> 3 </button>
          <button onClick={(e) => handleClick(e, 4)}> 4 </button>
          <button onClick={(e) => handleClicknext(e)}> &gt; </button>
        </div>
      </div>

      <footer className="footer">
        <div className="foot">
          <div className="shadow-foot">
            <p className="codeit1">@codeit - 2024</p>
            <span className="footer-space">
              <a>Privacy Policy</a>
              <a>FAQ</a>
            </span>
            <span className="icon">
              <a href="https://ko-kr.facebook.com/">
                <img src={Group} />
              </a>
              <a href="https://x.com/?mx=2">
                <img src={twitter} />
              </a>
              <a href="https://www.youtube.com/">
                <img src={youtube} />
              </a>
              <a href="https://www.instagram.com/">
                <img src={instagram} />
              </a>
            </span>
          </div>

          <div className="shadow-foot">
            <p className="codeit2">@codeit - 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
