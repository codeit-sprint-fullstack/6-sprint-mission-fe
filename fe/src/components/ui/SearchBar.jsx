import InputBox from "./InputBox";
import SortButton from "./SortButton";

export default function SearchBar({
  inputValueState,
  setInputValueState,
  sortButtonState,
  setSortButtonState,
}) {
  return (
    <div className="flex justify-between">
      <div className="w-full h-[42px]">
        <InputBox
          placeHolderText={"검색할 상품을 입력해주세요"}
          inputValueState={inputValueState}
          setInputValueState={setInputValueState}
          inputType="search"
        />
      </div>
      <div className="btn-sm-square border-gray-200 border-2 text-FF mr-4">
        <SortButton
          sortButtonState={sortButtonState}
          setSortButtonState={setSortButtonState}
        />
      </div>
    </div>
  );
}
