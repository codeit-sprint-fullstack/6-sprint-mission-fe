"use client";

import Image from "next/image";
import searchImage from "@/assets/images/icons/ic_search.png";
import closeEyeImage from "@/assets/images/icons/ic_close_eye.png";
import openEyeImage from "@/assets/images/icons/ic_open_eye.png";
import { useState } from "react";
import clsx from "clsx";

export default function InputBox({
  placeHolderText,
  inputValueState,
  onChangeInput,
  inputType,
  onBlur,
  error,
  isValid,
  inputClassName,
}) {
  const [toggleViewPasswordState, setToggleViewPasswordState] = useState(false);

  const handleOnClickTogglePassword = () => {
    setToggleViewPasswordState(!toggleViewPasswordState);
  };

  return (
    <div className={`w-full `}>
      <div
        className={clsx(
          `${inputClassName} bg-gray-100 rounded-xl flex px-4 items-center text-gray-400 gap-[10px] border`,
          {
            "border-error-red border-1": error,
            "border-brand-blue border-2": isValid,
            "border-none": !error && !isValid,
          }
        )}
      >
        {inputType === "search" && (
          <Image src={searchImage} alt="search icon" className="w-4 h-4" />
        )}
        {inputType === "textarea" ? (
          <textarea
            className="w-full h-full py-4 bg-transparent"
            placeholder={placeHolderText}
            value={inputValueState}
            onChange={onChangeInput}
            onBlur={onBlur}
          />
        ) : (
          <input
            className="w-full h-full bg-transparent"
            placeholder={placeHolderText}
            value={inputValueState}
            type={
              inputType === "password"
                ? toggleViewPasswordState
                  ? "text"
                  : "password"
                : inputType
            }
            onChange={onChangeInput}
            onBlur={onBlur}
          />
        )}
        {inputType === "password" && (
          <Image
            className="cursor-pointer"
            src={toggleViewPasswordState ? openEyeImage : closeEyeImage}
            alt="toggle eye icon"
            onClick={handleOnClickTogglePassword}
          />
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm-semibold mt-3 ml-3">{error}</p>
      )}
    </div>
  );
}
