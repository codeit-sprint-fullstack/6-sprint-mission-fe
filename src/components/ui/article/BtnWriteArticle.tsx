"use client";

import { useRouter } from 'next/navigation';
import React from 'react'

function BtnWriteArticle() {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/article/write`);
  }
  return (
    <div>
      <button className='btn-base'
        onClick={handleClick}
      >
        글쓰기
      </button>
    </div>
  )
}

export default BtnWriteArticle