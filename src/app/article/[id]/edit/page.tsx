"use client";
import React from 'react'
import H2Title from '../../../../components/common/H2Title'
import PageLayout from '../../../../components/common/PageLayout'

function page() {
    return (
        <PageLayout>
            <div className="flex justify-between">
                <H2Title>게시글 수정</H2Title>
                <button className="btn-base">
                    등록
                </button>
            </div>
            <form className="mt-9">
                <h3 className="mb-3 font-[700] text-sm">* 제목</h3>
                <input type="text" placeholder="제목을 입력해주세요" className="bg-[#F3F4F6] h-14 w-full px-6 rounded-xl text-[16px]" />
                <h3 className="mb-3 font-[700] text-sm mt-6">* 내용</h3>
                <textarea placeholder="내용을 입력해주세요" className="bg-[#F3F4F6] w-full min-h-60 p-6 flex text-left align-top rounded-xl  text-[16px]" />
            </form>
        </PageLayout>
    )
}

export default page