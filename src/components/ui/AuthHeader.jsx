import Image from "next/image";
import React from "react";

export default function AuthHeader() {
  return (
    <>
      <Image
        src="/logo/logo-md.svg"
        width={198}
        height={66}
        alt="판다마켓 로고"
        className="block md:hidden"
      ></Image>
      <Image
        src="/logo/logo-lg.svg"
        width={396}
        height={132}
        alt="판다마켓 로고"
        className="hidden md:block"
      ></Image>
    </>
  );
}
