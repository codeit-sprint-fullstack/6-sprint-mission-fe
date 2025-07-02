import Link from "next/link";
import Image from "next/image";
import ic_facebook from "@/assets/images/common/footer/ic_facebook.svg";
import ic_twitter from "@/assets/images/common/footer/ic_twitter.svg";
import ic_youtube from "@/assets/images/common/footer/ic_youtube.svg";
import ic_instagram from "@/assets/images/common/footer/ic_instagram.svg";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center w-full font-pretendard bg-secondary-gray-800">
      <div className="flex justify-between items-center w-full max-w-[1920px] h-[160px] text-[16px] font-normal text-center relative pt-[32px] px-[16px] pb-[108px] sm:static sm:px-[24px] md:px-[200px]">
        <div className="text-secondary-gray-300 absolute top-[76px] left-[16px] sm:static sm:top-0 sm:left-0 ">
          ©codeit - 2025
        </div>
        <div className="flex gap-[30px]">
          <Link href="/privacy" className="text-secondary-gray-200">
            Privacy Policy
          </Link>
          <Link href="/faq" className="text-secondary-gray-200">
            FAQ
          </Link>
        </div>
        <div className="flex gap-[13px]">
          <a target="_black" href="https://www.facebook.com">
            <Image src={ic_facebook} alt="페이스북" className="object-cover" />
          </a>
          <a target="_black" href="https://www.x.com">
            <Image src={ic_twitter} alt="트위터" className="object-cover" />
          </a>
          <a target="_black" href="https://www.youtube.com">
            <Image src={ic_youtube} alt="유튜브" className="object-cover" />
          </a>
          <a target="_black" href="https://www.instagram.com">
            <Image
              src={ic_instagram}
              alt="인스타그램"
              className="object-cover"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
