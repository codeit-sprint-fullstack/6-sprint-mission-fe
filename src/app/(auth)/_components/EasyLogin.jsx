import Images from "@/components/ui/Images";

function EasyLogin() {
  return (
    <div className="w-full h-[74px] flex items-center justify-between px-[24px] bg-[#E6F2FF] rounded-[8px] mb-[25px]">
      <p>간편 로그인하기</p>
      <div className="flex items-center gap-[16px]">
        <a
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Images
            src={"/googleLogin.png"}
            w={"w-[42px]"}
            h={"h-[42px]"}
            alt={"구글로그인"}
          />
        </a>
        <a
          href="https://www.kakaocorp.com/page/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Images
            src={"/kakoLogin.png"}
            w={"w-[42px]"}
            h={"h-[42px]"}
            alt={"카카오로그인"}
          />
        </a>
      </div>
    </div>
  );
}

export default EasyLogin;
