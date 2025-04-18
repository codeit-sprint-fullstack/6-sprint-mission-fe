"use client";

import Image from "next/image";
import Link from "next/link";

const LINK_IMG_DATAS = [
  {
    href: "https://facebook.com",
    img: "/img/ic_facebook.png",
    alt: "Facebook",
  },
  {
    href: "https://twitter.com",
    img: "/img/ic_twitter.png",
    alt: "Twitter",
  },
  {
    href: "https://youtube.com",
    img: "/img/ic_youtube.png",
    alt: "YouTube",
  },
  {
    href: "https://instagram.com",
    img: "/img/ic_instagram.png",
    alt: "Instagram",
  },
];

export default function Footer() {
  return (
    <footer className="flex h-[100px] w-full items-center justify-center bg-gray-900">
      <div className="mx-5 flex h-full w-full max-w-[1200px] items-center justify-between">
        <div className="text-[0.9rem] text-gray-300">
          <span>@codeit - 2025</span>
        </div>

        <div className="flex gap-5">
          <Link
            href="/page/privacy.html"
            className="text-[0.9rem] text-gray-300 no-underline"
          >
            Privacy Policy
          </Link>
          <Link
            href="/page/faq.html"
            className="text-[0.9rem] text-gray-300 no-underline"
          >
            FAQ
          </Link>
        </div>

        <div className="flex gap-[15px]">
          {LINK_IMG_DATAS.map((data) => (
            <a
              key={data.href}
              href={data.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={data.img} alt={data.alt} width={24} height={24} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
