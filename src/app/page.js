import Btn from "@/components/ui/Btn";
import Dropdown from "@/components/ui/Dropdown";
import Search from "@/components/ui/Search";

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col pt-[94px] w-[1200px] font-pretendard">
        <div className="font-bold text-[20px]">베스트 게시글</div>

        <div className="flex flex-row mt-[24px]">
          <div>베스트 상품 map 하기</div>
        </div>

        <div className="flex flex-row items-center justify-between mt-[40px] mb-[24px]">
          <div className="font-bold text-[20px]">게시글</div>
          <Btn text="글쓰기" />
        </div>

        <div className="flex flex-row justify-between">
          <Search /> <Dropdown />
        </div>
      </div>
    </div>
  );
}
