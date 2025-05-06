import React from "react";
import "./text.scss";

export function UserName({ children }) {
  return <span className="text-14-400 text-gray-600">{children}</span>;
}

export function Title20({
  weight = "weight700",
  color = "gray800",
  children,
  className,
}) {
  const textClass = `${weight} ${color} ${className} text-[18px] md:text-[20px]`;

  return <h3 className={`${textClass}`}>{children}</h3>;
}

export function Title18({
  weight = "weight700",
  color = "gray800",
  children,
  className,
}) {
  const textClass = `${weight} ${color} ${className} text-[14px] md:text-[18px]`;

  return <h3 className={`${textClass}`}>{children}</h3>;
}

export function Text({ color = "gray800", children, className }) {
  const textClass = `${color} ${className} text-[16px] lg:text-[18px] font-[400] `;

  return <p className={`${textClass}`}>{children}</p>;
}
