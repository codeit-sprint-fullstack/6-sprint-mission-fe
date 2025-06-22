"use client";

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  items: DropdownItem[];
  className?: string;
  containerClassName?: string;
}

export default function Dropdown({
  items,
  className = "",
  containerClassName = "",
}: DropdownProps) {
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
