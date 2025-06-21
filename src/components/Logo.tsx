import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center w-50 gap-3">
        <Image alt="logo" src="/assets/ic/ic_logo.png" width={52} height={52} />
        <p className="text-primary-100 font-bold text-[33px] title-font">
          판다마켓
        </p>
      </div>
    </Link>
  );
}

export default Logo;
