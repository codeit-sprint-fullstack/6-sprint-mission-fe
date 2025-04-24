import Link from "next/link";

export default function AuthRedirectMessage({ message, link }) {
  return (
    <div className="mt-2 mb-[50px] flex w-full items-center justify-center gap-[10px]">
      {message}
      <Link href={link} className="text-[#3692ff] underline">
        {link === "/sign-in" ? "로그인" : "회원가입"}
      </Link>
    </div>
  );
}
