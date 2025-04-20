"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 w-full py-8 px-[20px] sm:px-[40px] md:px-[200px] flex justify-between items-center text-[16px] leading-[19.09px] font-normal text-white flex-wrap gap-[60px]">
      <div className="text-gray-400 ml-0">@codeit - 2025</div>

      <div className="flex gap-[30px] text-gray-200 items-start flex-wrap justify-center">
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
        <Link href="/faq" className="hover:underline">
          FAQ
        </Link>
      </div>

      <div className="flex gap-3 mr-0">
        <a
          href="https://facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/social/facebook-logo.svg"
            alt="Facebook"
            className="w-5 h-5 p-[5px]"
          />
        </a>
        <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
          <img
            src="/images/social/twitter-logo.svg"
            alt="Twitter"
            className="w-5 h-5 p-[5px]"
          />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/social/youtube-logo.svg"
            alt="YouTube"
            className="w-5 h-5 p-[5px]"
          />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/social/instagram-logo.svg"
            alt="Instagram"
            className="w-5 h-5 p-[5px]"
          />
        </a>
      </div>
    </footer>
  );
}
