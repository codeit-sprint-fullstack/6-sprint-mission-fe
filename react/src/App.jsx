import { Footer } from "./assets/Footer";
import ProductsPage from "./assets/ProductsPage";
import Logo from "./img/Logo.png";
import "./style.css";

function App() {
  return (
    <div>
      <nav>
        <div className="navAll">
          <div>
            <a className="imgLogo">
              <img src={Logo}></img>
            </a>
            <a href="/">자유게시판</a>
            <a href="/">중고마켓</a>
          </div>
          <a className="login" href="/">
            로그인
          </a>
        </div>
      </nav>
      <p>베스트 상품</p>
      <a>판매중인 상품</a>
      <ProductsPage /> {/* 이 부분에서 상품 목록을 불러옴 */}
      <a href="/">상품등록하기</a>
      <Footer />
    </div>
  );
}

export default App;
