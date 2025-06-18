"use client";

import FacebookIcon from "@/assets/svgs/facebook.svg";
import InstagramIcon from "@/assets/svgs/instagram.svg";
import TwitterIcon from "@/assets/svgs/twitter.svg";
import YoutubeIcon from "@/assets/svgs/youtube.svg";
import Link from "next/link";

function Footer() {
  return (
    <footer className="h-40 bg-gray-900 px-4 pt-8 md:px-6 lg:px-100">
      <div className="flex flex-wrap justify-between text-gray-400">
        <div className="order-3 md:order-none">©codeit - 2024</div>
        <div className="mb-[15px] flex gap-[30px] text-gray-200">
          <Link href="/privacy">
            <p>Privacy Policy</p>
          </Link>
          <Link href="/faq">
            <p>FAQ</p>
          </Link>
        </div>
        <div className="flex gap-3">
          <Link href="https://facebook.com" target="_blank">
            <FacebookIcon alt="페이스북 아이콘" />
          </Link>
          <Link href="https://x.com" target="_blank">
            <TwitterIcon alt="트위터 아이콘" />
          </Link>
          <Link href="https://youtube.com" target="_blank">
            <YoutubeIcon alt="유튜브 아이콘" />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <InstagramIcon alt="인스타그램 아이콘" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
