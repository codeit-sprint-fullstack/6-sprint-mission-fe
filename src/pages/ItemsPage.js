// src/components/ItemsPage.js
import React from "react";
import Layout from "../components/common/Layout";
import UsedMarket from "../components/usedMarket/Index"; // ✅ 중고마켓 페이지 연결

const ItemsPage = () => {
  return (
    <Layout>
      <UsedMarket />
    </Layout>
  );
};

export default ItemsPage;
