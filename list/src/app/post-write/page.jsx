import Input from "@/components/ui/Input";
import Link from "next/link";

export default function PostWrite() {
  return (
    <div className="flex flex-col items-center w-full min-h-[800px] bg-white">
      <div className="w-full max-w-[900px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-black font-bold text-xl">게시글 쓰기</h1>
          <Link href="/board/1">
            <button className="bg-gray-300 text-white px-6 py-2 rounded-lg font-medium cursor-pointer">
              등록
            </button>
          </Link>
        </div>
        <div className="mb-6">
          <h2 className="text-base font-bold text-black mb-2">*제목</h2>
          <Input title="제목" />
        </div>
        <div>
          <h2 className="text-base font-bold text-black mb-2">*내용</h2>
          <Input title="내용" height="282" />
        </div>
      </div>
    </div>
  );
}
