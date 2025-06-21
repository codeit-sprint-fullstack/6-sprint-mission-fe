import React, { ReactNode } from 'react'

interface BtnPrimaryBigProps{
  children?: ReactNode;
  disabled? : boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type? : "submit" | "reset" | "button" | undefined;
  text?: string;
  px?: string;
}
function BtnPrimaryBig({ children, disabled = false, onClick, type="submit", text, px } : BtnPrimaryBigProps) {
  return (
    <button type={type}  disabled={disabled} onClick={onClick} className= {`py-4 rounded-full text-white font-[600] ${px} ${text} ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-500  cursor-pointer' }`}>{ children }</button>
  )
}

export default BtnPrimaryBig