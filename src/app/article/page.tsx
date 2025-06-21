"use client";

import React, { JSX } from 'react'
import axios from "axios";
import BestArticleCard from '@/components/ui/article/BestArticleCard'
import H2Title from '@/components/common/H2Title'
import BtnWriteArticle from '@/components/ui/article/BtnWriteArticle'
import Search from '@/components/ui/article/Search'
import Sorting from '@/components/ui/article/Sorting'
import ArticleList from '@/components/ui/article/ArticleList'
import PageLayout from '@/components/common/PageLayout'
import { useEffect, useState } from "react";
import { Article } from '@/app/types';

const ArticlePage = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles?orderBy=recent`);
                setArticles(response.data.list);
                setError(null);
            } catch (e) {
                console.error(e);
                setArticles([]);
                setError("서버에 연결할 수 없습니다.");
            } finally {
                setLoading(false);
            }
        }
        fetchArticles();
    }, [])

    return (
        <PageLayout>
            <H2Title>베스트 게시글</H2Title>
            <BestArticleCard />
            <div className="flex justify-between">
                <H2Title className="flex-1">게시판</H2Title>
                <BtnWriteArticle />
            </div>
            <div className="flex justify-between gap-2.5 items-center mt-4 sm:mb-4 md:mb-10">
                <Search />
                <Sorting />
            </div>
            <ArticleList articles={articles} />
        </PageLayout>
    )
}

export default ArticlePage;