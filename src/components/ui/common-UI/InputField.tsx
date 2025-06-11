import React, { ChangeEvent } from "react";

interface InputFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  height: string;
}

function InputField({
  value,
  onChange,
  onKeyDown,
  placeholder,
  height,
}: InputFieldProps) {
  return (
    <input
      className={`bg-third w-[1200px] ${height} rounded-[12px] pl-[24px]`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    ></input>
  );
}

export default InputField;
