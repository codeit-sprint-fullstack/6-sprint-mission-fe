'use client';

import React, { ReactNode } from 'react'
interface FormLayoutProps {
    children : ReactNode;
}
export default function FormLayout({ children }: FormLayoutProps) {
    return (
        <main className="flex flex-col justify-start">{children}</main>
    );
}