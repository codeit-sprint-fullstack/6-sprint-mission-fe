import React from "react";
import { format } from "date-fns";

// 작성일자
function ReportingDate({ createdAt }) {
  // 날짜 서식
  const newDate = new Date(createdAt);
  const date = format(newDate, "yyyy. MM. dd");

  return <span className="text-400-14 text-gray-400">{date}</span>;
}

export default ReportingDate;
