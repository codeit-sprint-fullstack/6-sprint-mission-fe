// src/components/ItemsPage.js
import React from "react";
import Header from "../components/common/Header"; // 헤더 경로 추가
import RegisterItems from "../components/registerItems/Index"; // 중고마켓 페이지 연결

const RegisterItemsPage = () => {
  return (
    <>
      <Header /> {/* 기존 Layout 대신 Header 사용 */}
      <RegisterItems />
    </>
  );
};

export default RegisterItemsPage;
