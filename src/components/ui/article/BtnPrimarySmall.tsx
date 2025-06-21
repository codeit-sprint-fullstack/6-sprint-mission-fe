'use client'
import React, { ReactNode } from 'react'
interface BtnPrimarySmallProps {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function BtnPrimarySmall({ children, onClick} :BtnPrimarySmallProps ) {
  return (
    <button onClick={onClick} className="bg-sky-500 px-4 py-2 rounded-[4px] text-white font-[600] cursor-pointer">{children}</button>
  )
}

export default BtnPrimarySmall