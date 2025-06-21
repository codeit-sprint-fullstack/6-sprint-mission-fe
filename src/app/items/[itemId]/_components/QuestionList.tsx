"use client";

import React, { useEffect, useMemo, useState } from "react";
import Question from "./Question";
import { useQuery } from "@tanstack/react-query";
import { getItem } from "@/lib/api/item";
import { TComment, TItem } from "@/types";
import Image from "next/image";

interface QuestionListProps {
  itemId: TItem["id"];
}

function QuestionList({ itemId }: QuestionListProps) {
  const {
    data: item,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["item", itemId],
    queryFn: () => getItem(itemId, localStorage.getItem("accessToken") ?? ""),
  });
  const questions = useMemo(() => item?.comments || [], [item?.comments]);

  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (questions.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [questions]);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>{error.message}</div>;

  return !isEmpty ? (
    <div className="mt-6 flex flex-col gap-4 w-full ">
      {questions.map((question: TComment) => (
        <Question key={question.id} question={question} itemId={itemId} />
      ))}
    </div>
  ) : (
    <div className="mt-6 flex flex-col justify-center items-center">
      <Image
        src="/assets/img/img_question_empty.png"
        className="h-34 w-45"
        alt="아직 문의가 없습니다"
      />
      <p className="text-center text-gray-400 mt-10">아직 문의가 없어요</p>
    </div>
  );
}

export default QuestionList;
