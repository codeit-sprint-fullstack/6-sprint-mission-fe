'use client'

import React from 'react'
import ImgSocialGoogle from '@/app/images/ic_social_google.png'
import ImgSocialKakao from '@/app/images/ic_social_kakao.png'
import Image from 'next/image'

const SocialLogin = () => {
  return (
    <div className="my-6 w-full bg-[#E6F2FF] flex justify-between items-center py-4 px-6 rounded-lg">
      <div className="flex-1 font-[600]">
        간편 로그인하기
      </div>
      <div className="flex gap-4">
        <a href="/"><Image src={ImgSocialGoogle} className="w-10 h-10" alt="구글 소셜로그인"/></a>
        <a href="/"><Image src={ImgSocialKakao} className="w-10 h-10" alt="카카오 소셜로그인"/></a>
      </div>
    </div>
  )
}

export default SocialLogin