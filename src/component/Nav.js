import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import UserMenu from "./UserMenu";
import logoImg from "../assets/logo.svg";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <div>
      <header class={styles.header}>
        <div class={styles.header - container}>
          <a class={styles.image} href="/">
            <img
              class={styles.face - img}
              src="/main-page/작은 판다 얼굴.png"
            />
            <img class={styles.header - text} src="/main-page/판다마켓.png" />
          </a>

          <a href="/login/loginindex.html">
            <button class={styles.header - login} style="color: white">
              로그인
            </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default Nav;
