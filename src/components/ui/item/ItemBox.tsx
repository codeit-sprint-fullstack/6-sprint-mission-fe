"use client";

import React, { JSX } from 'react'
import Image from 'next/image';
import rpi01 from '@/app/images/product/rpi01.png'
import ActionDropDown from '@/components/ui/ActionDropDown';
import Writer from '@/components/ui/article/detail/Writer'
import LikedCount from '@/components/ui/article/detail/LikedCount'
import FormattedDate from '@/components/common/FormattedDate';
import ic_profile from '@/app/images/ic_profile.png'
import { Product } from '@/app/types';

interface ItemBoxProps {
  product: Product;
}


function ItemBox({product} : ItemBoxProps) {
  
  return (
    <div >
      <div className="flex sm:flex-col md:flex-row gap-4  mb-10">
        <div className="md:flex-1/2">
          <Image src={
              product?.image ? 
              product.image :
              rpi01
              } 
              alt={Array.isArray(product?.tags) ? product.tags.join(", ") : "상품 이미지"} 
              className='rounded-[20px] lg:rounded-2xl aspect-square object-cover w-full'
            />
        </div>
        <div className="md:flex-1/2">
          <div className="flex justify-between">
            <div className="flex-1">
              <div className='font-bold sm:text-base md:text-xl lg:text-2xl mb-2 lg:mb-4'>{product.name}</div>
              <div className='font-bold sm:text-2xl md:text-[32px] lg:text-[40px]'>{(Number(product.price)).toLocaleString()}</div>
            </div>
            <ActionDropDown />
          </div>
          <div className="border-t border-gray-300 mt-4 mb-10">
            <div className=" py-4 font-bold text-sm
            ">
                상품 소개
            </div>
            <div className="text-base text-[#1F2937]">
              {product.description}
            </div>
            <div className="border-gray-300 mt-6 mb-2 font-bold text-sm
            ">
                상품 태그
            </div>
            <div className="flex gap-1 min-h-9">
              { 
              product.tags?.map((tag:string, index:number) => 
              <span key={index} className=" bg-[#F3F4F6] py-1 px-4 text-base rounded-full">
                  #{tag.trim()}
              </span>
              )}
            </div>
          </div>
          <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center gap-4'>
                  <div><Image src={ic_profile} alt='프로필 이미지' /></div>
                  <div>
                    <Writer >{product.ownerNickname}</Writer >
                    {product.createdAt && <FormattedDate createdAt={product.createdAt} />}
                </div>
              </div>
            <LikedCount>{product.favoriteCount}</LikedCount >
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default ItemBox