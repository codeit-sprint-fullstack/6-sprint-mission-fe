"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import facebookIcon from "@/app/assets/icons/ic-facebook.svg";
import twitterIcon from "@/app/assets/icons/ic-twitter.svg";
import youtubeIcon from "@/app/assets/icons/ic-youtube.svg";
import instagramIcon from "@/app/assets/icons/ic-instagram.svg";

export default function Footer() {
  const pathName = usePathname();
  const shouldHideFooter =
    pathName === "/login" || pathName === "/registration";
  if (shouldHideFooter) return null;
  return (
    <footer className="flex items-center justify-center w-full pt-8 pr-4 pb-[65px] pl-4 h-40 bg-secondary-900 text-secondary-200 ">
      <div className="flex justify-between flex-wrap w-full xl:max-w-[1120px] gap-6">
        <div className="order-3 flex-basis-full md:order-0">
          <p className="text-center text-secondary-400">©codeit - 2024</p>
        </div>
        <div className="order-1 flex gap-[30px]">
          <p>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </p>
          <p>
            <Link href="/faq">FAQ</Link>
          </p>
        </div>
        <div className="order-2 flex w-[116px] gap-3">
          <Image
            src={facebookIcon}
            width={20}
            height={20}
            alt="페이스북 아이콘"
          ></Image>
          <Image
            src={twitterIcon}
            width={20}
            height={20}
            alt="트위터 아이콘"
          ></Image>
          <Image
            src={youtubeIcon}
            width={20}
            height={20}
            alt="유투브 아이콘"
          ></Image>
          <Image
            src={instagramIcon}
            width={20}
            height={20}
            alt="인스타그램 아이콘"
          ></Image>
        </div>
      </div>
    </footer>
  );
}
