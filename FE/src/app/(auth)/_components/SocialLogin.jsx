import Image from "next/image";
import googleLoginImage from "@/assets/images/icons/ic_google.png";
import kakaoLoginImage from "@/assets/images/icons/ic_kakao.png";

export default function SocialLogin() {
  return (
    <div className="bg-EF h-19 flex justify-between p-4 items-center rounded-lg text-gray-800">
      <p>간편 로그인하기</p>
      <div className="flex gap-2">
        <Image src={googleLoginImage} alt="googleLoginImage" />
        <Image src={kakaoLoginImage} alt="kakaoLoginImage" />
      </div>
    </div>
  );
}
