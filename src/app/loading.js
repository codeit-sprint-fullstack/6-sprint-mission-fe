import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Image
        src="/assets/icon/ic_spinner.gif"
        alt="로딩 아이콘"
        width={50}
        height={50}
      />
      <p className="font-bold translate-x-1 animate-pulse">Loading...</p>
    </div>
  );
}
