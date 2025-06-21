import React, { ReactNode } from 'react'
interface H2TitleProps {
  children: ReactNode;
  className?: string;
}
export default function H2Title({ children, className } : H2TitleProps) {
  return (
    <div className={`sm:text-l md:text-xl font-[700] flex items-center ${className}`}>{ children }</div>
  )
}
