import React from 'react'

import Notebook from '../../../../assets/Frame.png'
import face from '../../../../assets/face.png'
import Image from 'next/image'

function Post({data}) {    
  return (
    <div className='w-full h-[8.5rem] flex flex-col items-center gap-[1.5rem] bg-[background: #FCFCFC] pb-[1.5rem] border-b border-gray-200'>
        <div className='w-full h-[4.5rem] flex flex-row justify-between gap-2'>
            <p className='flex-grow text-[#1F2937] text-[1.125rem] leading-[1.625rem] font-semibold '>{data.title}</p>
            <Image src={data.image?? Notebook} width={72} height={72} alt="노트북" />
        </div>
        <div className='w-full flex flex-row justify-between items-center'>
            <div className='flex flex-row center items-center gap-2'>
            <Image src={face} width={24} height={24} alt="기본얼굴이미지" />
                <p>{data.writer.nickname}</p>     
                <p>{data.createdAt.slice(0, 10)}</p>
            </div>
            <p>{data.likeCount}</p>     
        </div>
    </div>
  )
}

export default Post