import React from 'react'
import Vector from '../../../../assets/Vector.png'
import Notebook from '../../../../assets/Frame.png'
import Image from 'next/image'

function Hotitem({data}) {
    return (
    <div className={`w-full flex flex-col bg-[#F9FAFB] px-6 pb-4 gap-[1rem] rounded-[0.5rem] md:w-[21.25rem] lg:w-[24rem]`}>
        <button className='w-[6.375rem] h-[1.875rem] rounded-br-[1rem] rounded-bl-[1rem] py-1 px-[1.5rem] gap-[0.625rem] bg-primary '> 
            <div className='w-full h-full flex flex-row item-center justify-center gap-1 pb-0.5'>
            <Image 
            src={Vector} width={16} height={16} alt="왕관"                 
            />
            <p className="font-semibold text-[1rem] leading-[1.625rem]  text-[#FFFFFF]">Best</p>
            </div>
        </button>



        <div className='w-[18.4375rem] h-[8.5rem] gap-[2.5rem] flex flex-col'>
            <div className='w-full h-[4.5rem] flex flex-row gap-[2.5rem] '>
                <p className='w-[11.4375rem] text-[#1F2937] text-[1.125rem] leading-[1.625rem] font-semibold '>{data.content}</p>
                <Image 
                src={data.image?? Notebook} width={72} height={72} alt="노트북"                                 
                />
            </div>
            <div className='flex flex-row justify-between item-center'>
                <div className='flex flex-row center item-center gap-2'>
                    <p>{data.userName}</p>     
                    <p>{data.likedCount}</p>     
                </div>
                <p>{data.createdAt.slice(0,10)}</p>     
            </div>
        </div>        
    </div>
)
}


export default Hotitem
