'use client';

import React, { useState } from 'react'
import BtnPrimarySmall from '../ui/article/BtnPrimarySmall';
interface ModalProps {
  text: string;
  btnLabel: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
function Modal({text, btnLabel, onClick} : ModalProps) {
    const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
       <div className="absolute inset-0 bg-black/50"></div>
      <div className="bg-white rounded-lg p-8 shadow-lg w-80 text-center sm:w-82 h-44 flex flex-col justify-center items-center z-90">
        <div className="flex flex-col justify-center items-center max-w-50 gap-4">
          <div >{text}</div>
          <BtnPrimarySmall onClick={onClick}>{btnLabel}</BtnPrimarySmall>
          </div>
        </div>
      </div>
  )
}

export default Modal