import React from 'react'
//재사용 유무로 컴포넌트화가 갈림
// 가독성 좋게 하기 위해 커포넌트화 할 것
function Footer() {
  return (
    <div className="bg-[#111827] pt-8 pb-14">
      <div className={`
        max-w-screen-xl 
        min-w-screen-sm 
        mx-auto
        sm:px-4
      `}>
          <div className="flex justify-between text-[#E5E7EB] mb-6" >
            <div className="flex flex-1 justify-between gap-12">
              <div>Privacy Policy</div>
              <div className="flex-1">FAQ</div>
            </div>
            <div className="flex justify-between gap-2">
              <a>페</a>
              <a>트</a>
              <a>유</a>
              <a>인</a>
            </div>
          </div>
          <div className='text-[#9CA3AF]'>@codeit - 2024</div>
      </div>
    </div>
  )
}

export default Footer