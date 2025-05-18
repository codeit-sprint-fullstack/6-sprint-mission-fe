"use client";

import Image from "next/image";
import Link from "next/link";

export default function AuthFormWrapper({ children }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <Link href="/">
        <Image
          src="/images/logo/logo.svg"
          alt="로고"
          width={396}
          height={132}
          className="mb-10"
        />
      </Link>
      <div>{children}</div>
    </main>
  );
}
