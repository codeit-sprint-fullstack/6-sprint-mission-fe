import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <div className="header-bar">
        <div className="header-left">
          <a href="/panda/homepage.html" className="logo-btn">
            <img src="/assets/image/ic_small_panda_logo.svg" />
            <h1>판다마켓</h1>
          </a>
          <a href="/" className="header-txt">
            자유게시판
          </a>
          <a href="/" className="header-txt">
            중고마켓
          </a>
        </div>
        <div>
          <a href="/panda/login/login.html">
            <img
              src="/assets/image/market/ic_profile.svg"
              alt="프로필"
              className="profile-img"
            />
          </a>
          <a href="/panda/login/login.html" className="login-btn">
            로그인
          </a>
        </div>
      </div>
    </header>
  );
};
