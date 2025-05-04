"use client";

import Hotitem from "./components/Hotitem";

import { useWindowSize } from '../../components/useWindowSize'
import SortDropdown from "../../components/SortDropDown";
import SerchInputForm from "../../components/SerchInputForm";
import Post from "./components/Post"
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "@/src/api/articles/articles";
import { useState } from "react";



export default function articlesPage() {


  const [searchKeyword, setSearchKeyword] = useState(""); // 
  const [inputValue, setInputValue] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchKeyword(inputValue); // 🔍 이때만 검색어로 적용됨
  };

  const width = useWindowSize();
  const {data,isPending,error}=useQuery({
    queryKey:["articles"],
    queryFn:() => fetchArticles()
  })
 
  if (isPending) return <p>불러오는 중...</p>;
  if (error) return <p>오류 발생!</p>;
console.log("불러온 데이터: ",data)
  return (
    <div className="flex items-center justify-center ">
      <div className="w-[21.4375rem] h-full mt-4 flex flex-col md:mt-6 md:w-[43.5rem] lg:mt-6 gap-[1.5rem] lg:w-[75rem] ">
        <section className="w-full  flex flex-col  gap-[1rem]">
          <h1 className="w-full titletext text-[1.25rem]">베스트 게시글</h1>
          <div className="flex items-center justify-between md:gap-[1rem] lg:gap-[1.5rem]">
            <Hotitem data={data.list[0]}/>
            {width >= 744 && <Hotitem data={data.list[1]}/>}
            {width >= 1200 && <Hotitem data={data.list[2]}/>}          
          </div>
        </section>

        <section className="w-[21.4375rem] flex flex-col  gap-[1.5rem]   md:w-[43.5rem]  lg:w-[75rem]">
          <div className="w-full flex flex-row item-center justify-between">
          <h1 className="titletext text-[1.25rem]">게시글</h1>          
          <Link href="/pages/articles/comments"  className="w-[5.5rem] h-[2.625rem] rounded-lg bg-primary px-5 py-3  gap-2.5 text-white font-semibold text-base leading-none tracking-normal align-middle">글쓰기 </Link>
          </div>
          <div className="w-full flex flex-col items-center gap-[1rem]">
            <div className="w-full flex flex-row items-center gap-[0.75rem]">
              <SerchInputForm inputValue={inputValue} setInputValue={setInputValue} />
              <SortDropdown onChange={(value) => setSortOption(value)}/>
            </div>
            <div className="w-full flex flex-col items-center gap-[1.5rem] ">
            {data.list
            .filter((item) => item.title.includes(searchKeyword))
            .sort((a,b)=>{
              if(sortOption==='latest'){return b.createdAt - a.createdAt;}
              else if(sortOption==='likes'){return b.likedCount - a.likedCount;}}
            )
            .map((item) => (
              <Link key={item.id} href={`/articles/${item.id}`} className="w-full">      
              <Post key={item.id} data={item} />
              </Link>))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
