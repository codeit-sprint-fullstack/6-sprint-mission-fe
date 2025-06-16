import Link from "next/link";
import { TbArrowBack } from "react-icons/tb";

export default function BackToList() {
  return (
    <Link className="mt-8 flex justify-center" href="/community">
      <button className="flex cursor-pointer items-center justify-center rounded-full bg-[#3692FF] px-6 py-3 text-[16px] font-medium text-white transition-colors hover:bg-blue-600">
        목록으로 돌아가기
        <TbArrowBack size={24} className="ml-2" />
      </button>
    </Link>
  );
}
