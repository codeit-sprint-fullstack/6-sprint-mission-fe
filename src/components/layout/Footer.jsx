import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full h-[160px] bg-[#111827] text-gray-400 flex justify-between items-center py-[32px] px-[400px]">
      <div className="text-sm">©codeit - 2024</div>

      <div className="flex gap-12 text-gray-200 text-sm">
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
        <Link href="/faq" className="hover:underline">
          FAQ
        </Link>
      </div>

      <div className="flex gap-[10px]">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="opacity-80 hover:opacity-100 transition-opacity"
        >
          <Image
            src="/images/social/facebook-logo.svg"
            alt="페이스북"
            width={20}
            height={20}
          />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="opacity-80 hover:opacity-100 transition-opacity"
        >
          <Image
            src="/images/social/twitter-logo.svg"
            alt="트위터"
            width={20}
            height={20}
          />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Youtube"
          className="opacity-80 hover:opacity-100 transition-opacity"
        >
          <Image
            src="/images/social/youtube-logo.svg"
            alt="유튜브"
            width={20}
            height={20}
          />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="opacity-80 hover:opacity-100 transition-opacity"
        >
          <Image
            src="/images/social/instagram-logo.svg"
            alt="인스타그램"
            width={20}
            height={20}
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
