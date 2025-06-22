import React from "react";

interface TagProps {
  text: string;
  className?: string;
}

export default function Tag({ text, className = "" }: TagProps) {
  return (
    <span
      className={`inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded ${className}`}
    >
      {text}
    </span>
  );
}
