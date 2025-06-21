'use client';
import React, { ReactNode } from 'react'
interface WriterProps {
  children?: ReactNode;
}
function Writer({children} : WriterProps) {
  return (
    <div className='sm:text-sm text-[#4B5563] font-[400]'>{children}</div>
  )
}

export default Writer