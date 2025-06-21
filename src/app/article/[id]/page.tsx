"use client";

import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import PageLayout from '../../../components/common/PageLayout'
import { useParams } from 'next/navigation';
import ArticleHeader from '../../../components/ui/article/detail/ArticleHeader'
import ArticleContent from '../../../components/ui/article/detail/ArticleContent'
import WriteReply from '../../../components/ui/article/detail/WriteReply'
import CommentList from '../../../components/ui/article/detail/CommentList'
import { useRouter } from 'next/navigation';
import BtnPrimaryBig from '../../../components/common/BtnPrimaryBig';
import { useAuth } from '../../../provider/AuthProvider';
import { Article } from '@/app/types';

export default function ArticlePage() {
    const { id } = useParams();
    const [article, setArticle] = useState<Article | null>(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { user } = useAuth();

    
    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`);
                //const commentRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}/comments`);
                
                setArticle(res.data);
                //setComments(commentRes.data);
                
            } catch (e) {
                console.error(e);
                alert("서버 에러 입니다")
                console.log("🔍 호출 URL:", `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`);
            } finally {
                setLoading(false);
            }
        }
        fetchArticle();
    }, [id])

    if (!article) return <div>로딩중...</div>;
    
    return (
        <PageLayout>
            <ArticleHeader title={article.title} />
            <ArticleContent content={article.content} />
            <WriteReply />
            {/* <CommentList comments={comments} id={id} /> */}
            <div className="flex justify-center mt-10">
                <BtnPrimaryBig type="button" px="px-8" onClick={() => router.back()}>목록으로 돌아가기</BtnPrimaryBig>
            </div>
        </PageLayout>
    )
}