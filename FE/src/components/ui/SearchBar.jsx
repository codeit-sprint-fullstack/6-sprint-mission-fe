import InputBox from "./InputBox";
import SortButton from "./SortButton";

export default function SearchBar({
  inputValueState,
  onChangeInput,
  sortButtonState,
  setSortButtonState,
}) {
  return (
    <div className="flex justify-between gap-2">
      <div className="w-full">
        <InputBox
          placeHolderText={"검색할 상품을 입력해주세요"}
          inputValueState={inputValueState}
          onChangeInput={onChangeInput}
          inputType="search"
          inputClassName={"h-[42px]"}
        />
      </div>
      <div className="btn-sm-square border-gray-200 border-2 text-FF ">
        <SortButton
          sortButtonState={sortButtonState}
          setSortButtonState={setSortButtonState}
        />
      </div>
    </div>
  );
}
