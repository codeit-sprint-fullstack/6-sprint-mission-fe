import { Footer } from "./assets/Footer";
import ProductsPage from "./assets/ProductsPage";
import Logo from "./img/Logo.png";
import "./style.css";

function App() {
  return (
    <div>
      <nav>
        <div className="navAll">
          <div className="nav-left">
            <a className="imgLogo">
              <img src={Logo} alt="로고" />
            </a>
            <a href="/">자유게시판</a>
            <a href="/">중고마켓</a>
          </div>
          <a className="login" href="/">
            로그인
          </a>
        </div>
      </nav>
      <ProductsPage /> {/* 상품 목록 페이지 */}
      <Footer />
    </div>
  );
}

export default App;
