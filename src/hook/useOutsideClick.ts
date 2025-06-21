"use client";

import { useEffect, useRef, useState } from "react";

function useOutsideClick(initialState: boolean = false) {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return { isOpen, setIsOpen, dropDownRef };
}

export default useOutsideClick;
