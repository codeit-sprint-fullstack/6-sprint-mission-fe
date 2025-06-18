"use client";

import { ChildrenProps } from "@/types";
import Link from "next/link";
import React from "react";
import Logo from "@/assets/svgs/logo.svg";

function AuthContainer({ children }: ChildrenProps) {
  return (
    <div className="flex flex-col items-center px-4 pt-[80px] pb-[179px] md:px-13">
      <Link href="/">
        <Logo alt="판다마켓 로고" className="mb-6 h-[66px] w-[198px] md:h-[132px] md:w-[396px]" />
      </Link>
      <div className="w-full lg:max-w-[640px]">{children}</div>
    </div>
  );
}

export default AuthContainer;
