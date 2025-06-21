import React from 'react'

function BestArticleCard() {
  return (
    <div className={`
      sm:mt-4
      sm:mb-4
      md:mt-6
      md:mb-6
    `}>
      <div className={` 
        sm:w-full 
        bg-[#f9fafb] 
        h-49 
        rounded-[8px]
        border-1
        p-6
      `}>
        <div className="flex justify-between mb-10">
          <div className='flex-1'>타이틀</div>
          <div>이미지 영역</div>
        </div>
        <div  className="flex justify-between gap-1.5">
          <div >닉네임</div>
          <div className='flex-1 justify-start'>라이크 수</div>
          <div>2024. 04. 16</div>
        </div>
      </div>
    </div>
  )
}

export default BestArticleCard