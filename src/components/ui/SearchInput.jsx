import Image from "next/image";
import searchIcon from "@/app/assets/icons/ic-search.svg";
export default function SearchInput({ value, onChange }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-[9px] bottom-[9px]">
        <Image src={searchIcon} width={24} height={24} alt="검색 아이콘" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-[288px] h-[42px] pl-11 bg-secondary-100 rounded-xl placeholder:text-secondary-400 "
        placeholder="검색할 상품을 입력해주세요"
      />
    </div>
  );
}
