'use client'

import React from 'react'
import Link from 'next/link'
interface AreYouAlreadyAMemberProps {
  pageType?: 'login' | 'signup';
}
function AreYouAlreadyAMember({pageType = "login" } : AreYouAlreadyAMemberProps) {
  
  const page = {
    login : {
      spanText : "판다마켓이 처음이신가요?",
      href: "/signup",
      linkText: "회원가입"
    },
    signup : {
      spanText : "이미 회원이신가요?",
      href: "/login",
      linkText: "로그인"
    }
  }
  

  return (
    <div className= "text-sm flex justify-center gap-1">
      <span>{page[pageType]["spanText"]}</span>
      <Link href={page[pageType]["href"]} className="underline text-[#3182F6]">{page[pageType]["linkText"]}</Link>
    </div>
  )
}

export default AreYouAlreadyAMember