import { useState } from "react";
import dropDownIcon from "../../assets/ic_arrow_down.png";
import mobileSortBtn from "../../assets/btn_sort.png";
import Image from "next/image";

type SortDropdownProps = {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
};
type Option = {
  label: string;
  value: string | undefined;
};

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const options: Option[] = [
    { label: "최신순", value: "latest" },
    { label: "좋아요순", value: "likes" },
  ];

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="flex-shrink-0 relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between 
                  md:w-[8rem] md:h-[2.625rem] md:border md:border-gray-300 
                  rounded-[0.75rem] md:px-4 py-2 bg-white text-sm"
      >
        <span className="hidden md:inline">{selectedOption.label}</span>
        <Image
          src={dropDownIcon}
          width={16}
          height={8}
          alt="드롭다운 아이콘"
          className="hidden md:block"
        />
        <Image
          src={mobileSortBtn}
          width={42}
          height={42}
          alt="작은화면 정렬버튼"
          className="block md:hidden"
        />
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-[8rem] bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
