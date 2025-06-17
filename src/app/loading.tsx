import LoadingSpinner from "@/assets/svgs/spinner.svg";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <LoadingSpinner alt="로딩 아이콘" className="w-20" />
      <p className="translate-x-1 animate-pulse font-bold">Loading...</p>
    </div>
  );
}
