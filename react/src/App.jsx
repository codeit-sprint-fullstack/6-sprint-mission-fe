import { Footer } from "./assets/Footer";
import Api from "./Api.jsx";

function App() {
  return (
    <>
      <nav>
        <a>판다마켓</a>
        <a href="/">자유게시판</a>
        <a href="/">중고마켓</a>
        <a href="/">로그인</a>
      </nav>
      <Api />
      <p>베스트 상품</p>
      <a>판매중인 상품</a>
      {/* input */}
      <a href="/">상품등록하기</a>
      {/* 페이지네이션 */}
      <Footer />
    </>
  );
}

export default App;
