"use client";

import { ChildrenProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function AuthContainer({ children }: ChildrenProps) {
  return (
    <div className="flex flex-col items-center px-4 pt-[80px] pb-[179px] md:px-13">
      <Link href="/">
        {
          <Image
            src="/assets/logo/logo_md.svg"
            alt="판다마켓 로고"
            width={198}
            height={66}
            className="mb-6 block md:hidden"
          />
        }
        {
          <Image
            src="/assets/logo/logo_lg.svg"
            alt="판다마켓 로고"
            width={396}
            height={132}
            className="mb-6 hidden md:block"
          />
        }
      </Link>
      {children}
    </div>
  );
}

export default AuthContainer;
