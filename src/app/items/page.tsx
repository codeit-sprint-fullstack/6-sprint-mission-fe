"use client";

import React from 'react'
import axios from 'axios';
import H2Title from '../../components/common/H2Title'
import BtnWriteArticle from '../../components/ui/article/BtnWriteArticle'
import ItemBoxList from '../../components/ui/item/ItemBoxList'
import PageLayout from '../../components/common/PageLayout'

import { useEffect, useState } from "react";

export default function MarketPage() {

    const [products, setProducts] = useState({ recent: [], favorite: [] });
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const [recentRes, favoriteRes] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`),
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`)
                ]);

                setProducts({
                    recent: recentRes.data.list,
                    favorite: favoriteRes.data.list
                });
            } catch (e) {
                console.error(e);
                alert("서버 에러 입니다")
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [])

    return (
        <PageLayout>
            <H2Title>베스트 상품</H2Title>
            <ItemBoxList products={products.recent} section="best" num="3" />
            <H2Title>판매 중인 상품</H2Title>
            <ItemBoxList products={products.favorite} section="recent" />
        </PageLayout>
    )
}

