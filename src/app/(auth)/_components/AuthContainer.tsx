"use client";

import { Logo } from "@/assets/svgs";
import { ChildrenProps } from "@/types";
import Link from "next/link";
import React from "react";

function AuthContainer({ children }: ChildrenProps) {
  return (
    <div className="flex flex-col items-center px-4 pt-[80px] pb-[179px] md:px-13">
      <Link href="/">
        <Logo
          aria-label="판다마켓 로고"
          className="mb-6 h-[66px] w-[198px] md:h-[132px] md:w-[396px]"
        />
      </Link>
      {children}
    </div>
  );
}

export default AuthContainer;
