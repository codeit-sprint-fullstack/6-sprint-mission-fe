"use client";

import Image from "next/image";
import searchImage from "@/assets/images/icons/ic_search.png";
import closeEyeImage from "@/assets/images/icons/ic_close_eye.png";
import openEyeImage from "@/assets/images/icons/ic_open_eye.png";
import { useState } from "react";

export default function InputBox({
  placeHolderText,
  inputValueState,
  setInputValueState,
  inputType,
}) {
  const [toggleViewPasswordState, setToggleViewPasswordState] = useState(false);

  const handleOnClickTogglePassword = () => {
    setToggleViewPasswordState(!toggleViewPasswordState);
  };
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
          type={toggleViewPasswordState ? "text" : "password"}
          onChange={(e) => setInputValueState(e.target.value)}
        />
      )}
      {inputType === "password" && (
        <Image
          className="cursor-pointer"
          src={toggleViewPasswordState ? openEyeImage : closeEyeImage}
          alt={toggleViewPasswordState ? "openEyeImage" : "closeEyeImage"}
          onClick={handleOnClickTogglePassword}
        />
      )}
    </div>
  );
}
