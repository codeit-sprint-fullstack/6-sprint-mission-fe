'use client';

import React from 'react'
import Link from 'next/link'
import logo_big from '../../app/images/logo_h1.png'
import logo_small from '../../app/images/logo.png'
import Image from 'next/image'

type TbigLogo = {
    src : string;
    imageClass: string;
    textClass: string;
}

type TtitleType  =  {
    header: TbigLogo;
    login: TbigLogo;
    signup: TbigLogo;
}
const bigLogo : TbigLogo = { 
    src : logo_big,
    imageClass: " w-13 h-13 md:w-[106px] md:h-[106px]",
    textClass: "text-[2rem] md:text-[4rem] text-[700] lg:ml-3"
}

const titleType : TtitleType = {
    header : {
        src : logo_small,
        imageClass: "hidden md:block md:w-10 md:h-10 ",
        textClass: "sm:text-lg md:text-xl lg:text-2xl"
    },
    login : bigLogo,
    signup: bigLogo,
}

interface H1TitleProps {
    logoType? : 'header' | 'login' | 'signup';
}

function H1Title({logoType = "header"} : H1TitleProps) {
    return (
        <div>
        <Link href="/" className=" flex justify-between items-center gap-2">
            <Image src={titleType[logoType].src} className={titleType[logoType].imageClass}  alt="판다마켓 로고"/>
            <h1 className={`${titleType[logoType].textClass} 
            text-blue-500 
            font-bold
            flex-1
        `}>판다마켓</h1>
        </Link>
    </div>
    )
}

export default H1Title