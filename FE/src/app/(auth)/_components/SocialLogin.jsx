import Image from "next/image";
import googleLoginImage from "@/assets/images/icons/ic_google.png";
import kakaoLoginImage from "@/assets/images/icons/ic_kakao.png";
import Link from "next/link";

export default function SocialLogin() {
  return (
    <div className="bg-EF h-19 flex justify-between p-4 items-center rounded-lg text-gray-800">
      <p>간편 로그인하기</p>
      <div className="flex gap-2">
        <Link href={"https://www.google.com"}>
          <Image src={googleLoginImage} alt="googleLoginImage" />
        </Link>
        <Link href={"https://www.kakaocorp.com/page"}>
          <Image src={kakaoLoginImage} alt="kakaoLoginImage" />
        </Link>
      </div>
    </div>
  );
}
