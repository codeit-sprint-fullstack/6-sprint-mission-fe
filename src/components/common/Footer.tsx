"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 w-full py-8 px-[200px] flex justify-between items-center text-[16px] leading-[19.09px] font-normal text-white flex-wrap gap-[60px]">
      {/* 왼쪽 */}
      <div className="text-gray-400 ml-0">@codeit - 2025</div>

      {/* 가운데 */}
      <div className="flex gap-[30px] text-gray-200 items-start">
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
        <Link href="/faq" className="hover:underline">
          FAQ
        </Link>
      </div>

      {/* 오른쪽 */}
      <div className="flex gap-3 mr-0">
        {[
          {
            href: "https://facebook.com/",
            alt: "Facebook",
            src: "/images/social/facebook-logo.svg",
          },
          {
            href: "https://x.com/",
            alt: "Twitter",
            src: "/images/social/twitter-logo.svg",
          },
          {
            href: "https://www.youtube.com/",
            alt: "YouTube",
            src: "/images/social/youtube-logo.svg",
          },
          {
            href: "https://www.instagram.com/",
            alt: "Instagram",
            src: "/images/social/instagram-logo.svg",
          },
        ].map(({ href, alt, src }) => (
          <a
            key={alt}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-5 h-5 p-[5px]"
          >
            <Image src={src} alt={alt} fill className="object-contain" />
          </a>
        ))}
      </div>
    </footer>
  );
}
