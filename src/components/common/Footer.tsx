"use client";

import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "@/assets/svgs";
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
            <FacebookIcon aria-label="페이스북 아이콘" />
          </Link>
          <Link href="https://x.com" target="_blank">
            <TwitterIcon aria-label="트위터 아이콘" />
          </Link>
          <Link href="https://youtube.com" target="_blank">
            <YoutubeIcon aria-label="유튜브 아이콘" />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <InstagramIcon aria-label="인스타그램 아이콘" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
