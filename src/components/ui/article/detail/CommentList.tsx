"use client";

import React from 'react'
import ActionDropDown from '@/components/ui/ActionDropDown'
import ic_profile from '@/app/images/ic_profile.png'
import Image from 'next/image';
import NhoursBefore from '@/components/common/NhoursBefore'

interface CommnetListProps {
  comments: string;
}
function CommnetList({comments} : CommnetListProps) {

  if (!Array.isArray(comments)) {
    return <div>댓글이 없습니다.</div>;
  }

  return (
    <div>
      {comments.map((comment) => (
    
    <div key={comment.id} className="border-b border-[#E5E7EB] pb-1 bg-[#FCFCFC] mb-6">
        <div className="flex justify-between sm:gap-1 text-sm">
          <div>{comment.content}</div>
          <ActionDropDown />
        </div>
        <div className="flex justify-start gap-2 mt-6">
        <Image src={ic_profile} alt="프로필이미지" className="h-8 w-8" />
        <div>
          <div className="text-sm font-[#4B5563] mb-1">똑똑한판다</div>
          <div className="text-sm font-[#9CA3AF]"><NhoursBefore createdAt={comment.createdAt} /></div>
        </div>
        
        </div>
    </div>
      ))}
    </div>
  )
}

export default CommnetList







  