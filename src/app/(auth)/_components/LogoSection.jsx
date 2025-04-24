import Image from "next/image";
import Link from "next/link";

export default function LogoSection() {
  return (
    <div className="flex h-[150px] items-center justify-center">
      <Image src="/img/panda_icon_big.png" alt="logo" width={56} height={56} />
      <Link
        href="/"
        className="ml-5 font-['ROKAF_Sans'] text-[2.5rem] font-bold text-[#3692FF]"
      >
        판다마켓
      </Link>
    </div>
  );
}
