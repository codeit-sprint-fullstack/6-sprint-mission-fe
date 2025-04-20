"use client";

import searchImage from "@/assets/images/icons/ic_search.png";
import Image from "next/image";

export default function InputBox({
  placeHolderText,
  inputValueState,
  setInputValueState,
  inputType,
}) {
  return (
    <div className="bg-gray-100 rounded-xl flex px-4 items-center text-gray-400 gap-[10px] h-full mx-4">
      {inputType === "search" && (
        <Image src={searchImage} alt="reading glasses" className="w-4 h-4" />
      )}
      {inputType === "textarea" ? (
        <textarea
          className="w-full h-full py-4"
          placeholder={placeHolderText}
          value={inputValueState}
          onChange={(e) => setInputValueState(e.target.value)}
        />
      ) : (
        <input
          className="w-full h-full"
          placeholder={placeHolderText}
          value={inputValueState}
          onChange={(e) => setInputValueState(e.target.value)}
        />
      )}
    </div>
  );
}
