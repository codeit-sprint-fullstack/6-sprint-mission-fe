"use client";

import Hotitem from "./components/Hotitem";

import { useWindowSize } from "../../components/useWindowSize";
import SortDropdown from "../../components/SortDropDown";
import SerchInputForm from "../../components/SerchInputForm";
import Post from "./components/Post";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "@/api/articles/articles";
import { useState } from "react";
interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorNickname: string;
  likeCount: number;
}

interface Data {
  data: Article[];
  hasNext: number;
  nextCursor: number | undefined;
}

interface ArticlesQurry {
  data: Data | undefined;
  isPending: boolean;
  error: Error | null;
}
export default function ArticlesPage() {
  const [searchKeyword, setSearchKeyword] = useState<string>(""); //
  const [inputValue, setInputValue] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("latest");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchKeyword(inputValue); //
  };

  const width = useWindowSize();
  const { data, isPending, error }: ArticlesQurry = useQuery({
    queryKey: ["articles"],
    queryFn: () => fetchArticles({}),
  });

  if (isPending) return <p>불러오는 중...</p>;
  if (error) return <p>오류 발생!</p>;

  return (
    <div className="flex items-center justify-center ">
      <div className="w-[21.4375rem] h-full mt-4 flex flex-col md:mt-6 md:w-[43.5rem] lg:mt-6 gap-[1.5rem] lg:w-[75rem] ">
        <section className="w-full  flex flex-col  gap-[1rem]">
          <h1 className="w-full titletext text-[1.25rem]">베스트 게시글</h1>
          <div className="flex items-center justify-between md:gap-[1rem] lg:gap-[1.5rem]">
            <Hotitem data={data!.data[0]} />
            {width! >= 744 && <Hotitem data={data!.data[1]} />}
            {width! >= 1200 && <Hotitem data={data!.data[2]} />}
          </div>
        </section>

        <section className="w-[21.4375rem] flex flex-col  gap-[1.5rem]   md:w-[43.5rem]  lg:w-[75rem]">
          <div className="w-full flex flex-row item-center justify-between">
            <h1 className="titletext text-[1.25rem]">게시글</h1>
            <Link
              href="/pages/articles/comments"
              className="w-[5.5rem] h-[2.625rem] rounded-lg bg-primary px-5 py-3  gap-2.5 text-white font-semibold text-base leading-none tracking-normal align-middle"
            >
              글쓰기{" "}
            </Link>
          </div>
          <div className="w-full flex flex-col items-center gap-[1rem]">
            <div className="w-full flex flex-row items-center gap-[0.75rem]">
              <SerchInputForm
                inputValue={inputValue}
                setInputValue={setInputValue}
              />

              <SortDropdown
                value={sortOption}
                onChange={(val) => setSortOption(val ?? "latest")}
              />
            </div>
            <div className="w-full flex flex-col items-center gap-[1.5rem] ">
              {data!.data
                .filter((item) => item.title.includes(searchKeyword))
                .sort((a, b) => {
                  if (sortOption === "latest") {
                    return (
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                    );
                  } else if (sortOption === "likes") {
                    return b.likeCount - a.likeCount;
                  } else {
                    return 0;
                  }
                })
                .map((item) => (
                  <Link
                    key={item.id}
                    href={`/articles/${item.id}`}
                    className="w-full"
                  >
                    <Post key={item.id} data={item} />
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
