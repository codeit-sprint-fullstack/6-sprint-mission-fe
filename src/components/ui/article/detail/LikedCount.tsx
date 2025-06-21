'use client';

import Image from 'next/image';
import React, { ReactNode } from 'react'
import like_off from '../../../../app/images/Icon_like_off.png'

interface LikedCountProps {
  children?: ReactNode;
}

function LikedCount({children} : LikedCountProps) {
  return (
    <div className='flex justify-between items-center h-9 border border-[#E5E7EB] rounded-full gap-1 px-3'>
      <Image src={like_off} alt="좋아요 수" width={20} />
      {children}
    </div>
  )
}

export default LikedCount