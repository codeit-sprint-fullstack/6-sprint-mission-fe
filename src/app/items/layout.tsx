import React, { ReactNode } from 'react'
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer"

interface MarketLayoutProps {
  children: ReactNode;
}

export default function MarketLayout({ children } : MarketLayoutProps) {
    return (
        <div className="sm:mt-17.5 flex flex-col h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}
