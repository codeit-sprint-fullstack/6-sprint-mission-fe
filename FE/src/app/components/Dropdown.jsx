"use client";

export default function Dropdown({
  items,
  className = "",
  containerClassName = "",
}) {
  return (
    <div className={`absolute z-50 ${containerClassName}`}>
      <div className={`flex flex-col ${className} `}>
        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="flex items-center justify-center w-full p-3 "
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
