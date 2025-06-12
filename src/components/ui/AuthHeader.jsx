import Image from "next/image";
import React from "react";
import logo from "@/app/assets/images/img-logo-with-text.svg";

export default function AuthHeader() {
  return (
    <>
      <div className="relative w-[198px] h-[66px] md:w-[396px] md:h-[132px]">
        <Image src={logo} alt="판다마켓 로고" fill className="object-cover" />
      </div>
    </>
  );
}
