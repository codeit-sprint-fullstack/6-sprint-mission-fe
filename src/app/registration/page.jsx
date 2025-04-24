"use client";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import PasswordInput from "@/components/ui/PasswordInput";
//find out which part can be separated as client component and keep this main page as server component
import Image from "next/image";
import Link from "next/link";
import RegistrationForm from "./_components/RegistrationForm";

export default function RegistrationPage() {
  return (
    <>
      {/* wrapper */}
      <div className="flex flex-col items-center justify-center max-w-[640px] max-h-[842px] w-full h-full gap-6 md:gap-10 mx-4 mt-6 mb-[179px] md:mx-[53px] md:mt-[48px] md:mb-[243px]">
        {/* header */}
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
        <RegistrationForm/>      
      </div>
    </>
  );
}
