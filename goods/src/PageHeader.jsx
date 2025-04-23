import "./style/page.css";
import pandaLogo from "../../sprint/img/PandaLogo.png";

export const PageHeader = () => {
  return (
    <div>
      <header className="page-header">
        <div className="header">
          <div className="header-sub">
            <a href="/">
              <img className="Panda-logo" src={pandaLogo} alt="판다로고" />
            </a>
            <nav>
              <ul>
                <li>
                  <a href="/boards">자유게시판</a>
                </li>
                <li>
                  <a href="/items">중고마켓</a>
                </li>
              </ul>
            </nav>
          </div>
          <a className="login" href="/login.html">
            로그인
          </a>
        </div>
      </header>
    </div>
  );
};
