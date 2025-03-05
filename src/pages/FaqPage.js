// src/components/FaqPage.js
import React from "react";
import Meta from "./Meta";
import Layout from "../components/common/Layout";

const FaqPage = () => {
  return (
    <Layout>
      <Meta title="판다마켓 - FAQ" path="/faq" />
      <h1>자주 묻는 질문</h1>
    </Layout>
  );
};

export default FaqPage;
