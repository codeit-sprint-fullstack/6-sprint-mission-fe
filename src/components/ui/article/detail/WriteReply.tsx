import H2Title from '../../../common/H2Title'
import React from 'react'

function WriteReply() {
  return (
    <div className="mb-6">
      <H2Title>댓글달기</H2Title>
      <textarea className="bg-[#F3F4F6] rounded-xl px-6 py-4 mt-2 mb-4 w-full" placeholder='댓글을 입력해주세요.'></textarea>
      <div className="flex justify-end">
        <button className="btn-base">등록</button>
      </div>
    </div>
    
  )
}

export default WriteReply