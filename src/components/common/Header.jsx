"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { getMe } from "@/lib/api";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    const fetchUser = async () => {
      try {
        const userData = await getMe(accessToken);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleProfileClick = () => {
    router.push("/mypage");
  };

  return (
    <div className="flex justify-between items-center px-[200px] py-[14px] border-b border-b-[#DFDFDF]">
      <div className="flex items-center gap-[32px]">
        <Link href="/">
          <Image src="/headerLogo.svg" alt="Logo" width={153} height={51} />
        </Link>
        <div className="flex gap-[40px]">
          <Link
            href="/free-board"
            className={`text-[18px] font-semibold ${
              pathname.startsWith("/free-board")
                ? "text-primary"
                : "text-primary-600"
            }`}
          >
            자유게시판
          </Link>
          <Link
            href="/market"
            className={`text-[18px] font-semibold ${
              pathname.startsWith("/market")
                ? "text-primary"
                : "text-primary-600"
            }`}
          >
            중고마켓
          </Link>
        </div>
      </div>

      {user ? (
        <div
          onClick={handleProfileClick}
          className="flex items-center gap-[6px] cursor-pointer"
        >
          <Image
            src={user.image || "/ic_profile.svg"}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-[18px] font-normal text-primary-600">
            {user.nickname}
          </span>
        </div>
      ) : (
        <Button
          className="py-[11.5px]"
          buttonText={"로그인"}
          onClick={handleLoginClick}
        />
      )}
    </div>
  );
}
