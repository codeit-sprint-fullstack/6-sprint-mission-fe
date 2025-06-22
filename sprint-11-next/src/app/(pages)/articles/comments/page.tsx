"use client"
import { createArticle } from '@/api/articles/articles';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'

function CreateArticle() {

  

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const isFormValid = title.trim() !== "" && content.trim() !== "";
  

  const handleSubmit=()=>{
    

  }
  return (
    <form className='flex flex-col gap-[1.5rem] m-4 w-[21.5rem] md:w-[43.5rem] lg:w-[75rem] mx-auto'>
      
      <div className='flex flex-row items-center justify-between py-[0.5rem]'>
        <h1 className="text-[1.25rem] font-bold headertext ">게시글 쓰기</h1>
        <button type="submit" 
              className={`px-4 py-2 rounded text-white font-semibold  
              ${isFormValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
              onClick={handleSubmit}>등록</button>
      </div>

      <div className='flex flex-col'>
        <h2 className='text-sm font-semibold mb-1'>* 제목</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해 주세요"
          className="p-3  rounded bg-[#F3F4F6]"
        />
      </div>

      <div className='flex flex-col'>
        <h2 className='text-sm font-semibold mb-1'>* 내용</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해 주세요"
          className="p-3 rounded h-[10rem] bg-[#F3F4F6]"
        />
      </div>
      
    </form>
  );
}

export default CreateArticle;
