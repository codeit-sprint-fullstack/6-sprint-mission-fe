// src/components/PrivacyPage.js
import React from "react";
import Meta from "./Meta";
import Layout from "../components/common/Layout";

const PrivacyPage = () => {
  return (
    <Layout>
      <Meta title="판다마켓 - 이용약관" path="/privacy" />
      <h1>이용약관 페이지</h1>
    </Layout>
  );
};

export default PrivacyPage;
