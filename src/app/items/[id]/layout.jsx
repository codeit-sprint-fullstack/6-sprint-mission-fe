import React from "react";

export const metadata = {
  title: "상품 상세 | 판다마켓",
  description: "판다마켓에서 다양한 중고물품을 거래하세요",
};

export default function ItemDetailLayout({ children }) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
