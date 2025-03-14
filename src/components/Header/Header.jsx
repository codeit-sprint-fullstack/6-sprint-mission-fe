import styles from './Header.module.css'
import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";


export default function Header() {
    return(
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logoSection}>
                    <h1 className={styles.h1Logo}><Link to='/'><img src="/images/mobile_logo.png" className={styles.mobile} alt="" /><img src='/images/logo.png' className={styles.pc} alt="logo"/></Link></h1>
                    <Link to='/freeboard' className={`${styles.boardLink} ${styles.link}`}>자유게시판</Link>
                    <Link to='/secondhandmarket' className={`${styles.marketLink} ${styles.link}`}>중고마켓</Link>
                </div>
                <div className={styles.authSection}>
                    <Link to='/login' className={`${styles.loginLink} ${styles.loginText}`}>로그인</Link>
                    <Link to='/login' className={`${styles.loginLink} ${styles.loginIcon}`}><CiLogin /></Link>
                </div>
            </div>
        </header>
    )
}   

