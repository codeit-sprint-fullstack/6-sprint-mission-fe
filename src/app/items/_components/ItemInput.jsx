"use client";

const ItemInput = ({ placeholder, name, state, setState }) => {
  return (
    <div>
      <p className="text-[18px] font-[700] text-[#1f2937] mb-[16px]">{name}</p>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-[56px] px-[24px] rounded-[12px] bg-[#f3f4f6] outline-none"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default ItemInput;
