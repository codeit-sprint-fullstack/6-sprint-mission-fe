import React from "react";

function InputField({ placeholder, height }) {
  return (
    <input
      className={`bg-third w-[1200px] ${height} rounded-[12px] pl-[24px]`}
      placeholder={placeholder}
    ></input>
  );
}

export default InputField;
