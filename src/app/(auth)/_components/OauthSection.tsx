import Image from "next/image";

export default function OauthSection() {
  return (
    <div className="mb-5 flex h-[74px] w-full max-w-[400px] items-center justify-between rounded-[8px] bg-[#e6f2ff] px-5 md:max-w-none">
      <span>간편 로그인하기</span>
      <div className="flex items-center justify-center gap-4">
        <a href="https://www.google.com">
          <Image
            src="/img/google_icon.png"
            alt="google"
            width={36}
            height={36}
          />
        </a>
        <a href="https://www.kakao.com">
          <Image src="/img/kakao_icon.png" alt="kakao" width={36} height={36} />
        </a>
      </div>
    </div>
  );
}
