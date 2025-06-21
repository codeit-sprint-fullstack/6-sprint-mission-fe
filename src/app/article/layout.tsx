import React, { ReactNode } from 'react'
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer"
interface ArticleLayoutProps {
    children: ReactNode;
}
export default function ArticleLayout({ children } : ArticleLayoutProps) {
    return (
        <div className="sm:mt-17.5 flex flex-col  h-screen">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}
