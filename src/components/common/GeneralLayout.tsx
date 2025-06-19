"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface IGeneralLayoutProps {
  children: ReactNode;
}

export default function GeneralLayout({ children }: IGeneralLayoutProps) {
  const path = usePathname();

  return (
    <>
      {path.startsWith("/auth") ? (
        children
      ) : (
        <div className="flex justify-center items-center p-[16px] sm:p-[24px]">
          <div className="flex flex-col w-full max-w-[1200px]">{children}</div>
        </div>
      )}
    </>
  );
}
