'use client';

import React from 'react'
import { format } from 'date-fns';
import { Product } from '@/app/types';



function FormattedDate({createdAt}: { createdAt: string }) {
    const formattedDate = format(new Date(createdAt), "yyyy. M. d");

  return (
    <div className=' sm:text-sm text-[#4B5563] font-[400]'>{formattedDate}</div>
  )
}

export default FormattedDate