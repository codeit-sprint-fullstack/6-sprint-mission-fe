import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import React from 'react'

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
export const metadata = {
    title: "Panda Market Login",
};

export default function AuthLayout({ children }) {
    return (
        <main className="flex justify-center items-center py-20">{children}</main>
    );
}

