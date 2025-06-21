'use client';

import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function Menu() {
  const pathname = usePathname();

  const navItems = [
    { label: '자유게시판', path: '/article'},
    { label: '중고마켓', path: '/items' }
  ];

  return (
    <div className="flex flex-1 justify-start gap-2 ml-4 sm:text-m">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.path);
        return (
          <Link 
            key={item.path}
            href={item.path}
            className={`font-[600] ${isActive ? 'text-blue-600 font-bold' : '' }`}
            >
            {item.label}
          </Link>
        ) 
      })}
    </div>
  )
}

export default Menu