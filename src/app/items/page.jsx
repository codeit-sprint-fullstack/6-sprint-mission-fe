"use client";

import React from "react";
import BestItemsSection from "./_components/BestItemsSection";
import AllItemsSection from "./_components/AllItemsSection";
import "./MarketPage.css";

export default function MarketPage() {
  return (
    <div className="wrapper max-w-[1200px] mx-auto px-4">
      <BestItemsSection />
      <AllItemsSection />
    </div>
  );
}