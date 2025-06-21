"use client";
import React from "react";
import OrderDropdown from "./OrderDropdown";
import useOutsideClick from "@/hook/useOutsideClick";
import Image from "next/image";

interface OrdersProps {
  setOrder: (value: "recent" | "favorite") => void;
}

function Orders({ setOrder }: OrdersProps) {
  const { isOpen, setIsOpen, dropDownRef } = useOutsideClick();
  const handleClick = () => {
    setIsOpen((prev: boolean) => !prev);
  };
  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className="bg-white border border-gray-200 rounded-xl w-11 h-11 flex justify-center items-center md:w-32 md:gap-6"
      >
        <p className="hidden md:block">최신순</p>
        <Image
          alt="arrow down"
          src="/assets/ic/ic_arrow_down.png"
          className="hidden md:block"
          width={20}
          height={20}
        />
        <Image
          alt="drop"
          width={14}
          height={12}
          className="md:hidden"
          src="/assets/ic/ic_drop.png"
        ></Image>
      </div>
      {isOpen && (
        <div ref={dropDownRef} className="absolute right-0 top-full mt-1 z-50">
          <OrderDropdown setOrder={setOrder} />
        </div>
      )}
    </div>
  );
}

export default Orders;
