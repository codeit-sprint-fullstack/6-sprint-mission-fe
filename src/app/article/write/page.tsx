"use client";
import React, { useState } from 'react'
import PageLayout from '../../../components/common/PageLayout'
import H2Title from '../../../components/common/H2Title'
import { useRouter } from 'next/navigation';

export default function WritePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)  =>  {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content })
        });

        if (res.ok) {
            const result = await res.json();
            router.push(`/article/${result.id}`);
        } else {
            alert("등록 실패");
        }
    }
    return (
        <PageLayout>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between">
                    <H2Title>게시글 쓰기</H2Title>
                    <button className='btn-base' type="submit">등록</button>
                </div>
                <div className="mt-9">
                    <h3 className="mb-3 font-[700] text-sm">* 제목</h3>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해주세요" className="bg-[#F3F4F6] h-14 w-full px-6 rounded-xl text-[16px]" />
                    <h3 className="mb-3 font-[700] text-sm mt-6">* 내용</h3>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력해주세요" className="bg-[#F3F4F6] w-full min-h-60 p-6 flex text-left align-top rounded-xl  text-[16px]" />
                </div>
            </form>
        </PageLayout>
    )
}
