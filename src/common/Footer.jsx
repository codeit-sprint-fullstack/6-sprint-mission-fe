"use client";
import Image from "next/image";
import Link from "next/link";
import instagram from "../assets/instagram.png";
import facebook from "../assets/facebook.png";
import youtube from "../assets/youtube.png";
import twitter from "../assets/twitter.png";

export default function Footer() {
  return (
    <footer className=" w-full h-[10rem] bg-[#111827] flex items-center justify-center  px-4 py-8 gap-2.5">
      <div className="max-w-[75rem] w-full h-full flex items-center justify-between gap-6 ">
        <div className="w-[7.1rem] footertext text-[#9CA3AF]">
          @codeit - 2024
        </div>
        <div className="w-[10rem] flex items-center justify-between gap-7.5">
          <div className="footertext text-[#E5E7EB]">Privacy Policy</div>
          <div className="footertext text-[#E5E7EB]">FAQ</div>
        </div>

        <div className="w-[7.25rem] flex items-center justify-between gap-3">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={facebook} width={20} height={20} alt="페이스북" />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={twitter} width={20} height={20} alt="트위터" />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={youtube} width={20} height={20} alt="유튜브" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={instagram} width={20} height={20} alt="인스타그램" />
          </a>
        </div>
      </div>
    </footer>
  );
}
