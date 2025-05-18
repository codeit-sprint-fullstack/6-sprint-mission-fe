"use client";

import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "../../../public/images/social/facebook-logo.svg";
import TwitterIcon from "../../../public/images/social/twitter-logo.svg";
import YoutubeIcon from "../../../public/images/social/youtube-logo.svg";
import InstagramIcon from "../../../public/images/social/instagram-logo.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm px-6 py-10 mt-12">
      <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-y-6">
        <div className="text-xs text-gray-500 order-1">©codeit - 2024</div>

        <div className="flex gap-6 order-2 mx-auto md:mx-0">
          <Link href="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/faq" className="hover:text-white">
            FAQ
          </Link>
        </div>

        <div className="flex gap-4 order-3">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            aria-label="페이스북"
          >
            <Image src={FacebookIcon} alt="페이스북" width={20} height={20} />
          </a>
          <a href="https://twitter.com/" target="_blank" aria-label="트위터">
            <Image src={TwitterIcon} alt="트위터" width={20} height={20} />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            aria-label="유튜브"
          >
            <Image src={YoutubeIcon} alt="유튜브" width={20} height={20} />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            aria-label="인스타그램"
          >
            <Image
              src={InstagramIcon}
              alt="인스타그램"
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
