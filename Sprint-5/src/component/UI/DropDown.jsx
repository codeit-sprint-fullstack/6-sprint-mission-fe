import { useState } from "react";
import './DropDown.css'
import DropArrow from '/ic_arrow_down.png'

export const Dropdown = ({ orderBy, setOrderBy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { label: "최신순", value: "recent" },
    { label: "인기순", value: "favorite" },
  ];

  const handleSelect = (value) => {
    setOrderBy(value);
    setIsOpen(false); 
  };

  return (
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {orderBy === "recent" ? "최신순" : "인기순"}
        <img src={DropArrow} />
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className={`dropdown-item ${orderBy === option.value ? "active" : ""}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
