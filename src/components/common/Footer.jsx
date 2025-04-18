import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="h-40 px-4 pt-8 bg-gray-900 md:px-6 lg:px-100">
      <div
        className="flex justify-between
       flex-wrap text-gray-400"
      >
        <div className="order-3 md:order-none">©codeit - 2024</div>
        <div className="flex gap-[30px] text-gray-200 mb-[15px]">
          <Link href="/privacy">
            <p>Privacy Policy</p>
          </Link>
          <Link href="/faq">
            <p>FAQ</p>
          </Link>
        </div>
        <div className="flex gap-3">
          <Link href="https://facebook.com" target="_blank">
            <Image
              src="/assets/social/facebook.svg"
              alt="페이스북 아이콘"
              width={20}
              height={20}
            />
          </Link>
          <Link href="https://x.com" target="_blank">
            <Image
              src="/assets/social/twitter.svg"
              alt="트위터 아이콘"
              width={20}
              height={20}
            />
          </Link>
          <Link href="https://youtube.com" target="_blank">
            <Image
              src="/assets/social/youtube.svg"
              alt="유튜브 아이콘"
              width={20}
              height={20}
            />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <Image
              src="/assets/social/instagram.svg"
              alt="인스타그램 아이콘"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
