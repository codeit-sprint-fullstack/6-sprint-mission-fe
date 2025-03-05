import logo from "../assets/images/logo/sm-logo.svg";

function Header() {
  return (
    <header>
      <a href="index.html">
        <img src={logo} alt="판다마켓 로고" />
      </a>
      <div>자유게시판</div>
      <div>중고마켓</div>
      <a href="login.html">로그인</a>
    </header>
  );
}

export default Header;
