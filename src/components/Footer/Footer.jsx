import React from "react";
import styles from './Footer.module.css'
import { Link } from "react-router-dom";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";


export default function Footer() {
    return(
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p className={styles.footerText}>©codeit - 2024</p>
                <div className={styles.footerLinks}>
                    <Link to='/privacy' className={styles.footerLink}>Privacy Policy</Link>
                    <Link to='/faq' className={styles.footerLink}>FAQ</Link>
                </div>
                <div className={styles.socialLinks}>
                    <a href="https://ko-kr.facebook.com/login/web/" className={styles.socialLink}><BiLogoFacebookCircle /></a>
                    <a href="https://x.com/?lang=ko" className={styles.socialLink}><FaTwitter /></a>
                    <a href="https://www.youtube.com/" className={styles.socialLink}><FaYoutube /></a>
                    <a href="https://www.instagram.com/" className={styles.socialLink}><RiInstagramFill /></a>
                </div>
            </div>
        </footer>
    )
}