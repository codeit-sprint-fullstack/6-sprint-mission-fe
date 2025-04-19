import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full pt-[32px] px-[400px] pb-[108px] bg-secondary text-primary-200 text-[16px]">
      <div className="flex justify-between items-center">
        <div>©codeit - 2024</div>
        <div className="flex gap-[30px]">
          <Link href="/">Privacy Policy</Link>
          <Link href="/">FAQ</Link>
        </div>
        <div className="flex gap-[12px] items-center">
          <Link href="https://www.facebook.com/?locale=ko_KR">
            <Image
              src="/ic_facebook.svg"
              alt="Facebook"
              width={18}
              height={18}
            />
          </Link>
          <Link href="https://x.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoia28ifQ%3D%3D%22%7D">
            <Image
              src="/ic_twitter.svg"
              alt="Twitter"
              width={18}
              height={18}
            />
          </Link>
          <Link href="https://www.youtube.com/?hl=ko&gl=KR&app=desktop">
            <Image
              src="/ic_youtube.svg"
              alt="Youtube"
              width={18}
              height={18}
            />
          </Link>
          <Link href="https://www.instagram.com/">
            <Image
              src="/ic_instagram.svg"
              alt="Instagram"
              width={18}
              height={18}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
