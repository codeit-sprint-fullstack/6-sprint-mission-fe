import React from "react";

interface DropDownProps {
  options: string[];
  onSelect: (option: string) => void;
}

export default function DropDown({ options, onSelect }: DropDownProps) {
  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
