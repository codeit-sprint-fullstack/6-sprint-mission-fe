"use client";

import TitleSection from "@/components/ui/TitleSection";
import Link from "next/link";
import React, { useState } from "react";
import BestArticleLists from "./components/BestArticleLists";
import ArticleLists from "./components/ArticleLists";
import SearchBar from "@/components/ui/SearchBar";

export default function CommunityPage() {
  const [searchValueState, setSearchValueState] = useState("");
  return (
    <>
      <TitleSection titleText={"베스트 게시글"} />
      <BestArticleLists />

      <TitleSection
        titleText={"게시글"}
        buttonStyle={
          <Link href="/community/create" className="btn-sm-48 bg-primary-100">
            글쓰기
          </Link>
        }
      />
      <SearchBar
        inputValueState={searchValueState}
        setInputValueState={setSearchValueState}
      />
      <ArticleLists searchValueState={searchValueState} />
    </>
  );
}
