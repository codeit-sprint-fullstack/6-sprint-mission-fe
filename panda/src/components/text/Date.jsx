import React from "react";

// 작성일자
function ReportingDate({ createdAt }) {
  // 날짜 서식
  const newDate = new Date(createdAt);
  const date = `${newDate.getFullYear()}.
    ${String(newDate.getMonth() + 1).padStart(2, "0")}.
    ${String(newDate.getDate()).padStart(2, "0")}`;

  return <span className="text-14-400 text-gray-400">{date}</span>;
}

export default ReportingDate;
