"use client";

import Link from "next/link";
import React, { useState } from "react";
import TitleSection from "@/components/ui/TitleSection";
import SearchBar from "@/components/ui/SearchBar";
import BestArticleLists from "@/app/(main)/(item)/community/_components/BestArticleLists";
import ArticleLists from "@/app/(main)/(item)/community/_components/ArticleLists";

export default function CommunityPage() {
  const [searchValueState, setSearchValueState] = useState("");
  return (
    <>
      <section className="p-4">
        <TitleSection titleText={"베스트 게시글"} />
        <BestArticleLists />
      </section>
      <section className="px-4">
        <TitleSection
          titleText={"게시글"}
          buttonStyle={
            <Link href="/community/create" className="btn-sm-48 bg-primary-100">
              글쓰기
            </Link>
          }
        />
      </section>
      <section className="p-4">
        <SearchBar
          inputValueState={searchValueState}
          setInputValueState={setSearchValueState}
        />
        <ArticleLists searchValueState={searchValueState} />
      </section>
    </>
  );
}
